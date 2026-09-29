/* Shared helpers for the icon library scripts: seed, lint and build.

   One place knows how an icon file is read, how its path data is walked
   and how an icon's content is hashed — so the seed script, the lint and
   the build cannot drift apart on any of them.

   Everything is regex-based on purpose: the files are ours, they are
   tiny, they contain exactly one <svg> and two <path> elements, and the
   lint refuses anything else. A real XML parser would be a dependency
   the package does not otherwise carry.                                  */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const ICONS_DIR = join(ROOT, 'icons');
export const SVG_DIR = join(ICONS_DIR, 'svg');
export const MANIFEST = join(ICONS_DIR, 'manifest.json');

export const SIZES = [20, 24, 48];
export const STATES = ['outline', 'filled'];
export const VIEWBOX = '0 -960 960 960';
export const GRID = 960;
export const LIVE = 800;
export const MARGIN = (GRID - LIVE) / 2;   // 80
export const STEP = 40;                    // half-dp grid
export const ACCENT_FILL = 'var(--ed-icon-accent, #008277)';
export const BODY_FILL = 'currentColor';
export const CATEGORIES = ['navigation', 'logistics', 'devices', 'actions', 'status', 'documents'];
export const STATUSES = ['seed', 'drawn', 'approved'];

export const FILE_RE = /^([a-z0-9]+(?:-[a-z0-9]+)*)-(outline|filled)-(20|24|48)\.svg$/;

/* ---- manifest -------------------------------------------------------- */

/* Key order is fixed so the build's rewrite produces a stable diff. Hand
   fields first, computed fields after, so a designer editing the file
   reads the part that is theirs before the part that is the build's. */
const ICON_KEYS = ['name', 'category', 'lucide', 'material', 'status', 'hasAccent', 'nearPairs',
                   'notes', 'version', 'since', 'updated', 'sizes', 'fillIdentical', 'accentFirst',
                   'hash', 'seedHash'];

export function readManifest() {
  return JSON.parse(readFileSync(MANIFEST, 'utf8'));
}

export function writeManifest(m) {
  const icons = [...m.icons]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((ic) => {
      const out = {};
      for (const k of ICON_KEYS) if (ic[k] !== undefined) out[k] = ic[k];
      for (const k of Object.keys(ic)) if (!(k in out)) out[k] = ic[k];
      return out;
    });
  const top = { grid: m.grid, live: m.live, materialRef: m.materialRef, icons };
  writeFileSync(MANIFEST, JSON.stringify(top, null, 2) + '\n');
}

export function packageVersion() {
  return JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
}

/* ---- files ----------------------------------------------------------- */

export function listSvgFiles() {
  if (!existsSync(SVG_DIR)) return [];
  return readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg')).sort();
}

export function fileName(name, state, size) {
  return `${name}-${state}-${size}.svg`;
}

/* The one shape every file in icons/svg takes. The accent path is written
   even when empty, so the file count and the path count never vary. */
export function svgText({ body, accent = '', accentFirst = false }) {
  const b = `  <path class="body" fill="${BODY_FILL}" d="${body}"/>`;
  const a = `  <path class="accent" fill="${ACCENT_FILL}" d="${accent}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}">\n${accentFirst ? a + '\n' + b : b + '\n' + a}\n</svg>\n`;
}

/* Minimal tag scanner: every element with its attributes, plus anything
   that is not an element (comments, CDATA, doctype) so the lint can
   reject it. */
export function parseSvg(text) {
  const elements = [];
  const foreign = [];
  const tagRe = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!DOCTYPE[^>]*>|<\?[\s\S]*?\?>|<\s*\/?\s*([A-Za-z][\w:.-]*)([^>]*?)\/?>/g;
  let m;
  while ((m = tagRe.exec(text))) {
    if (!m[1]) { foreign.push(m[0].slice(0, 30)); continue; }
    if (m[0].startsWith('</') || /^<\s*\//.test(m[0])) continue;
    const attrs = {};
    for (const a of m[2].matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))
      attrs[a[1]] = a[2] ?? a[3] ?? '';
    elements.push({ tag: m[1], attrs });
  }
  const svg = elements.find((e) => e.tag === 'svg');
  const paths = elements.filter((e) => e.tag === 'path');
  return { elements, foreign, svg, paths };
}

export function normaliseD(d) {
  return (d || '').replace(/\s+/g, ' ').trim();
}

/* ---- path data ------------------------------------------------------- */

const ARGC = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

/* Tokenise into [{cmd, args}] with the implicit repetition expanded:
   "M10 10 20 20" is a move followed by a line, and "L1 2 3 4" is two
   lines. Throws on an unknown command or a wrong argument count, which
   is what the lint wants to report. */
export function tokenizePath(d) {
  const out = [];
  const re = /([MLHVCSQTAZmlhvcsqtaz])|(-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)/g;
  let cmd = null, args = [];
  const flush = () => {
    if (cmd === null) return;
    const n = ARGC[cmd.toUpperCase()];
    if (n === 0) { if (args.length) throw new Error(`Z takes no arguments`); out.push({ cmd, args: [] }); return; }
    if (args.length === 0 || args.length % n !== 0)
      throw new Error(`${cmd} expects multiples of ${n} arguments, got ${args.length}`);
    for (let i = 0; i < args.length; i += n) {
      let c = cmd;
      if (i > 0 && cmd === 'M') c = 'L';
      if (i > 0 && cmd === 'm') c = 'l';
      out.push({ cmd: c, args: args.slice(i, i + n) });
    }
  };
  let m;
  let last = 0;
  while ((m = re.exec(d))) {
    const gap = d.slice(last, m.index);
    if (/[^\s,]/.test(gap)) throw new Error(`unexpected "${gap.trim()}" in path data`);
    last = m.index + m[0].length;
    if (m[1]) { flush(); cmd = m[1]; args = []; }
    else { if (cmd === null) throw new Error('number before any command'); args.push(parseFloat(m[2])); }
  }
  if (/[^\s,]/.test(d.slice(last))) throw new Error(`unexpected "${d.slice(last).trim()}" in path data`);
  flush();
  return out;
}

/* Resolve every command to absolute coordinates and report each point it
   touches: endpoints and control points, tagged so the lint can treat
   them differently. Also returns the subpaths as absolute polylines with
   curves flattened, for area estimates. */
export function walkPath(d, { segments = 8 } = {}) {
  const toks = tokenizePath(d);
  const points = [];        // { x, y, kind: 'end' | 'ctrl' }
  const subpaths = [];      // arrays of [x, y]
  let cur = [0, 0], start = [0, 0], prevCtrl = null, prevCmd = '';
  let poly = null;
  const end = (x, y) => { points.push({ x, y, kind: 'end' }); };
  const ctrl = (x, y) => { points.push({ x, y, kind: 'ctrl' }); };
  const begin = (x, y) => { poly = [[x, y]]; subpaths.push(poly); };
  const lineTo = (x, y) => { if (!poly) begin(cur[0], cur[1]); poly.push([x, y]); };
  const bez = (p0, p1, p2, p3) => {
    for (let i = 1; i <= segments; i++) {
      const t = i / segments, u = 1 - t;
      const x = u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0];
      const y = u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1];
      lineTo(x, y);
    }
  };
  const quad = (p0, p1, p2) => {
    for (let i = 1; i <= segments; i++) {
      const t = i / segments, u = 1 - t;
      lineTo(u*u*p0[0] + 2*u*t*p1[0] + t*t*p2[0], u*u*p0[1] + 2*u*t*p1[1] + t*t*p2[1]);
    }
  };
  for (const { cmd, args } of toks) {
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();
    const ax = (i) => rel ? cur[0] + args[i] : args[i];
    const ay = (i) => rel ? cur[1] + args[i] : args[i];
    switch (C) {
      case 'M': { const p = [ax(0), ay(1)]; end(...p); cur = p; start = p; begin(...p); prevCtrl = null; break; }
      case 'L': { const p = [ax(0), ay(1)]; end(...p); lineTo(...p); cur = p; prevCtrl = null; break; }
      case 'H': { const p = [ax(0), cur[1]]; end(...p); lineTo(...p); cur = p; prevCtrl = null; break; }
      case 'V': { const p = [cur[0], ay(0)]; end(...p); lineTo(...p); cur = p; prevCtrl = null; break; }
      case 'C': {
        const c1 = [ax(0), ay(1)], c2 = [ax(2), ay(3)], p = [ax(4), ay(5)];
        ctrl(...c1); ctrl(...c2); end(...p); bez(cur, c1, c2, p); cur = p; prevCtrl = c2; break;
      }
      case 'S': {
        const c1 = (prevCtrl && /[CS]/.test(prevCmd.toUpperCase()))
          ? [2 * cur[0] - prevCtrl[0], 2 * cur[1] - prevCtrl[1]] : cur;
        const c2 = [ax(0), ay(1)], p = [ax(2), ay(3)];
        ctrl(...c2); end(...p); bez(cur, c1, c2, p); cur = p; prevCtrl = c2; break;
      }
      case 'Q': {
        const c1 = [ax(0), ay(1)], p = [ax(2), ay(3)];
        ctrl(...c1); end(...p); quad(cur, c1, p); cur = p; prevCtrl = c1; break;
      }
      case 'T': {
        const c1 = (prevCtrl && /[QT]/.test(prevCmd.toUpperCase()))
          ? [2 * cur[0] - prevCtrl[0], 2 * cur[1] - prevCtrl[1]] : cur;
        const p = [ax(0), ay(1)];
        end(...p); quad(cur, c1, p); cur = p; prevCtrl = c1; break;
      }
      case 'A': {
        /* Arcs are approximated by their chord for area purposes; the
           brief's drawings use quadratics for rounding, so arcs are rare. */
        const p = [ax(5), ay(6)]; end(...p); lineTo(...p); cur = p; prevCtrl = null; break;
      }
      case 'Z': { cur = start; if (poly && poly.length) poly.push([start[0], start[1]]); poly = null; prevCtrl = null; break; }
    }
    prevCmd = cmd;
  }
  return { points, subpaths };
}

/* Signed area under nonzero winding, approximated as the sum of each
   subpath's shoelace area: a reversed counter subtracts. Good enough to
   say whether an accent is a tenth or a third of the drawing. */
export function signedArea(d) {
  const { subpaths } = walkPath(d);
  let total = 0;
  for (const poly of subpaths) {
    let a = 0;
    for (let i = 0; i < poly.length - 1; i++)
      a += poly[i][0] * poly[i + 1][1] - poly[i + 1][0] * poly[i][1];
    total += a / 2;
  }
  return Math.abs(total);
}

export function bbox(d) {
  const { points } = walkPath(d);
  const ends = points.filter((p) => p.kind === 'end');
  if (!ends.length) return null;
  return {
    x0: Math.min(...ends.map((p) => p.x)), x1: Math.max(...ends.map((p) => p.x)),
    y0: Math.min(...ends.map((p) => p.y)), y1: Math.max(...ends.map((p) => p.y)),
  };
}

/* ---- hashing --------------------------------------------------------- */

/* art: { [state]: { [size]: { body, accent } } }. Sorted keys, so the
   hash is the same whichever order the files were read in. */
export function hashArt(art) {
  const h = createHash('sha1');
  for (const state of STATES)
    for (const size of SIZES) {
      const a = art[state]?.[size];
      if (!a) continue;
      h.update(`${state}-${size}:${normaliseD(a.body)}|${normaliseD(a.accent)}\n`);
    }
  return h.digest('hex').slice(0, 12);
}

export function pascal(name) {
  return name.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
}
