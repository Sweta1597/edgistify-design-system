/* One-shot: lift the token layer out of the hand-written CSS into JSON.
   Run once, then gen-css.mjs regenerates the CSS from the JSON and the
   round-trip is diffed. If the diff is empty the extraction was faithful. */
import { readFileSync, writeFileSync } from 'node:fs';

const MODES = {
  base:            ':root',
  dark:            '[data-theme="dark"]',
  warehouse:       '[data-mode="warehouse"]',
  darkWarehouse:   '[data-theme="dark"][data-mode="warehouse"]',
};

/* Blocks are matched by an ANCHORED selector. An unanchored match lets
   [data-theme="dark"][data-mode="warehouse"] leak into the plain
   [data-mode="warehouse"] block — the same bug that once hid 16 contrast
   failures in the checker. */
function block(css, sel) {
  const re = new RegExp(`(^|\\})\\s*${sel.replace(/[[\]"]/g, '\\$&')}\\s*\\{([^}]*)\\}`, 'm');
  const m = css.match(re);
  return m ? m[2] : null;
}

function decls(body) {
  const out = {};
  if (!body) return out;
  // strip comments so a `/* 9.2:1 */` note never lands in a value
  for (const line of body.replace(/\/\*[\s\S]*?\*\//g, '').split(';')) {
    const m = line.match(/^\s*(--ed-[a-z0-9-]+)\s*:\s*(.+?)\s*$/i);
    if (m) out[m[1].replace(/^--ed-/, '')] = m[2];
  }
  return out;
}

const prim = readFileSync(new URL('../dist/primitives.css', import.meta.url), 'utf8');
const sem  = readFileSync(new URL('../dist/semantic.css',  import.meta.url), 'utf8');

const primitives = decls(block(prim, ':root'));
const semantic = {};
for (const [name, sel] of Object.entries(MODES)) {
  const d = decls(block(sem, sel));
  if (Object.keys(d).length) semantic[name] = d;
}

writeFileSync(new URL('../tokens/primitives.json', import.meta.url),
  JSON.stringify(primitives, null, 2) + '\n');
writeFileSync(new URL('../tokens/semantic.json', import.meta.url),
  JSON.stringify(semantic, null, 2) + '\n');

console.log(`primitives: ${Object.keys(primitives).length}`);
for (const [k, v] of Object.entries(semantic)) console.log(`semantic.${k}: ${Object.keys(v).length}`);
