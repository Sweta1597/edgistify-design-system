# Edgistify Icon Library — Design Brief

A brief for drawing a custom icon set for an OMS/WMS product: a seller
dashboard (desktop, dense tables) and a warehouse picker app (handheld,
touch-only, used with gloves under sodium lighting).

Every number below is measured from the reference artwork, not estimated.

---

## 1. Canvas

| | Units | In dp |
|---|---|---|
| Grid | **960 × 960** | 24dp — 1dp = 40 units |
| Live area | **800 × 800**, centred | 20dp |
| Clear space | **80** on all four sides | 2dp |

`viewBox="0 -960 960 960"` — the y axis runs **−960 → 0**, baseline at 0.
Nothing may cross into the 80-unit margin.

**Snap to a keyline rather than filling the box:**

- Square **720** (18dp)
- Circle **800** diameter (20dp)
- Vertical rectangle **640 × 800**
- Horizontal rectangle **800 × 640**

All coordinates land on the 40-unit half-dp grid. No arbitrary decimals.

---

## 2. Construction

- **Stroke weight: 80 units (2dp)**, constant. Never tapered.
- **Outer corner radius: 80 units (2dp).**
- **Terminals fully rounded** — radius 40, half the stroke. Rounded, not cut.
- **Interior counters: 80 units** minimum — same as the stroke. Anything
  thinner closes up at 14px, which is where most usage sits.
- Optically centred, not mathematically. A triangle or a play glyph needs
  nudging; a circle does not.

Icons are **filled paths**. There is no `stroke` attribute anywhere. What
reads as an outline is a closed shape with a counter punched out of it.

---

## 3. Two colours

Each icon has a **body** and **one accent**.

**Body** — the whole silhouette. Renders white on dark grounds and near-black
on light ones, because it inherits the surrounding text colour.

**Accent** — teal, on **one** part of the shape. The roof of a house, the
tick on a badge, the scan line in a scanner, the fill of a progress arc.

### Rules

1. **One accent per icon.** Two accents and it stops being an icon.
2. **The accent is never load-bearing.** Convert the icon to one colour: if
   it still reads correctly, the accent is right. If meaning is lost, redraw.
   Nobody at 14px on a scanner screen resolves a teal sliver.
3. **The accent is a separate path**, so it can be recoloured per context.
4. **The accent is between 10% and 25% of the drawn area.** Below that it
   vanishes at 14px; above it the icon reads as two-tone rather than accented.
5. **Body and accent must not share an edge for more than 80 units** without
   a gap. Two flat colours meeting along a long seam shimmer at small sizes.
6. **The accent must never be fully enclosed by the body.** Make it part of
   the outer silhouette — a roof above the walls, an awning over a shopfront,
   the lid of a carton, the cargo box beside a cab, one block of four. Its
   edges then read against the surface. What fails is a mark floating in the
   middle of a filled shape, with body on every side.

   This is not stylistic. The body flips white on dark grounds and near-black
   on light ones, and the accent token flips too. An accent sitting *on* the
   body must therefore clear **both**, and most teals clear only one:

   | Accent | on a white body | on a near-black body |
   |---|---|---|
   | teal-600 | 4.71 ✓ | 3.19 ✓ |
   | teal-500 | 3.04 ✓ | 4.95 ✓ |
   | teal-400 | 2.38 ✗ | 6.32 ✓ |
   | teal-300 | 1.85 ✗ | 8.11 ✓ |

   An accent on the silhouette is bounded by the surface on most of its
   edges, so the role's value is what matters and it is already measured.
   A fully enclosed mark is bounded by the body on every edge, and must
   therefore be a fixed teal-500 or teal-600 — it cannot use the role.

7. **The accent never encodes status.** Teal means "this is Edgistify, and
   this is the thing to click". It must never mean success, done, or in
   stock — the product's success green sits 39° away in hue, close enough to
   confuse when someone is scanning a pick list under a sodium lamp.

### Why the accent cannot be one fixed teal

No single value clears every surface these icons land on. Measured against
a 3:1 minimum for a meaningful graphic part:

| Accent | on white | on a dark nav | on a teal panel | on a teal button |
|---|---|---|---|---|
| teal-600 `#008277` | 4.71 ✓ | 3.19 ✓ | 1.89 ✗ | 1.00 ✗ |
| teal-500 `#00a699` | 3.04 ✓ | 4.95 ✓ | 2.93 ✗ | 1.55 ✗ |
| teal-400 `#2ebbae` | 2.38 ✗ | 6.32 ✓ | 3.74 ✓ | 1.98 ✗ |
| teal-300 `#5ad1c3` | 1.85 ✗ | 8.11 ✓ | 4.80 ✓ | 2.54 ✗ |

So **draw the accent as a named role, not a hex.** The application swaps the
value per surface, and on a brand-coloured fill it collapses to the body
colour — nothing teal reads on teal.

Draw with `#008277` as the working value. It is the light-surface case.

---

## 4. Two fill states

Every icon ships **outline** and **filled**. They are the same silhouette.

**The accent belongs to the filled state only.** The outline state is
monochrome — it takes the body colour throughout, including the parts that
would be accented. Both states draw the same two paths, so the roof, the
awning and the lid are all still there when outlined; only the treatment
changes. That way the teal means *this one is current*, rather than being
decoration every row carries at once.

**Filled = the outer shape with the large interior counter removed.
Meaningful small detail stays.**

Method:

1. Draw the **filled** version first — it is the silhouette.
2. Punch the main counter to produce the outline.
3. Detail that carries meaning stays in both.

**Flag icons with no large counter.** Bar charts, solid buildings, dots:
there is nothing to punch, so both states come out identical. That is not a
mistake, but it must be reported per icon, because the application relies on
the fill change to signal selection and needs to know where it gets nothing.

---

## 5. Optical sizes

Draw at **24dp first**. Then redraw for **20dp** and **48dp**.

This is a redraw, not a scale, and **not a simplification** — in the
reference set the 20dp drawings carry *more* path nodes than the 48dp ones
(585 against 531 across twelve icons). What changes is the stroke weight
relative to the box, and how open the counters are.

If only one size is drawn, draw 24.

---

## 6. Output

Per icon, per fill state, per optical size:

- `viewBox="0 -960 960 960"`, no `width` or `height` on the `<svg>`
- **Exactly two paths**: `class="body"` and `class="accent"` — in that order
- `fill="currentColor"` on the body; the accent gets
  `fill="var(--ed-icon-accent, #008277)"`
- Nonzero winding with reversed subpaths for counters. Not `fill-rule="evenodd"`
- One compound path per colour. No `<g>`, no `<mask>`, no `<clipPath>`
- No gradients, no opacity, no filters, no embedded raster
- Filename: `{name}-{outline|filled}-{20|24|48}.svg`, kebab-case

---

## 7. Icons required

98 in current use. Ordered by frequency; the first 30 carry most of it.

**Navigation & chrome** — home, dashboard, chevron-right, chevron-down,
chevron-left, arrow-right, arrow-left, arrow-up, arrow-down, arrow-up-down,
arrow-left-right, more-vertical, panel-left-close, panel-left-open,
external-link, grip-vertical, navigation

**Logistics & fulfilment** — package, package-check, package-plus, boxes,
box, truck, warehouse, store, building, layers, blocks, shopping-cart,
shopping-bag, split, scissors, repeat, undo, rotate-ccw

**Scanning & devices** — scan-line, printer, keyboard, wifi, battery-full,
signal-high, plug

**Actions** — search, filter, copy, trash, plus, minus, x, check, pencil,
save, upload, download, send, play, play-circle, refresh, sliders, settings,
settings-2, wand, sparkles, zap, hand, pin, pin-off

**Status & feedback** — info, alert-triangle, alert-circle, check-circle,
x-circle, ban, shield, shield-alert, shield-check, shield-off, lock, bell,
star, thumbs-up, thumbs-down, loader, clock, calendar-clock, trending-up

**Documents & data** — file-text, file-spreadsheet, book-open, clipboard-list,
clipboard-check, list-checks, list-ordered, bar-chart, eye, map-pin, users,
user, log-out

---

## 8. Acceptance checklist

Per icon:

- [ ] `viewBox="0 -960 960 960"`, artwork inside the 800-unit live area
- [ ] 80-unit stroke, 80-unit counters, 80-unit outer radius, rounded terminals
- [ ] Snapped to a keyline, every coordinate on the 40-unit grid
- [ ] Both fill states, outer silhouette identical between them
- [ ] One accent, 10–25% of drawn area, still readable converted to one colour
- [ ] Optically centred
- [ ] Legible at **14px** at 60cm, and at **24px** at arm's length under glare
- [ ] Two paths, correct fills, no groups or effects

Per set:

- [ ] A contact sheet at 14 / 16 / 20 / 24 / 32px, both fill states, on white
      and on near-black
- [ ] A list of icons whose fill state is identical to their outline
- [ ] No two icons confusable at 14px — check the near-pairs:
      package/box/boxes, truck/package-check, shield variants,
      alert-triangle/alert-circle
