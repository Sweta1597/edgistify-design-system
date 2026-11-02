import 'server-only';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { contrast, summary } from '@edgistify/design-system/build/contrast-check';

/* The installed package directory. Read from disk rather than resolved:
   `require.resolve` is stubbed inside bundled server code, and resolving a
   CSS path makes the bundler try to place a stylesheet in an ESM chunk.
   install-links puts a real directory here, so the path is stable.

   The exports map is still exercised — by every component import and by
   every stylesheet in globals.css, which is where a missing export would
   actually hurt. */
const PKG = join(process.cwd(), 'node_modules', '@edgistify', 'design-system');

const read = (rel) => readFileSync(join(PKG, rel), 'utf8');
const json = (rel) => JSON.parse(read(rel));

const palette = json('tokens/color.json');
const type_ = json('tokens/type.json');

/* Parsing the shipped stylesheet beats restating its values: a token added
   or changed shows up here without anyone remembering to update a page. */
/** Custom properties declared in a stylesheet's bare :root block, in order. */
export function rootTokens(file) {
  const css = read(`dist/${file}`);
  const block = css.match(/^:root\s*\{([\s\S]*?)^\}/m);
  if (!block) return [];
  return [...block[1].matchAll(/(--ed-[\w-]+)\s*:\s*([^;]+);(?:\s*\/\*\s*(.*?)\s*\*\/)?/g)]
    .map(([, name, value, note]) => ({ name, value: value.trim(), note: note || null }));
}

export const STEPS = ['25','50','100','200','300','400','500','600','700','800','900','950'];

export const RAMP_ROLES = {
  teal:    'brand, actions, focus',
  neutral: 'surfaces, text, borders',
  green:   'success, picked, in stock',
  amber:   'warning, short pick, ageing',
  red:     'danger, SLA breach, not found',
  blue:    'information, links in docs',
};

/** Every ramp, with each step's measured contrast against white. */
export function ramps() {
  return Object.entries(palette.palette).map(([name, steps]) => ({
    name,
    role: RAMP_ROLES[name] ?? '',
    steps: STEPS.map((step) => ({
      step,
      hex: steps[step],
      onWhite: contrast(steps[step], '#ffffff'),
    })),
  }));
}

/* Every colour in the system, grouped, read from primitives.css so a ramp
   added there appears on Foundations > Colour by itself. Foundations holds
   all of them; the app and marketing pages show the ones each one uses. */
export const COLOUR_GROUPS = [
  { key: 'core', title: 'Core ramps', note: 'Generated in OKLCH from the brand teal. Used across the apps and the website.', hues: ['teal', 'neutral', 'green', 'amber', 'red', 'blue'] },
  { key: 'accent', title: 'Marketing accents', note: 'Beside teal on marketing pages only. Never a status.', hues: ['saffron', 'indigo'] },
  { key: 'brand-a', title: 'Brand A, the shipping label', note: 'Pinned to the palette of direction A, so these are not evenly spaced like the core ramps.', hues: ['stone', 'tan', 'orange', 'ink'] },
];

const COLOUR_ROLES = {
  ...RAMP_ROLES,
  saffron: 'the one highlight on a screen',
  indigo:  'Edgistify’s software: EdgeOS, EdgeWMS, EdgeLMS, EdgeFMS',
  stone:   'warm greys: grounds, cards, muted text',
  tan:     'cartons and quiet fills (400)',
  orange:  'the sticker (400) and its text (950); warm error (600, 700)',
  ink:     'near-blacks for panels in ink and what is raised on them',
};

/** Every primitive colour: the ramps by group, and the single colours outside a ramp's 25–950. */
export function colours() {
  const all = rootTokens('primitives.css').filter((t) => /^#[0-9a-f]{6}$/i.test(t.value));
  const byHue = {};
  const singles = [];
  for (const { name, value } of all) {
    const m = name.match(/^--ed-([a-z]+)-(\d+)$/);
    if (m && STEPS.includes(m[2])) (byHue[m[1]] ||= {})[m[2]] = value;
    else singles.push({ name, hex: value, onWhite: contrast(value, '#ffffff') });
  }
  const ramp = (name) => ({
    name,
    role: COLOUR_ROLES[name] ?? '',
    steps: STEPS.map((step) => (byHue[name][step]
      ? { step, hex: byHue[name][step], onWhite: contrast(byHue[name][step], '#ffffff') }
      : { step, hex: null })),
  });
  const grouped = new Set(COLOUR_GROUPS.flatMap((g) => g.hues));
  const groups = COLOUR_GROUPS.map((g) => ({ ...g, ramps: g.hues.filter((h) => byHue[h]).map(ramp) }));
  // a ramp added to primitives.css but not to a group above still shows
  const other = Object.keys(byHue).filter((h) => !grouped.has(h));
  if (other.length) groups.push({ key: 'other', title: 'Other ramps', note: '', ramps: other.map(ramp) });
  return { groups, singles, count: all.length };
}

/** The two invariants, checked against the tokens rather than asserted. */
export function invariants() {
  const all = ramps();
  const min = (step, target) => {
    const worst = all
      .map((r) => r.steps.find((s) => s.step === step).onWhite)
      .reduce((a, b) => Math.min(a, b), Infinity);
    return { step, target, worst, holds: worst >= target };
  };
  return [min('600', 4.5), min('500', 3.0)];
}

export const brand = { hex: palette.$brand, hue: palette.$hue };
export const type = type_;
export const contrastSummary = summary();
