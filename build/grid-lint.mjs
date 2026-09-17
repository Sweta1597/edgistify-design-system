#!/usr/bin/env node
/* Reports spacing, radius and icon sizes that sit off the Edgistify grid.
   usage: node build/grid-lint.mjs <dir> [<dir>...]                          */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const TW_SPACE = {'0':0,'px':1,'0.5':2,'1':4,'1.5':6,'2':8,'2.5':10,'3':12,'3.5':14,
                  '4':16,'5':20,'6':24,'7':28,'8':32,'9':36,'10':40,'11':44,'12':48,'16':64,'20':80};
const GRID = new Set([0,1,2,4,6,8,10,12,14,16,20,24,32,40,48,64,80]);
const RADIUS = { '':'sharp 4px','-sm':'sharp 4px','-md':'control 6px','-lg':'card 8px',
                 '-xl':'panel 12px','-2xl':'panel 12px','-3xl':'panel 12px','-full':'pill' };
const ICON_OK = new Set([14,16,20,24,32]);

const walk = d => readdirSync(d,{withFileTypes:true}).flatMap(e=>{
  if (e.name==='node_modules'||e.name.startsWith('.')) return [];
  const p = join(d,e.name);
  return e.isDirectory() ? walk(p) : (['.jsx','.tsx'].includes(extname(p)) ? [p] : []);
});

for (const root of process.argv.slice(2)) {
  if (!statSync(root,{throwIfNoEntry:false})?.isDirectory()) { console.log(`skip ${root}`); continue; }
  const offGrid = new Map(), radii = new Map(), icons = new Map();
  let onGrid = 0;
  for (const f of walk(root)) {
    const src = readFileSync(f,'utf8');
    for (const m of src.matchAll(/\b(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|gap|gap-x|gap-y|space-x|space-y)-([0-9.]+|px)\b/g)) {
      const v = TW_SPACE[m[1]];
      if (v === undefined) continue;
      GRID.has(v) ? onGrid++ : offGrid.set(v,(offGrid.get(v)??0)+1);
    }
    for (const m of src.matchAll(/\brounded(-(?:sm|md|lg|xl|2xl|3xl|full))?\b(?!-[a-z])/g))
      radii.set(m[1]??'',(radii.get(m[1]??'')??0)+1);
    /* Only size={N} is a reliable icon signal. `h-N w-N` matches any square
       element — avatars, badge circles, swatches — so counting it as an icon
       generates false work. */
    for (const m of src.matchAll(/size=\{(\d+)\}/g)) {
      const px = +m[1];
      if (px >= 8 && px <= 48) icons.set(px,(icons.get(px)??0)+1);
    }
  }
  console.log(`\n${relative(process.cwd(),root)||root}`);
  console.log(`  spacing:  ${onGrid} on grid, ${[...offGrid.values()].reduce((a,b)=>a+b,0)} off`);
  for (const [v,n] of [...offGrid].sort((a,b)=>b[1]-a[1])) console.log(`    ${String(v+'px').padEnd(6)} ${n}`);

  console.log('  radius:');
  for (const [k,n] of [...radii].sort((a,b)=>b[1]-a[1]))
    console.log(`    rounded${k.padEnd(6)} ${String(n).padStart(4)}  ->  --ed-radius-${RADIUS[k]??'?'}`);

  const bad = [...icons].filter(([px])=>!ICON_OK.has(px)).sort((a,b)=>b[1]-a[1]);
  const good = [...icons].filter(([px])=>ICON_OK.has(px)).reduce((a,[,n])=>a+n,0);
  console.log(`  icons:    ${good} on grid, ${bad.reduce((a,[,n])=>a+n,0)} off`);
  for (const [px,n] of bad) {
    const near = [...ICON_OK].reduce((a,b)=>Math.abs(b-px)<Math.abs(a-px)?b:a);
    
    const sw = 2*px/24;
    const why = sw < 1 ? `stroke ${sw.toFixed(2)}px — sub-pixel` : `stroke ${sw.toFixed(2)}px — off-grid`;
    console.log(`    ${String(px+'px').padEnd(6)} ${String(n).padStart(4)}  ->  ${near}px   (${why})`);
  }
}
