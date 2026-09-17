#!/usr/bin/env node
/* Reports type sizes in an app that sit off the Edgistify scale, and what to
   replace each with.  usage: node build/scale-lint.mjs <dir> [<dir>...]        */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, relative, dirname } from 'node:path';

/* If the app's tailwind.config.js already maps fontSize onto --ed-text-*, its named
   classes are design-system tokens, not stock Tailwind px. Reporting them as off-scale
   would be wrong. */
function bridged(dir) {
  for (let d = dir, i = 0; i < 4; i++, d = dirname(d)) {
    try {
      if (readFileSync(join(d, 'tailwind.config.js'), 'utf8').includes('var(--ed-text-')) return true;
    } catch { /* keep walking up */ }
  }
  return false;
}

const SCALE = { '2xs':10, xs:11, sm:12, md:13, base:14, lg:16, xl:18, '2xl':20, '3xl':24, '4xl':30, '5xl':40 };
const TW    = { xs:12, sm:14, base:16, lg:18, xl:20, '2xl':24, '3xl':30, '4xl':36, '5xl':48 };
const nearest = px => Object.entries(SCALE).reduce((a,b)=>Math.abs(b[1]-px)<Math.abs(a[1]-px)?b:a);

const walk = d => readdirSync(d,{withFileTypes:true}).flatMap(e=>{
  if (e.name==='node_modules'||e.name.startsWith('.')) return [];
  const p = join(d,e.name);
  return e.isDirectory() ? walk(p) : (['.jsx','.tsx','.js','.ts'].includes(extname(p)) ? [p] : []);
});

let grand = 0;
for (const root of process.argv.slice(2)) {
  if (!statSync(root,{throwIfNoEntry:false})?.isDirectory()) { console.log(`skip ${root}`); continue; }
  const isBridged = bridged(root);
  const hits = new Map();          // px -> count
  const named = new Map();         // tailwind name -> count
  let files = 0;
  for (const f of walk(root)) {
    const src = readFileSync(f,'utf8'); let touched = false;
    for (const m of src.matchAll(/text-\[([0-9.]+)px\]/g)) {
      hits.set(+m[1], (hits.get(+m[1])??0)+1); touched = true;
    }
    if (!isBridged) for (const m of src.matchAll(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)\b/g)) {
      named.set(m[1], (named.get(m[1])??0)+1); touched = true;
    }
    if (touched) files++;
  }
  const total = [...hits.values()].concat([...named.values()]).reduce((a,b)=>a+b,0);
  grand += total;
  console.log(`\n${relative(process.cwd(),root)||root}  —  ${total} type sizes across ${files} files`
    + (isBridged ? '  [tailwind bridged to design system — named classes are tokens]' : ''));
  if (hits.size) {
    console.log('  arbitrary  count   ->  token          delta');
    for (const [px,n] of [...hits].sort((a,b)=>b[1]-a[1])) {
      const [name,val] = nearest(px);
      const d = val-px;
      console.log(`  ${(px+'px').padEnd(9)} ${String(n).padStart(5)}   ->  --ed-text-${name.padEnd(5)} ${d===0?'exact':(d>0?'+':'')+d+'px'}`);
    }
  }
  if (named.size) {
    console.log('  tailwind   count   ->  token          delta');
    for (const [k,n] of [...named].sort((a,b)=>b[1]-a[1])) {
      const px = TW[k]; const [name,val] = nearest(px); const d = val-px;
      console.log(`  text-${k.padEnd(5)} ${String(n).padStart(5)}   ->  --ed-text-${name.padEnd(5)} ${d===0?'exact':(d>0?'+':'')+d+'px'}  (was ${px}px)`);
    }
  }
}
console.log(`\n${grand} type declarations total. Scale has ${Object.keys(SCALE).length} steps.`);
