/* Fails on a reference to an --ed-* custom property the system never defines.

   A typo here is silent by design: CSS drops the whole declaration, so
   `gap: var(--ed-space-7)` where no such step exists becomes gap: 0 and the
   layout quietly collapses. This caught exactly that on the docs site — the
   4px scale thins out as it grows and has no 7 or 9.

   Usage: node build/token-lint.mjs [dir ...]      (default: the docs site)   */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, extname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const EXT = new Set(['.css', '.js', '.jsx', '.ts', '.tsx', '.mdx', '.html']);
const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'out']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXT.has(extname(name))) out.push(full);
  }
  return out;
}

// Everything the system defines, across every shipped stylesheet.
const defined = new Set();
for (const f of readdirSync(join(root, 'dist')))
  if (f.endsWith('.css'))
    for (const m of readFileSync(join(root, 'dist', f), 'utf8').matchAll(/(--ed-[\w-]+)\s*:/g))
      defined.add(m[1]);

const targets = process.argv.slice(2).map((d) => join(process.cwd(), d));
if (!targets.length) targets.push(join(root, 'site'));

let bad = 0, refs = 0;
for (const dir of targets) {
  for (const file of walk(dir)) {
    const text = readFileSync(file, 'utf8');
    text.split('\n').forEach((line, i) => {
      for (const m of line.matchAll(/var\(\s*(--ed-[\w-]+)\s*(,)?/g)) {
        refs++;
        // A declared fallback is a deliberate choice, not a typo.
        if (defined.has(m[1]) || m[2]) continue;
        bad++;
        console.log(`  ${relative(root, file)}:${i + 1}  ${m[1]} is not defined`);
      }
    });
  }
}

console.log(`\n${refs - bad}/${refs} token references resolve` +
            (bad ? ` — ${bad} undefined` : ''));
process.exit(bad ? 1 : 0);
