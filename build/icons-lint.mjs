#!/usr/bin/env node
/* Checks every file in icons/svg against docs/icon-brief.md, and the
   manifest against itself.

   Severity follows the icon's status. A `seed` is Material artwork we did
   not draw: it is on the wrong grid step and has no accent yet, and saying
   so 594 times helps nobody, so those rules are warnings for seeds and
   summarised. For a `drawn` or `approved` icon the same rules are errors,
   because they are the brief.

   What this cannot check — optical centring, whether the accent reads at
   14px, whether two icons are confusable — is on the contact sheet.

   usage: node build/icons-lint.mjs [--verbose]                            */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  SIZES, STATES, SVG_DIR, VIEWBOX, MARGIN, GRID, STEP, ACCENT_FILL, BODY_FILL, CATEGORIES,
  STATUSES, FILE_RE, readManifest, listSvgFiles, parseSvg, normaliseD, walkPath, signedArea, bbox,
} from './icons-lib.mjs';

const verbose = process.argv.includes('--verbose');
const manifest = readManifest();
const byName = new Map(manifest.icons.map((ic) => [ic.name, ic]));

const errors = [];
const warns = new Map();
const err = (where, rule, msg) => errors.push(`${where}  [${rule}] ${msg}`);
const warn = (where, rule, msg) => {
  if (!warns.has(rule)) warns.set(rule, []);
  warns.get(rule).push(`${where}  ${msg}`);
};
/* severe: true → error, false → warning */
const flag = (severe, where, rule, msg) => (severe ? err : warn)(where, rule, msg);

const ALLOWED_TAGS = new Set(['svg', 'path']);
const FORBIDDEN_ATTR = /^(stroke|stroke-.*|opacity|fill-opacity|fill-rule|clip-rule|transform|style|id|filter|mask|clip-path)$/;
const lo = MARGIN, hi = GRID - MARGIN;          // 80 .. 880
const inLive = (p) => p.x >= lo && p.x <= hi && p.y >= -hi && p.y <= -lo;
const onGrid = (p) => Number.isInteger(p.x / STEP) && Number.isInteger(p.y / STEP);
const fmt = (p) => `${+p.x.toFixed(2)},${+p.y.toFixed(2)}`;

/* ---- rule 14: the manifest ------------------------------------------ */
{
  const seenNames = new Set();
  for (const ic of manifest.icons) {
    const w = `manifest:${ic.name}`;
    if (seenNames.has(ic.name)) err(w, 'manifest', 'duplicate name');
    seenNames.add(ic.name);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(ic.name)) err(w, 'manifest', 'name is not kebab-case');
    if (!CATEGORIES.includes(ic.category)) err(w, 'manifest', `category "${ic.category}" is not one of ${CATEGORIES.join(', ')}`);
    if (!STATUSES.includes(ic.status)) err(w, 'manifest', `status "${ic.status}" is not one of ${STATUSES.join(', ')}`);
    if (typeof ic.hasAccent !== 'boolean') err(w, 'manifest', 'hasAccent must be true or false');
    for (const p of ic.nearPairs ?? [])
      if (!byName.has(p)) err(w, 'manifest', `nearPair "${p}" is not an icon`);
  }
}

/* ---- per file --------------------------------------------------------- */
const seen = new Map();   // name -> { outline: {size: {body, accent}}, filled: {...}, first: Set }

for (const file of listSvgFiles()) {
  const m = FILE_RE.exec(file);
  if (!m) { err(file, 'filename', 'expected {name}-{outline|filled}-{20|24|48}.svg'); continue; }
  const [, name, state, sizeS] = m;
  const size = +sizeS;
  const ic = byName.get(name);
  if (!ic) { err(file, 'filename', 'name is not in icons/manifest.json'); continue; }
  const severe = ic.status !== 'seed';

  const text = readFileSync(join(SVG_DIR, file), 'utf8');
  const { elements, foreign, svg, paths } = parseSvg(text);

  if (foreign.length) err(file, 'markup', `contains ${foreign.length} non-element node(s): ${foreign[0]}…`);
  if (!svg) { err(file, 'markup', 'no <svg> root'); continue; }
  if (svg.attrs.viewBox !== VIEWBOX) err(file, 'viewBox', `viewBox is "${svg.attrs.viewBox}", must be "${VIEWBOX}"`);
  if ('width' in svg.attrs || 'height' in svg.attrs) err(file, 'viewBox', 'no width or height on <svg>');

  const badTags = elements.map((e) => e.tag).filter((t) => !ALLOWED_TAGS.has(t));
  if (badTags.length) err(file, 'elements', `only <svg> and <path> are allowed; found <${[...new Set(badTags)].join('>, <')}>`);

  for (const e of elements)
    for (const a of Object.keys(e.attrs))
      if (FORBIDDEN_ATTR.test(a)) err(file, 'attrs', `<${e.tag}> carries "${a}" — no strokes, effects, transforms or rules`);

  if (paths.length !== 2) { err(file, 'paths', `exactly two <path> elements, found ${paths.length}`); continue; }
  const body = paths.find((p) => p.attrs.class === 'body');
  const accent = paths.find((p) => p.attrs.class === 'accent');
  if (!body || !accent) { err(file, 'paths', `paths must be class="body" and class="accent", found "${paths.map((p) => p.attrs.class).join('", "')}"`); continue; }
  if (body.attrs.fill !== BODY_FILL) err(file, 'fill', `body fill must be "${BODY_FILL}"`);
  if (accent.attrs.fill !== ACCENT_FILL) err(file, 'fill', `accent fill must be "${ACCENT_FILL}"`);

  const bodyD = normaliseD(body.attrs.d), accentD = normaliseD(accent.attrs.d);
  if (!bodyD) err(file, 'd', 'body path is empty');

  let pts = [];
  for (const [label, d] of [['body', bodyD], ['accent', accentD]]) {
    if (!d) continue;
    try { pts = pts.concat(walkPath(d).points); }
    catch (e) { err(file, 'd', `${label} path does not parse: ${e.message}`); }
  }

  /* rule 7 — the accent exists exactly when the manifest says it should */
  if (!accentD && ic.hasAccent) flag(severe, file, 'accent', 'accent path is empty but hasAccent is true');
  if (accentD && !ic.hasAccent) flag(severe, file, 'accent', 'accent path is drawn but hasAccent is false');

  /* rule 8 — every coordinate on the 40-unit grid */
  const off = pts.filter((p) => !onGrid(p));
  if (off.length) flag(severe, file, 'grid', `${off.length} of ${pts.length} coordinates off the 40 grid (e.g. ${fmt(off[0])})`);

  /* rules 9 and 10 — inside the 800 live area */
  const outEnd = pts.filter((p) => p.kind === 'end' && !inLive(p));
  if (outEnd.length) flag(severe, file, 'live', `${outEnd.length} endpoint(s) outside the live area (e.g. ${fmt(outEnd[0])})`);
  const outCtrl = pts.filter((p) => p.kind === 'ctrl' && !inLive(p));
  if (outCtrl.length) warn(file, 'live-ctrl', `${outCtrl.length} control point(s) outside the live area (e.g. ${fmt(outCtrl[0])}) — curve may still be inside`);

  if (!seen.has(name)) seen.set(name, { outline: {}, filled: {}, first: new Set() });
  const s = seen.get(name);
  s[state][size] = { body: bodyD, accent: accentD };
  s.first.add(paths[0].attrs.class);
}

/* ---- per icon --------------------------------------------------------- */
for (const ic of manifest.icons) {
  const s = seen.get(ic.name);
  const severe = ic.status !== 'seed';
  if (!s) { err(ic.name, 'files', 'no files in icons/svg'); continue; }
  for (const state of STATES)
    if (!s[state][24]) err(ic.name, 'files', `${ic.name}-${state}-24.svg is required`);
  const so = Object.keys(s.outline).join(','), sf = Object.keys(s.filled).join(',');
  if (so !== sf) err(ic.name, 'files', `outline has sizes ${so || 'none'} but filled has ${sf || 'none'}`);
  if (s.first.size > 1) err(ic.name, 'paths', 'path order differs between files; accent-first must be consistent across an icon');

  for (const size of SIZES) {
    const o = s.outline[size], f = s.filled[size];
    if (!o || !f) continue;
    const where = `${ic.name}@${size}`;

    /* rule 13 — same outer silhouette in both states */
    const bb = (a) => {
      const boxes = [a.body, a.accent].filter(Boolean).map(bbox).filter(Boolean);
      if (!boxes.length) return null;
      return { x0: Math.min(...boxes.map((b) => b.x0)), x1: Math.max(...boxes.map((b) => b.x1)),
               y0: Math.min(...boxes.map((b) => b.y0)), y1: Math.max(...boxes.map((b) => b.y1)) };
    };
    try {
      const bo = bb(o), bf = bb(f);
      const r = (v) => Math.round(v);   // flattened curves leave float noise
      if (bo && bf && (r(bo.x0) !== r(bf.x0) || r(bo.x1) !== r(bf.x1) || r(bo.y0) !== r(bf.y0) || r(bo.y1) !== r(bf.y1)))
        warn(where, 'silhouette', `outline bbox ${r(bo.x0)},${r(bo.y0)}→${r(bo.x1)},${r(bo.y1)} differs from filled ${r(bf.x0)},${r(bf.y0)}→${r(bf.x1)},${r(bf.y1)}`);
    } catch { /* reported under 'd' already */ }

    if (!severe || !ic.hasAccent || !f.accent) continue;

    /* rule 11 — accent is 10–25% of the drawn area (filled state) */
    try {
      const a = signedArea(f.accent), b = signedArea(f.body);
      const share = a / (a + b);
      if (share < 0.095 || share > 0.255)
        warn(where, 'accent-share', `accent is ${(share * 100).toFixed(0)}% of the drawn area; the brief asks for 10–25%`);
    } catch { /* reported under 'd' already */ }

    /* rule 12 — accent must reach the outer silhouette */
    try {
      const ba = bbox(f.accent), bb2 = bbox(f.body);
      if (ba && bb2 && ba.x0 - bb2.x0 > 80 && bb2.x1 - ba.x1 > 80 && ba.y0 - bb2.y0 > 80 && bb2.y1 - ba.y1 > 80)
        warn(where, 'accent-enclosed', 'accent sits fully inside the body bbox with >80 units of body on every side — it must touch the outer silhouette');
    } catch { /* reported under 'd' already */ }
  }
}

/* ---- report ----------------------------------------------------------- */
for (const e of errors) console.log(`  error  ${e}`);
if (errors.length && warns.size) console.log('');
for (const [rule, list] of warns) {
  if (verbose) for (const w of list) console.log(`  warn   [${rule}] ${w}`);
  else console.log(`  warn   [${rule}] ${list.length}× — e.g. ${list[0]}`);
}
const counts = STATUSES.map((st) => `${manifest.icons.filter((ic) => ic.status === st).length} ${st}`).join(', ');
const nWarn = [...warns.values()].reduce((n, l) => n + l.length, 0);
console.log(`\n${listSvgFiles().length} files, ${manifest.icons.length} icons (${counts}): ${errors.length} errors, ${nWarn} warnings` +
            (nWarn && !verbose ? '  (--verbose lists them)' : ''));
process.exit(errors.length ? 1 : 0);
