#!/usr/bin/env node
/* Seeds the icon library from Material Symbols Rounded.

   The brief's grid — 960 units, y from −960 to 0, 800 live area, optical
   sizes 20/24/48 — is Material Symbols' grid, so its drawings drop straight
   into our file format as a BODY path with an empty ACCENT. That gives the
   apps a complete, consistent set on day one; the designer then replaces
   icons one at a time and the manifest records which are still seeds.

   Only icons whose manifest status is `seed` and which name a `material`
   symbol are fetched. Files that already exist are left alone unless
   --force is given, so a re-run never overwrites a redrawn icon.

   usage: node build/icons-seed.mjs [--force] [name ...]                  */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  SIZES, STATES, SVG_DIR, readManifest, writeManifest, parseSvg, svgText, hashArt,
  packageVersion, fileName,
} from './icons-lib.mjs';

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = new Set(args.filter((a) => !a.startsWith('--')));

const manifest = readManifest();
const base = `https://raw.githubusercontent.com/google/material-design-icons/${manifest.materialRef}/symbols/web`;
const url = (ms, state, size) =>
  `${base}/${ms}/materialsymbolsrounded/${ms}${state === 'filled' ? '_fill1' : ''}_${size}px.svg`;

const todo = manifest.icons.filter((ic) =>
  ic.status === 'seed' && ic.material && (!only.size || only.has(ic.name)));

let fetched = 0, skipped = 0;
const failures = [];

async function seedOne(ic) {
  const art = { outline: {}, filled: {} };
  for (const state of STATES)
    for (const size of SIZES) {
      const file = join(SVG_DIR, fileName(ic.name, state, size));
      let body;
      if (existsSync(file) && !force) {
        const { paths } = parseSvg(readFileSync(file, 'utf8'));
        body = paths.find((p) => p.attrs.class === 'body')?.attrs.d ?? '';
        skipped++;
      } else {
        const res = await fetch(url(ic.material, state, size));
        if (!res.ok) { failures.push(`${ic.name} -> ${ic.material} (${state} ${size}): HTTP ${res.status}`); return; }
        const { paths } = parseSvg(await res.text());
        if (paths.length !== 1) { failures.push(`${ic.name} -> ${ic.material}: expected one path, got ${paths.length}`); return; }
        body = paths[0].attrs.d;
        writeFileSync(file, svgText({ body }));
        fetched++;
      }
      art[state][size] = { body, accent: '' };
    }
  ic.seedHash = hashArt(art);
  ic.since ??= packageVersion();
}

/* A handful at a time: polite to the CDN, and quick enough. */
const POOL = 8;
let i = 0;
await Promise.all(Array.from({ length: POOL }, async () => {
  while (i < todo.length) await seedOne(todo[i++]);
}));

writeManifest(manifest);

console.log(`${todo.length} icons: ${fetched} files fetched, ${skipped} already present`);
if (failures.length) {
  console.log(`\n${failures.length} failed — fix the material name in icons/manifest.json:`);
  for (const f of failures) console.log(`  ${f}`);
  process.exit(1);
}
