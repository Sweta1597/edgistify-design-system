/* Bundles the shipped stylesheets into one file for the specimen pages.
   dark-auto.css is deliberately EXCLUDED: it flips on the OS preference,
   and the specimens — like the products — are light until told otherwise.
   Run: node build/bundle-specimen-css.mjs <out-path>                     */
import { readFileSync, writeFileSync } from 'node:fs';

const ORDER = ['primitives','semantic','type','space','button','card','table','input','modal','menu'];
const out = process.argv[2];
if (!out) { console.error('usage: node build/bundle-specimen-css.mjs <out-path>'); process.exit(1); }

const css = ORDER.map(n => readFileSync(new URL(`../dist/${n}.css`, import.meta.url), 'utf8')).join('\n');
writeFileSync(out, css);
console.log(`wrote ${out} — ${ORDER.length} stylesheets, ${css.length} bytes`);
