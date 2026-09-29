/* Fails if any documented colour pairing drops below its WCAG target.

   No shebang: this module is imported by the docs site as well as run by
   npm test, and a shebang cannot be placed in an ESM chunk by a bundler.
   Every caller invokes it through `node`, so nothing needed it. */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const css = ['primitives.css','semantic.css'].map(f=>readFileSync(join(here,'..','dist',f),'utf8')).join('\n');

function blocks(sel){
  // Anchored at line start, and the selector must be followed by its own
  // brace — otherwise `[data-mode="warehouse"]` also matches inside
  // `[data-theme="dark"][data-mode="warehouse"]` and the composed block
  // leaks into plain warehouse.
  const re = new RegExp(`^${sel}\\s*\\{([^}]*)\\}`,'gm');
  let m, out={};
  while((m=re.exec(css))) for(const [,k,v] of m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[k]=v.trim();
  return out;
}
const root = blocks(':root');
const dark = blocks('\\[data-theme="dark"\\]');
const warehouse = blocks('\\[data-mode="warehouse"\\]');
// The two attributes COMPOSE — a night shift in a warehouse carries both.
// Warehouse is declared after dark in semantic.css, so it wins where they
// overlap. Testing them only in isolation left that fourth state unmeasured.
const darkWh = blocks('\\[data-theme="dark"\\]\\[data-mode="warehouse"\\]');
const modes = {
  light:{}, dark, warehouse,
  'dark+warehouse':{ ...dark, ...warehouse, ...darkWh },
};
const resolve = (k, scope, seen=new Set()) => {
  if(seen.has(k)) return null; seen.add(k);
  const v = scope[k] ?? root[k]; if(!v) return null;
  const ref = v.match(/var\(\s*(--[\w-]+)\s*\)/);
  return ref ? resolve(ref[1], scope, seen) : v;
};
const srgb = c => c<=0.04045 ? c/12.92 : ((c+0.055)/1.055)**2.4;
function lum(col){
  let r,g,b, m = col.match(/^#([0-9a-f]{6})$/i);
  if(m){ const n=parseInt(m[1],16); r=(n>>16&255)/255; g=(n>>8&255)/255; b=(n&255)/255; }
  else { m = col.match(/rgb\(\s*(\d+)\s+(\d+)\s+(\d+)/); if(!m) return null;
         r=+m[1]/255; g=+m[2]/255; b=+m[3]/255; }
  return 0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(b);
}
const cr=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05);};
const PAIRS = [
  ['--ed-text','--ed-canvas',7,'body text on app background'],
  ['--ed-text','--ed-surface',7,'body text on card'],
  ['--ed-text-secondary','--ed-surface',4.5,'labels on card'],
  ['--ed-text-muted','--ed-surface',4.5,'captions on card'],
  ['--ed-text-muted','--ed-canvas',4.5,'captions on background'],
  ['--ed-text-link','--ed-surface',4.5,'links on card'],
  ['--ed-text-id','--ed-surface-id',4.5,'SKU/order id inside its chip'],
  ['--ed-text-id-strong','--ed-surface',4.5,'scanned identifier'],
  ['--ed-on-primary','--ed-primary-surface',4.5,'primary button label'],
  ['--ed-on-primary','--ed-primary-hover',4.5,'primary button hovered'],
  ['--ed-on-primary','--ed-primary-active',4.5,'primary button pressed'],
  ['--ed-on-secondary','--ed-secondary-surface',4.5,'secondary button label'],
  ['--ed-on-secondary','--ed-secondary-hover',4.5,'secondary button hovered'],
  ['--ed-text-secondary','--ed-secondary-surface',4.5,'ghost button hovered'],
  /* --ed-action is still teal, but it no longer fills a button. It marks
     brand moments: input focus, the checkbox fill, the selected menu row. */
  ['--ed-on-action','--ed-action',4.5,'content on a teal action fill'],
  ['--ed-on-action','--ed-action-hover',4.5,'teal action fill, hovered'],
  ['--ed-on-action','--ed-action-active',4.5,'teal action fill, pressed'],
  ['--ed-on-brand','--ed-brand',4.5,'text on brand fill'],
  ['--ed-success-on-surface','--ed-success-surface',4.5,'success chip'],
  ['--ed-warning-on-surface','--ed-warning-surface',4.5,'warning chip'],
  ['--ed-danger-on-surface','--ed-danger-surface',4.5,'danger chip'],
  ['--ed-info-on-surface','--ed-info-surface',4.5,'info chip'],
  ['--ed-on-success','--ed-success-solid',4.5,'solid success badge'],
  ['--ed-on-warning','--ed-warning-solid',4.5,'solid warning badge'],
  ['--ed-on-danger','--ed-danger-solid',4.5,'solid danger badge'],
  ['--ed-on-info','--ed-info-solid',4.5,'solid info badge'],
  ['--ed-white','--ed-green-800',4.5,'ranked success badge, warehouse'],
  ['--ed-white','--ed-blue-800',4.5,'ranked info badge, warehouse'],
  ['--ed-white','--ed-red-800',4.5,'ranked danger badge, warehouse'],
  ['--ed-white','--ed-amber-800',4.5,'ranked warning badge, warehouse'],
  ['--ed-white','--ed-neutral-900',4.5,'ranked neutral badge, warehouse'],
  ['--ed-icon-accent','--ed-surface',3,'icon accent on a card (non-text 3:1)'],
  ['--ed-icon-accent','--ed-canvas',3,'icon accent on the page ground'],
  ['--ed-nav-light-text','--ed-nav-light-surface',4.5,'LIGHT nav: unselected item'],
  ['--ed-nav-light-text-muted','--ed-nav-light-surface',4.5,'LIGHT nav: group label'],
  ['--ed-nav-light-text','--ed-nav-light-surface-hover',4.5,'LIGHT nav: item hovered'],
  ['--ed-nav-light-selected-text','--ed-nav-light-selected-surface',4.5,'LIGHT nav: selected item'],
  ['--ed-nav-light-focus','--ed-nav-light-surface',3,'LIGHT nav: focus ring'],
  ['--ed-nav-soft-text','--ed-nav-soft-surface',4.5,'SOFT nav: unselected item'],
  ['--ed-nav-soft-text-muted','--ed-nav-soft-surface',4.5,'SOFT nav: sub-item'],
  ['--ed-nav-soft-group','--ed-nav-soft-surface',4.5,'SOFT nav: group label'],
  ['--ed-nav-soft-selected-text','--ed-nav-soft-selected-surface',4.5,'SOFT nav: selected item'],
  ['--ed-nav-soft-focus','--ed-nav-soft-surface',3,'SOFT nav: focus ring on the rail'],
  ['--ed-nav-soft-focus','--ed-nav-soft-selected-surface',3,'SOFT nav: focus ring on the pill'],
  ['--ed-nav-soft-accent','--ed-nav-soft-selected-surface',3,'SOFT nav: icon accent on the pill'],
  ['--ed-nav-soft-text','--ed-nav-soft-surface-hover',4.5,'SOFT nav: current sub-item, hovered'],
  ['--ed-nav-soft-focus','--ed-nav-soft-accent',2,'SOFT nav: ring vs accent'],
  ['--ed-nav-focus','--ed-nav-selected-surface',3,'focus ring on the selected panel'],
  ['--ed-nav-light-focus','--ed-nav-light-selected-surface',3,'LIGHT nav: ring on the panel'],
  /* Not legibility — a separation invariant. The ring must not dissolve
     into the accent it surrounds; both were teal and both collided. */
  ['--ed-nav-focus','--ed-icon-accent',2,'focus ring vs the accent it surrounds'],
  ['--ed-nav-light-focus','--ed-nav-light-accent',2,'LIGHT nav: ring vs accent'],
  ['--ed-nav-light-border','--ed-nav-light-surface',1.1,'LIGHT nav: edge against the canvas'],
  ['--ed-nav-light-accent','--ed-nav-light-selected-surface',3,'LIGHT nav: icon accent, selected'],
  ['--ed-nav-light-text','--ed-nav-light-selected-surface',4.5,'LIGHT nav: label on the panel'],
  ['--ed-nav-light-accent','--ed-nav-light-surface',3,'LIGHT nav: icon accent, ground'],
  ['--ed-nav-text','--ed-nav-surface',4.5,'unselected nav item'],
  ['--ed-nav-text-muted','--ed-nav-surface',4.5,'nav group label and sub-item'],
  ['--ed-nav-text','--ed-nav-surface-hover',4.5,'nav item hovered'],
  ['--ed-nav-selected-text','--ed-nav-selected-surface',4.5,'SELECTED nav item on its panel'],
  ['--ed-nav-focus','--ed-nav-surface',3,'nav focus ring (non-text 3:1)'],
  ['--ed-nav-focus','--ed-nav-selected-surface',3,'focus ring on a selected item'],
  ['--ed-teal-400','--ed-nav-selected-surface',3,'icon accent on the selected panel'],
  ['--ed-nav-text','--ed-neutral-700',4.5,'selected nav item hovered'],
  ['--ed-tooltip-text','--ed-tooltip-surface',4.5,'tooltip label'],
  ['--ed-text-secondary','--ed-surface-sunken',4.5,'neutral badge'],
  ['--ed-border-strong','--ed-surface',3,'emphasis divider (non-text 3:1)'],
  ['--ed-focus','--ed-surface',3,'focus ring on card'],
  ['--ed-focus','--ed-canvas',3,'focus ring on background'],
  /* button component */
  ['--ed-neutral-600','--ed-neutral-100',3,'disabled button label (inert, 3:1 target)'],
  /* The ghost button is neutral now; these guard the teal tint wherever it
     is still used as a hover ground. */
  ['--ed-on-brand-subtle','--ed-brand-subtle',4.5,'text on a brand tint'],
  ['--ed-action-active','--ed-brand-muted',4.5,'text on a brand tint, deeper'],
  ['--ed-danger-text','--ed-danger-subtle',4.5,'quiet danger button, hovered'],
  ['--ed-danger-text','--ed-danger-muted',4.5,'quiet danger button, pressed'],
  ['--ed-on-brand','--ed-teal-400',4.5,'brand button, hovered'],
  ['--ed-white','--ed-red-700',4.5,'danger button, hovered'],
  ['--ed-white','--ed-red-800',4.5,'danger button, pressed'],
  /* card component */
  ['--ed-text','--ed-surface-sunken',7,'card footer text on its sunken bar'],
  ['--ed-text-muted','--ed-surface-sunken',4.5,'card subtitle on footer bar'],
  ['--ed-success-text','--ed-surface',4.5,'stat delta, good'],
  ['--ed-danger-text','--ed-surface',4.5,'stat delta, bad'],
  ['--ed-danger-text','--ed-surface',3,'danger accent stripe (non-text 3:1)'],
  ['--ed-warning-text','--ed-surface',3,'warning accent stripe'],
  ['--ed-success-text','--ed-surface',3,'success accent stripe'],
  ['--ed-info-text','--ed-surface',3,'info accent stripe'],
  ['--ed-action','--ed-surface',3,'interactive card border, hovered'],
  ['--ed-action','--ed-surface-hover',3,'interactive card border, pressed'],
  /* table component */
  ['--ed-text-muted','--ed-surface-sunken',4.5,'table column header'],
  ['--ed-text-secondary','--ed-surface',4.5,'table cell body text'],
  ['--ed-text-secondary','--ed-surface-hover',4.5,'table cell on a hovered row'],
  ['--ed-text-id','--ed-surface',4.5,'SKU column'],
  ['--ed-text-id','--ed-surface-hover',4.5,'SKU column on a hovered row'],
  ['--ed-text','--ed-surface-sunken',7,'table footer totals'],
  ['--ed-text-secondary','--ed-brand-subtle',4.5,'cell text on a selected row'],
  ['--ed-text-id','--ed-brand-subtle',4.5,'SKU on a selected row'],
  ['--ed-text-muted','--ed-surface',4.5,'empty-state copy'],
  /* form controls */
  ['--ed-text','--ed-surface',7,'text typed into a field'],
  ['--ed-text-muted','--ed-surface',4.5,'placeholder text'],
  ['--ed-text-secondary','--ed-canvas',4.5,'field label on the page ground'],
  ['--ed-danger-text','--ed-surface',4.5,'validation message'],
  ['--ed-danger-text','--ed-surface',3,'invalid field border (non-text 3:1)'],
  ['--ed-border-strong','--ed-surface',3,'checkbox border, unchecked'],
  ['--ed-on-action','--ed-action',4.5,'checkmark on a ticked box'],
  ['--ed-text-muted','--ed-surface-sunken',4.5,'input addon, e.g. a currency prefix'],
  ['--ed-text-muted','--ed-surface-sunken',4.5,'disabled field value stays readable'],
  /* modal */
  ['--ed-text','--ed-surface-raised',7,'dialog title'],
  ['--ed-text-muted','--ed-surface-raised',4.5,'dialog subtitle'],
  ['--ed-text-secondary','--ed-surface-raised',4.5,'dialog body copy'],
  ['--ed-danger-text','--ed-surface-raised',3,'alert dialog stripe (non-text 3:1)'],
  ['--ed-border-strong','--ed-surface-raised',3,'sheet grab handle'],
  /* menu + select family */
  ['--ed-text-secondary','--ed-surface-raised',4.5,'menu item at rest'],
  ['--ed-text','--ed-surface-hover',7,'menu item highlighted'],
  ['--ed-text-muted','--ed-surface-raised',4.5,'option hint and shortcut'],
  ['--ed-text','--ed-brand-subtle',7,'selected option row'],
  ['--ed-text','--ed-brand-muted',7,'selected option, highlighted'],
  ['--ed-on-brand-subtle','--ed-brand-subtle',4.5,'multi-select token'],
  ['--ed-on-brand-subtle','--ed-brand-muted',4.5,'token remove button, hovered'],
  ['--ed-danger-text','--ed-danger-subtle',4.5,'destructive menu item, hovered'],
  ['--ed-text-secondary','--ed-surface-sunken',4.5,'panel footer, e.g. "3 selected"'],
  // A plain <Popover> of buttons moves real focus onto a row, which also
  // takes the hover background — so the ring is drawn on that, not on the
  // panel. Non-text UI, so 3:1.
  ['--ed-focus','--ed-surface-hover',3,'focused popover row'],
];
/* Every pairing, measured, as data. The docs site imports this so it can
   state the real numbers rather than carry a copy of them that goes stale —
   the same reason its examples render the component instead of describing it. */
export function measure(){
  const rows=[];
  for(const [mode,scope] of Object.entries(modes))
    for(const [from,to,min,why] of PAIRS){
      const fg=resolve(from,scope), bg=resolve(to,scope);
      if(!fg||!bg) continue;
      const ratio=cr(fg,bg);
      rows.push({ mode, from, to, fg, bg, min, why, ratio, pass: ratio>=min });
    }
  return rows;
}

export const summary = () => {
  const rows = measure();
  return { total: rows.length, passing: rows.filter(r=>r.pass).length,
           modes: [...new Set(rows.map(r=>r.mode))] };
};

/* Ratio of any two colours, for callers that have hexes rather than tokens. */
export const contrast = cr;

// --- CLI ---------------------------------------------------------------
// Only when run directly; importing this module must not print or exit.
const isCLI = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isCLI) {
let fail=0,n=0;
for(const [mode,scope] of Object.entries(modes)){
  console.log(`\n${mode.toUpperCase()}`);
  for(const [f,b,min,why] of PAIRS){
    const fc=resolve(f,scope), bc=resolve(b,scope);
    if(!fc||!bc){ console.log(`  ?  ${why} (unresolved)`); continue; }
    const r=cr(fc,bc); n++; const ok=r>=min; if(!ok) fail++;
    console.log(`  ${ok?'PASS':'FAIL'} ${r.toFixed(2).padStart(5)} /${min}  ${why.padEnd(34)} ${fc} on ${bc}`);
  }
}
console.log(`\n${n-fail}/${n} pairings pass`);
process.exit(fail?1:0);
}
