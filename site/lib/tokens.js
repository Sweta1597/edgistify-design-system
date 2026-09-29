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
