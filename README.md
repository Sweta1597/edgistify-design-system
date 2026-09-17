# Edgistify Design System

One visual language across four apps: seller dashboard (5180), picker app (5181),
support docs (5173), support admin (5175).

## Install

```
npm i @edgistify/design-system   # or: "file:../../edgistify-design-system"
```

```css
@import "@edgistify/design-system/primitives.css";
@import "@edgistify/design-system/semantic.css";
```

## The two layers

**Primitives** (`--ed-teal-500`) are the raw ramps. Six hues, twelve steps,
generated in OKLCH so every step is perceptually even. Never use these in a component.

**Semantic** (`--ed-action`, `--ed-danger-text`) are roles. Components use only these.
That indirection is what lets dark mode and warehouse mode exist without touching a
single component.

## Modes

| | applied as | for |
|---|---|---|
| light | default | everything |
| dark | `<html data-theme="dark">` | night shifts, low-light aisles |
| warehouse | `<html data-mode="warehouse">` | picker app, scanner screens |

Warehouse is not a second brand. It is the same palette, louder: status stops being a
tint and becomes a solid block, and muted text and borders step up so nothing important
depends on a subtle grey seen through glare, at arm's length, in a hurry.
Dark and warehouse compose — a picker on a night shift gets both.

## Invariants

Every ramp holds these, and `npm test` fails the build if one breaks:

- **step 600** is always ≥ 4.5:1 on white — safe for body text, and safe as a fill under white text.
- **step 500** is always ≥ 3.0:1 on white — safe for large text, icons and borders only.
- Brand `#00a699` is step 500. It is therefore **never** safe behind white body text.

## The one rule about teal

Teal is the brand. Teal is not a status.

It must never mean "success", "done", "ok" or "in stock". Our success green sits 39°
away in hue — close enough that someone scanning a pick list under a sodium lamp will
confuse them. Success is always green. Teal means *this is Edgistify* and *this is the
thing to click*.

## Checking your work

```
npm test
```

69 documented colour pairings across all three modes, checked against WCAG 2.2.
Add a pairing to `build/contrast-check.mjs` whenever you introduce a new combination.

---

# Type

Two families. `Inter` for interface, `JetBrains Mono` for every identifier.

```css
@import "@edgistify/design-system/type.css";
```

```
npm i @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

```js
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
```

**Self-host. Do not use the Google Fonts CDN.** Warehouse wifi is unreliable and a
font that fails to load costs a shift. Three of the four apps currently declare fonts
that never load at all — `fonts.css` in the support frontend is zero bytes — so they
silently render in whatever the OS supplies.

## Why the scale has eleven steps

More than a typical scale, because these are dense data products and the old one had a
hole exactly where they live: it jumped 10px → 14px, so developers reached for
`text-[11px]`, `text-[12px]`, `text-[13px]` — 1,076 arbitrary sizes in the dashboard
alone, across 15 distinct values including half-pixels. The scale is fine-grained from
10–16px and coarse above it, which is the opposite of a marketing scale and the right
shape for a table.

85% of the 1,518 type declarations across the three apps land on a token exactly.

```
npm run lint:scale -- ../edge_oms_wms/seller-dashboard/src
```

Reports every off-scale size and the token to replace it with.

## Use the composite styles

`.ed-h1` `.ed-body` `.ed-label` `.ed-caption` `.ed-eyebrow` `.ed-cell` `.ed-metric`
`.ed-id` — size, weight, leading and tracking already decided. Reach for a raw token
only when composing something new. `leading-*` appears zero times in the dashboard
today, which is why line height is currently whatever the browser felt like.

## Identifiers

Any SKU, order number, bin location, pincode or barcode gets `.ed-id`. That carries
`slashed-zero` and `tabular-nums`, because someone reading `SKU-4417-BLK-M` off a
screen and matching it against a printed label must never confuse `0` with `O`.

## Warehouse mode

The scale's floor rises: `--ed-text-sm` is 12px normally and 14px under
`[data-mode="warehouse"]`. Nothing operational renders below 14px there. Regular
weight also steps 400 → 500, because thin strokes disappear under glare.

---

# Space

Grid, control sizing, radius, elevation and layers.

```css
@import "@edgistify/design-system/space.css";
```

## The grid bends to the product

Base unit 4px with 2px half-steps kept at the small end. A pure 4px grid is tidier in a
spec, but 887 of the dashboard's spacing values are half-steps (2, 6, 10, 14px) — rounding
a quarter of the existing layout to look neat is the wrong trade. **3,315 of 3,319 spacing
values already land on this grid.**

## Targets and the glove

WCAG 2.2 AA asks for 24px and AAA for 44px; both assume a bare fingertip. A gloved one has
a wider, less precise contact patch, so warehouse mode treats 44px as the floor rather than
the goal — operational controls are 56px and a screen's primary action is 64px. The picker
app today tops out at 48px with most controls at 36–44px.

Use `.ed-target` to grow a hit area outward without changing a single visible pixel. Visual
size and target size are different problems; don't solve the second by inflating the first
and losing the density the dashboard exists for.

## Icons are on the grid too

Lucide draws on a 24px artboard with a 2px stroke, so the rendered stroke is `2 × size ÷ 24`.
At 13px that is 1.08px and at 10px it is 0.83px — under one device pixel, which is why small
icons look soft. The dashboard uses **seven sizes between 8 and 15px; 198 of 306 icons are
off-grid.** Five sizes only, each paired with a stroke width that holds the optical weight
constant as the icon grows.

## Radius by role, and nesting

`sharp` 4 · `control` 6 · `card` 8 · `panel` 12 · `pill`. An inner radius equals the outer
radius minus the padding between them — repeat the outer value inside and the curves run
parallel instead of concentric, which reads as swollen corners.

## Layers

Eight named steps from `--ed-z-sticky` (100) to `--ed-z-tooltip` (700). A bare
`z-index: 9999` in a component is how a tooltip ends up behind a drawer.

```
npm run lint:grid -- ../edge_oms_wms/seller-dashboard/src
```

---

# Button

```js
import { Button, ButtonGroup } from '@edgistify/design-system/react/Button';
import '@edgistify/design-system/button.css';
```

Seven variants: `primary` `brand` `secondary` `ghost` `danger` `danger-quiet` `link`.
Five sizes `xs`–`xl`, mapped onto `--ed-control-*` so warehouse mode costs nothing.

Replaces 368 hand-styled `<button>` elements in the dashboard, no two of which agreed on
padding, weight, hover or disabled treatment.

## One brand button per screen

`primary` (#008277) does the everyday work. `brand` is full-strength #00a699 with dark ink
on it — reserve it for the single moment that matters most on a screen: *Start pick*,
*Scan*, *Confirm dispatch*. Teal used everywhere stops meaning anything.

## Anything that hits an API gets `loading`

There is no loading state anywhere in the apps today. A picker who taps *Confirm pick*
twice because the first tap showed nothing has created a duplicate, and a duplicate pick
confirmation is an inventory discrepancy somebody reconciles by hand later. The spinner
blocks pointer events, sets `aria-busy`, and holds the button's width so nothing beside
it jumps.

## Hover darkens, it does not fade

`hover:opacity-90` — the dashboard's current habit, 
fades the label along with the fill and goes muddy over a tinted row. Every variant moves
to a real token instead.

## Ships as .jsx plus .d.ts

The two JSX apps and the two TSX apps consume the same file with no build step between.
`as="a"` renders a link styled as a button; `icon` warns in dev without an `aria-label`.

---

# Pilot: picker-app-revamp

The first app on the system. 861 LOC, 10 files, Tailwind 3 — chosen as the smallest
real surface that still exercises colour, type, space, buttons and warehouse mode.

## How it was wired

```js
// tailwind.config.js — generated from tokens/color.json
colors:   static hex, so Tailwind's opacity modifiers (bg-brand/5) keep working
fontSize: var(--ed-text-*), so every utility follows [data-mode="warehouse"] live
slate/emerald/rose/amber -> design-system ramps, so 129 existing utilities adopt
                            the system without being rewritten
```

That split is deliberate. Colour utilities are static because Tailwind 3 cannot do
opacity maths on a `var()`; size utilities are live because that is where warehouse
mode earns its keep. Components (`.ed-btn`, `.ed-card`) are fully token-driven in both.

`data-mode="warehouse"` sits on the phone frame's interior. On a real device it goes
on `<html>`.

## What it took

| | |
|---|---|
| Files changed | 6 of 10 |
| `lib.jsx` primitives migrated | AppBar, Sheet, Dialog, BigButton, Pill, ProgressBar |
| Type sizes remapped | 56 |
| Icon sizes remapped | 21 |
| Utilities adopted by aliasing, unedited | 129 |
| Console errors | 0 |

Most of the win came from `lib.jsx`. Migrating six shared primitives re-themed every
screen; the screens themselves needed only mechanical size remapping.

## What the pilot found

**Buttons grew from 48px to 64px** without any screen asking for it — `BigButton` maps
to `--ed-control-xl` and the phone declares warehouse mode. That is the glove target
arriving for free.

**Icons inside buttons scale automatically** because `button.css` sets `.ed-btn > svg`
width from a token, which overrides the `size` attribute an icon library bakes in at
render time. Standalone icons cannot do this, which is why `.ed-icon-*` utilities exist.

**The app was using status colour for metadata.** Channel pills were amber for B2C and
teal for B2B. In desk mode that read as mild decoration; warehouse mode turned every
tint into a solid block, so every B2C row suddenly read as a warning. Fixed by moving
channel to neutral and leaving colour to priority. The system did not create this
problem — it made an existing one visible.

**`scale-lint` gave wrong advice to a bridged app.** Once `text-xs` means
`var(--ed-text-xs)` rather than 12px, reporting it as off-scale is noise. The linter now
detects the bridge and says so.

---

# Migration: seller-dashboard

15,455 LOC across 55 files. Visual only — no behaviour, no props, no handlers changed.

## What moved

| | |
|---|---|
| Palette utilities re-pointed by config alone, unedited | **3,024** |
| Arbitrary `text-[Npx]` remapped to the scale | **1,076** |
| Named Tailwind sizes shifted onto the DS scale | **241** |
| `font-['Plus_Jakarta_Sans']` → `font-sans` | **285** |
| Icon sizes put on grid | **191** (0 off-grid remain) |
| Buttons converted to `.ed-btn` | **83** |
| Shared components migrated | `Card`, `AlertChip` |
| Stock Tailwind palette values in the built CSS | **0** |
| Production build | passes, 2,425 modules |

`Plus Jakarta Sans` was declared 285 times and loaded zero times — every one of those
elements was silently rendering in the OS font.

## Ordering matters, and I got it wrong first

Remapping `text-[12px]` → `text-sm` before remapping the app's *own* `text-sm` makes the
two indistinguishable — and the app's `text-sm` means Tailwind's 14px while the system's
means 12px. Doing it in that order silently shrinks 134 elements. Restore from backup and
run the named shift first, the arbitrary remap second.

## Radius convergence

Four competing "card" radii (`rounded-lg` 225, `rounded` 188, `rounded-md` 104,
`rounded-xl` 42) now resolve through the config onto the four role tokens. No component
edit; the config is the migration.


---

# Table

```js
import { Table, TableWrap, THead, TBody, Tr, Th, Td } from '@edgistify/design-system/react/Table';
import '@edgistify/design-system/table.css';
```

## Sticky head is the default

The dashboard has 45 tables, eleven different `<thead>` treatments, and **two sticky
headers**. Row hover appears exactly once. Those are usability defects, not styling
drift: a 200-row order list whose header scrolls away makes every column a guess, and a
row that does not answer the pointer reads as static text. Pass `staticHead` to opt out.

## Cell roles, not cell styles

`<Td id>` SKU, order number, bin, pincode — mono with a slashed zero.
`<Td num>` right-aligned tabular figures. `<Td strong|muted|top|nowrap|actions>`.
The dashboard already reaches for `font-mono` on 13 SKU cells by instinct; this makes it
a decision the system made once.

## Sorting comes from aria-sort

`sort` drives both the `aria-sort` attribute and the arrow, from one value — a screen
reader and a sighted user cannot be told different things about the same column. None of
the dashboard's 45 tables can be sorted today; pass `onSort` and the header becomes a
real button.

## Three densities

The dashboard uses five vertical paddings (`py-1.5` … `py-4`). There are three real
cases: `compact` (6px, mini-tables inside a card), default (8px), `comfortable` (14px,
which also switches cells to top alignment because that is what wrapped content needs).

## Zebra or hairlines, never both

They do the same job; doing both makes a dense table look like corduroy. Turning on
`zebra` removes the row borders.

## Wide tables pin their first column

`pinFirst` freezes the identifier so a row scrolled sideways does not lose its name.
Two of the dashboard's tables are over 1,080px wide.

---

# Themes

**Light is the default.** Every product ships light. The bare `:root` block in
`semantic.css` is the real one; dark and warehouse are *added modes*, reached only by an
attribute the app sets explicitly.

```html
<html>                         <!-- light — the product -->
<html data-theme="dark">       <!-- dark -->
<html data-mode="warehouse">   <!-- warehouse -->
<html data-theme="dark" data-mode="warehouse">   <!-- composes -->
```

Nothing is inherited from the operating system. A picker whose phone is set to dark has
not asked for a dark warehouse app, and a seller opening the dashboard on a laptop in
dark mode has not asked for a dark dashboard. If you want a surface to follow the OS —
the public support docs, say — import `dark-auto.css` deliberately. Do not import it in
the dashboard, the picker or the admin.

This was wrong in the reference pages before 17 Sep 2026: they bundled `dark-auto.css`,
so on a dark-themed machine every component page opened dark with no way to reach light.
The apps were never affected — neither imports it — but the documentation was showing
the wrong default, which is its own kind of bug.

---

# Form controls

```js
import { Field, Input, Textarea, Select, Checkbox, Radio, InputGroup, InputAddon }
  from '@edgistify/design-system/react/Input';
import '@edgistify/design-system/input.css';
```

154 inputs, 57 checkboxes, 44 selects and 22 radios across the dashboard — and three
separate `inputCls` constants defined in three files, all meaning the same thing and
none agreeing.

## Field owns the id

The dashboard has **45 standalone `<label>` elements and 12 `htmlFor` between them**. An
unassociated label does not focus its field when clicked and is not announced with it.
`<Field>` generates the id, points the label at it, wires `aria-describedby` to the hint
and the error, and sets `aria-invalid` when an error is present. Getting the association
right costs nothing; getting it wrong is no longer possible.

`Checkbox` and `Radio` wrap their own label, so they need no id at all and the whole row
is the hit target.

## aria-invalid drives the error look

There is no `invalid` class. Set `aria-invalid` — which `Field` does for you when `error`
is truthy — and the border follows. What a screen reader announces and what the border
shows come from one value, the same rule as `aria-sort` on Table.

## Focus is replaced, never removed

`focus:outline-none` appears 51 times in the dashboard, not always with a working
replacement. Every control here takes a 2px `--ed-focus` outline.

## Numbers

`type="number"` right-aligns with tabular figures so a column of quantities compares by
eye — none of the dashboard's 28 number inputs do today. The spinner is removed: it is a
12px hit target that changes a stock count by accident.

## Disabled fields keep a readable value

WCAG exempts inactive controls from contrast, and the first draft duly sat at 1.97:1.
But half of these are settings pages showing a value someone needs to read and cannot
change, so disabled fields use muted rather than disabled text and take their cue from
the sunken fill, the softened border and the cursor.

---

# Modal, drawer, sheet

```js
import { Modal, ModalBody, ModalFooter } from '@edgistify/design-system/react/Modal';
import '@edgistify/design-system/modal.css';
```

The dashboard has nine modals built from `fixed inset-0`. Between them: **zero
`role="dialog"`, zero `aria-modal`, one Escape handler, no focus management and no scroll
lock.** A keyboard user who opens one is stranded — Tab walks out into the page behind,
which is still fully interactive, and nothing announces that a dialog opened.

## Built on the platform, not on us

This is a native `<dialog>` opened with `showModal()`. The browser supplies the focus
trap, Escape, the top layer, focus return, and genuine inertness of everything behind —
none of which is our code. Hand-rolling a focus trap is a well-known way to get it subtly
wrong; the fix is to stop hand-rolling it.

We add the two things the platform does not: a **scroll lock** on the page behind
(counted, so a nested dialog closing does not unlock it, and compensated for the
scrollbar so nothing shifts), and the visual design.

## Destructive confirmations ignore the backdrop and Escape

Every other dialog closes on both. An `alert` dialog does not, because a misplaced click
or a stray keystroke should never resolve a decision about deleting something. It also
takes `role="alertdialog"`, which tells a screen reader this is a decision, not a panel.

## Warehouse changes the shape, not the markup

A centred dialog is wrong on a handheld. Under `[data-mode="warehouse"]` every non-drawer
modal becomes a bottom sheet with a grab handle and stacked full-width actions within
thumb reach, with `env(safe-area-inset-bottom)` respected.

## Dark raised surfaces caught two tokens

`--ed-surface-raised` is *lighter* than the base surface in dark, so `--ed-text-muted` and
`--ed-border-strong` — both tuned against the darker one — fell short on a modal (3.72:1
and 2.88:1). Each moved one step lighter. Worth remembering when adding any component
that sits on a raised surface.

---

# Menu, Select, MultiSelect, Cascade, Tree

```js
import { Menu, Select, MultiSelect, CascadeSelect, TreeSelect }
  from '@edgistify/design-system/react/Menu';
import '@edgistify/design-system/menu.css';
```

Five components, one floating panel. They differ in what an item *means*:

| | role | the value is |
|---|---|---|
| `Menu` | `menu` / `menuitem` | nothing — an action ran |
| `Select` | `listbox` / `option` | one option |
| `MultiSelect` | `listbox` + `aria-multiselectable` | many options |
| `CascadeSelect` | columns, each a `listbox` | a **path** |
| `TreeSelect` | `tree` / `treeitem` | a **node** |

Every panel is a native popover, so the browser owns the top layer, light dismissal and
Escape — the same move as `<dialog>` for Modal. The dashboard's panels currently sit at
`z-20`, `z-30` and `z-50` depending on who wrote them; in the top layer there is nothing
to sort out.

## Don't use these when a native select will do

The dashboard has 44 selects holding **88 options between them** — under three each.
Native is smaller, keyboard-complete, and on a phone it opens the OS picker, which beats
anything we can draw. Reach for `Select` when the list is long enough to need searching,
or when an option needs more than a line of text. The styled native `<select>` from the
input family covers the rest.

## Cascade or Tree?

`CascadeSelect` when the depth is even and the **path is the answer** — a bin is always
warehouse → zone → aisle → bin, and you want all four. `TreeSelect` when the depth is
uneven and only the **node** matters — a category tree stops where it stops, and columns
would leave gaps.

## The token I should have added earlier

Four pairings failed on the first run, and they were the *same* failure already patched
once on the ghost button: `--ed-action` is not readable on the brand tints (4.24:1 on
`-subtle`, 3.82:1 on `-muted`). Hitting it twice meant it was a missing token, not a bug.
There is now `--ed-on-brand-subtle`, and the ghost button uses it too — by name rather
than by coincidence.

---

# Popover — for the dropdowns a screen already owns

`Menu`, `Select`, `MultiSelect`, `CascadeSelect` and `TreeSelect` own their own state and
their own markup. `Popover` owns neither. It exists so an existing hand-positioned
`absolute … z-50` panel can move into the browser's top layer without its behaviour being
rewritten — the screen keeps the `open` flag it already had, and puts inside whatever it
already rendered.

```jsx
import { Popover, useDropdown } from '@edgistify/design-system/react/Popover';

const nav = useDropdown();                       // owns its own flag
<button {...nav.triggerProps}>Warehouse</button>
<Popover {...nav.popoverProps} className="min-w-[220px]">…</Popover>
```

```jsx
// or adopt the flag the screen already has, so nothing else has to move
const d = useDropdown({ open: isOpen, setOpen: setIsOpen });
```

## The trigger's click has to come from the hook

This is the one thing `useDropdown` insists on. Light dismiss fires on `pointerdown` and
the click lands after it, so a second click on the trigger would close the panel and then
immediately reopen it — the panel would look stuck open. `useDropdown` swallows an open
that arrives within 150ms of a dismissal: long enough to cover that gap, short enough not
to eat a deliberate reopen a moment later.

## Focus has to cross into the panel, synchronously

The arrow keys are handled on the panel, so if focus stays on the trigger they never fire.
The panel takes focus the moment it opens — not inside the `requestAnimationFrame` that
positions it, because a key pressed in the frame between would be lost. Pass `autoFocus`
to land on the first item instead (a search field, usually).

That also means a plain `Popover` of ordinary buttons moves **real** DOM focus, where
`Menu` and `Select` keep focus on the trigger and point at a row with
`aria-activedescendant`. So `.ed-pop__item:focus-visible` had to light the same row the
same way `--active` does — otherwise a keyboard user walking that panel saw nothing.

## The min-width floor belongs in CSS

The panel grows to its trigger when the trigger is wider. Setting that as an inline
`min-width` beat the stylesheet's `12rem` floor and let a small trigger squash the panel to
79px. The anchor width now arrives as `--ed-pop-anchor-w` and the floor stays where it
belongs: `min-width: max(12rem, var(--ed-pop-anchor-w, 0px))`.

## What the dashboard migration removed

27 panels and 9 modals. Deleted along the way: **9 `fixed inset-0` click-away scrims**,
**every `document.addEventListener('mousedown', …)` outside-click listener in the app**,
and a menu that was toggled by adding and removing a `hidden` class on a `getElementById`
— it had no way to be dismissed except clicking the trigger again. Four per-row dropdowns
tracked "which row is open" in a shared `useState`; the browser does that now, by closing
one `popover="auto"` when the next opens.

`z-20`, `z-30`, `z-40` and `z-50` are all gone from those panels. In the top layer there is
nothing to sort out.

## color-scheme was missing

Found while testing the first migrated dropdown. The system said light everywhere but never
told the *browser* so — on a dark OS the UA still painted scrollbars, date and colour
pickers, the native `<select>`'s own popup and any unstyled canvas dark, inside our light
product. `:root` now declares `color-scheme: light` and `[data-theme="dark"]` declares
`dark`. The dashboard has 44 native selects, so this was not theoretical.

## The scroll lock has to follow `open`, not `showModal()`

`Modal` locked the page scroll next to its `showModal()` call. Under React's double-invoked
effects the second pass sees the dialog already open, skips the lock, and the first pass's
cleanup has already released it — a modal on screen over a page that still scrolled. The
lock is now its own effect keyed on `open`, which is idempotent and also covers unmounting
while open.
