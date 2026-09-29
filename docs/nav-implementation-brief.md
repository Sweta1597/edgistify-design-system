# Left Nav — Implementation Brief

For `seller-dashboard/src/components/Sidebar.jsx` (483 lines).
Design system **v0.4.0**, stylesheet `@edgistify/design-system/nav.css`.

Every ratio below is measured by `npm run check:contrast` and re-measured on
every commit, in all four modes.

---

## 1. What changes, in one line

The sidebar stops being teal and becomes neutral; selection stops being a
colour swap and becomes **a filled icon on a quiet panel, with teal only on
the icon's accent and the sub-item dot**.

---

## 2. Why — the two defects being fixed

**a. Selection is nearly invisible.** The config names `sidebarActive:
'#00a699'` — teal-500 on a teal-600 ground is **1.55:1**. Every teal step
down to teal-50 fails as a label. White was the only passing foreground.

**b. Fourteen text colours are set with opacity, and all fourteen fail.**

| Class | Uses | On teal-600 | Verdict |
|---|---|---|---|
| `text-white/80` | 2 | 3.59:1 | label fails |
| `text-white/70` | 6 | 3.12:1 | label fails |
| `text-white/60` | 1 | 2.68:1 | **both fail** |
| `text-white/50` | 3 | 2.30:1 | **both fail** |
| `text-white/40` | 1 | 1.95:1 | **both fail** |
| `text-white/30` | 1 | 1.66:1 | **both fail** |

A label needs 4.5:1, an icon 3:1. On a teal-600 ground there is no fix
through opacity: white at full strength is only 4.71:1, so every reduction
from there fails. **State cannot be an alpha on that surface.**

---

## 3. Tokens

Import `@edgistify/design-system/nav.css`. Do not hardcode these.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ed-nav-surface` | neutral-950 | ink | the ground |
| `--ed-nav-surface-hover` | neutral-900 | neutral-950 | row hover |
| `--ed-nav-selected-surface` | neutral-800 | neutral-800 | the selected panel |
| `--ed-nav-text` | white | white | unselected label + icon |
| `--ed-nav-text-muted` | neutral-200 | neutral-200 | group labels, sub-items |
| `--ed-nav-selected-text` | white | white | label on the panel |
| `--ed-nav-focus` | teal-300 | teal-300 | focus ring |
| `--ed-icon-accent` | teal-400 on a selected row | | the icon's teal part |

Measured: unselected **15.02:1**, group label **9.80:1**, selected
**9.24:1**, hover **12.20:1**, focus ring **8.11:1**, icon accent on the
panel **3.89:1**.

**The ground is neutral on purpose.** A brand-coloured panel cannot host a
brand-coloured accent — teal-500 is 2.93:1 on teal-800 against 3.04:1 on
neutral-800. Making the panel teal would cost the accent its saturation.

---

## 3b. Light variant

Add `ed-nav--light` to the `<nav>`. Nothing else changes — every rule reads
the roles.

| Role | Dark (default) | Light |
|---|---|---|
| Ground | neutral-950 | **white** |
| Unselected | white — 15.02:1 | neutral-950 — 15.02:1 |
| Group label, sub-item | neutral-200 — 9.80:1 | neutral-700 — 6.80:1 |
| Hover | neutral-900 — 12.20:1 | neutral-50 — 13.42:1 |
| Selected panel | neutral-800 — 9.24:1 | **neutral-200** — 9.80:1 |
| Icon accent | teal-400 — 3.89:1 | teal-600 — 3.07:1 on the panel |
| Focus ring | **white** — 15.02:1 | **ink** — 18.54:1 |
| Edge | none needed | 1px neutral-200 |

**The two variants move the panel in opposite directions.** On dark it
*lifts* — neutral-800 on neutral-950. On light it *darkens* — neutral-200
on white. That is not arbitrary: on light chrome a lift barely registers.
White on neutral-100 separates at **1.26:1**; going the other way reaches
**1.53:1**, which is where the dark variant sits (1.63:1).

**Hover sits between the ground and the panel**, so hovering a selected row
deepens it rather than erasing it.

**The light variant carries a right border.** A white rail is 1.12:1 against
a neutral-50 canvas — it has no edge of its own. The dark variant needs none.

**In dark mode the light variant does not stay light.** A bright rail beside
a dark page is glare, not contrast, so it steps back to dark chrome — a
lighter one than the default, so the two stay distinguishable.

## 3c. Soft variant

`ed-nav--soft`. A grey rail with a white selected pill — closest to the
Shopify-style admin rail.

| Role | Value | Ratio |
|---|---|---|
| Ground | neutral-100 | — |
| Unselected | neutral-950 | 11.96:1 |
| Sub-item | neutral-700 | 5.41:1 |
| Group label | neutral-800 | 7.35:1 |
| Selected pill | white + `elevation-1` | 15.02:1 |
| Icon accent | teal-600 | 4.71:1 on the pill |
| Focus ring | ink | 14.76:1 |

Differences from the other two:

- **Icons are 20px** (`--ed-icon-md`) rather than 24. The shared sub-item
  indent is built on a 24px icon, so this variant restates it — otherwise
  children sit 4px right of their parent's label.
- **Rows are packed tight** inside a group; the gap *between* groups is
  large. That contrast is the grouping, which is why there are no dividers.
- **Items have no caret. The group has one, and it is not a control.**
  The caret beside a group name is the affordance for a popup that has not
  been built. It is `aria-hidden`, carries no handler, and does not collapse
  anything. It points right and does not rotate — rotation would imply an
  open/closed state, and there is no state.

  **When the popup is built:** the caret becomes a real `<button>` with
  `aria-haspopup="menu"` and `aria-expanded`, and the group name moves
  inside it. Until then it stays scenery — a button that does nothing is
  worse than no button, because a keyboard user lands on it.
- **The selected sub-item takes the pill too**, so the current page is
  marked the same way wherever it sits in the tree. Its dot stays: the pill
  says *this row*, the dot says *and it is a page, not a section*.
- **Rows carry 3px of margin, not 0.** A section and its current page can
  both hold a pill, and the two rows touch — with only a shadow and no
  border they read as one tall rectangle. Three pixels of rail between them
  is enough to separate them while the group still reads as one block.
- **One expanded parent at a time.** Opening a parent collapses any other.
  The open-state map is replaced rather than merged, so only the clicked key
  survives; clicking the open one closes it.

**The pill leans on a shadow, and that is deliberate.** White on neutral-100
is **1.26:1** — far too little to read as a state on contrast alone. This is
the one place in the system where a state depends on elevation rather than a
value. The alternative is a darker pill, which this variant exists not to
have.

**A literal white focus ring is not possible here.** It measures 1.26:1 on
the rail and **1.00:1 on the white pill** — invisible. WCAG 1.4.11 wants 3:1
for a focus indicator. The pill is white; the keyboard ring is ink.

## 4. Markup

```jsx
<nav className="ed-nav" aria-label="Main">
  <div className="ed-nav__group">Orders</div>

  <button
    type="button"
    className="ed-nav__item"
    aria-current={isCurrentPage ? 'page' : undefined}
    data-within={holdsCurrentPage ? 'true' : undefined}
    aria-expanded={hasChildren ? isOpen : undefined}
  >
    <NavIcon name="…" filled={isCurrentPage || holdsCurrentPage} />
    <span className="ed-nav__label">B2C Outward</span>
    {hasChildren && <Caret className="ed-nav__caret" />}
  </button>

  {hasChildren && isOpen && (
    <div className="ed-nav__sub">
      <button type="button" className="ed-nav__item"
              aria-current={isCurrentPage ? 'page' : undefined}>
        <span className="ed-nav__label">Manifests</span>
      </button>
    </div>
  )}
</nav>
```

Classes: `ed-nav`, `ed-nav--collapsed`, `ed-nav__group`, `ed-nav__item`,
`ed-nav__icon`, `ed-nav__label`, `ed-nav__caret`, `ed-nav__sub`.

### `aria-current` vs `data-within`

**`aria-current="page"` goes on exactly one element** — the page you are
actually on. A parent that merely *contains* that page carries
`data-within="true"` instead. Both look identical; only one is announced.
A screen reader hearing two "current" items is worse than hearing none.

---

## 5. Selection model

| State | Icon | Panel | Extra |
|---|---|---|---|
| Unselected | **stroked**, white | none | — |
| Hover | stroked | `--ed-nav-surface-hover` | — |
| **Selected** | **filled** + teal accent | `--ed-nav-selected-surface` | semibold |
| Parent of the current page | **filled** + teal accent | same panel | `data-within` |
| Selected sub-item | (no icon) | same panel | **teal dot** |

Teal appears in exactly two places on the whole nav: the current section's
icon accent, and the current page's dot. That is what makes it mean
*you are here* rather than being decoration every row carries.

**The panel is the quiet signal.** At 1.55:1 against the ground it is far
below the 3:1 a state indicator needs alone — deliberately. The **filled
icon and the heavier label** carry the state; the panel makes it findable.

That division matters because fill is not always available: some icons have
no meaningful filled variant (`apartment` and `bar_chart` are byte-identical
across Material's FILL axis), and on those the weight and panel are all
there is.

---

## 6. Spacing

- Rows **48px** — a 24px icon (`--ed-icon-lg`, which the space foundation
  nominates for nav) plus 12px block padding.
- Gap icon → label **12px**. Row gap **2px**.
- Sub-items indent to sit under the parent's **label**, not its icon, and
  carry **no icons of their own** — a second column of icons at that depth
  reads as a second nav.
- The dot sits in the gutter the parent's icon occupies, so the column
  still lines up.
- Separation is **space, not rules**. A divider every 48px turns a nav
  into a table.

---

## 7. Details that are easy to miss

- **The nav needs its own focus ring, and it is NEUTRAL.** The page's
  `--ed-focus` is teal-600, **2.52:1** on dark chrome — invisible. But a teal
  ring is wrong here for a second reason: it would surround a teal icon
  accent. Measured, teal-300 against teal-400 separates at **1.28:1**, so a
  focused selected item lost its accent into its own outline. The ring is
  **white** on the dark variant and **ink** on the light one — 2.38:1 and
  3.94:1 clear of their accents. Two brand colours from one ramp never
  separate well; the accent is the one carrying meaning, so the ring gave way.
- **`color-scheme: dark`** is set on `.ed-nav`, so a scrollbar inside it
  comes up dark while the product is light.
- **The caret is a solid triangle**, not a stroked chevron — at 16px a 2px
  stroke beside filled icons reads as two icon languages.
- **Hover must not erase selection.** A selected row that turns the hover
  colour looks deselected while the pointer is on it.
- **No counts.** A number beside every other item turns the nav into a
  dashboard and competes with the one thing it has to say. If a count truly
  belongs, put it on one item, as a dot rather than a number.

---

## 8. Migration checklist

- [ ] Import `@edgistify/design-system/nav.css`
- [ ] Replace `bg-edg-primary` (5 uses) with `.ed-nav`
- [ ] Remove all 14 `text-white/NN` — use `--ed-nav-text` / `-text-muted`
- [ ] Remove `bg-edg-sidebarActive` (3 uses) and `bg-white/10|20` (6 uses)
- [ ] Wire `aria-current="page"` to the current route, once
- [ ] Wire `data-within="true"` to ancestors of the current route
- [ ] Swap the 34 icons to outline / filled pairs
- [ ] Size icons with `.ed-icon-lg`, never a `size` prop — otherwise they
      will not grow on the handheld
- [ ] Check all four modes: Desk/Warehouse × Light/Dark

## 9. Reference

Live: `/compare/nav` on the docs site — today's sidebar beside the new one,
both clickable, with the mode toggle working on both.
Custom icons: `docs/icon-brief.md`.
