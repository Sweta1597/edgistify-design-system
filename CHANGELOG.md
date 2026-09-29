# Changelog

Notable changes to `@edgistify/design-system`. This file is the contract with
the apps that consume it: anything that changes how a shipped component looks
or behaves belongs here, so an upgrade is a decision rather than a surprise.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [semver](https://semver.org/).

## [0.10.0] — 2026-09-29

### Added
- **A marketing layer**: `marketing.css`, `react/marketing` and
  `react/marketing/Header`. The brand and marketing section of the system —
  the public website, landing pages, campaign pages — built for the marketing
  team on the same tokens, fonts and rules as the products.
  - **It is a scope, not a mode.** Wrap a page in `.ed-mk` and the type scale
    steps up to reading sizes (16px body, not 14), the controls grow to touch
    sizes (44px, not 32) and a small set of marketing-only tokens appears:
    fluid display type (`--ed-mk-text-display`, 36→56px), section rhythm,
    container widths, and the dark band. Every product component still works
    inside it, because it reads the same tokens the scope re-tunes. One
    `Button.jsx` serves a scanner at 56px and a landing page at 44px.
  - **The dark band** (`.ed-mk-section--band`) re-maps the colour roles in
    scope — the same trick as dark mode applied to one region — so a Button,
    Badge or Card dropped onto it comes out right without a "dark" prop.
    Teal-300 is the accent there, at 10.3:1 on ink.
  - **Components**: `Section`, `SectionHead`, `Grid`, `Split`, `Tile`, `More`,
    `Chip`, `Wordmark`, `UtilityBar`, `Hero`, `ConfigPanel`/`ConfigQuestion`/
    `Select`, `Flow` (the live-order sequence, CSS-stepped, no video),
    `SetupCard`, `LogoStrip`, `StatStrip`, `Press`, `ServiceStack`/
    `ServiceCard`/`Platform` (five services sitting on the EdgeOS band),
    `LoopDiagram`, `Definition`, `ResultCard`, `VideoPlaceholder`, `Network`,
    `Steps`, `PricingCard`/`PricingRule`, `Faq` (native `<details>`, no JS),
    `CtaBand`, `Doors`, `Footer`, and `SiteHeader` (disclosure mega-menus and
    a drawer; the only client component).
  - **RULE 05 — no placeholder facts.** `<Pending>` renders a dashed slot
    where a number, logo or city is not yet verified. `StatStrip`,
    `ResultCard`, `Network` and `Press` all route unverified values through
    it, so an invented figure cannot reach a page by accident. The current
    site contradicts itself (75+ vs 100+ warehouses, 50+ vs 80+ customers);
    this is the mechanism that stops the next one doing the same.
  - **One brand button per viewport.** `variant="brand"` on the hero action
    only; `primary` (ink) everywhere else. RULE 04, restated for a page that
    scrolls.
  - Docs: a **Marketing** group on the site — overview and rules, brand
    (wordmark, colour, type, voice, claims), the component gallery, and the
    landing-page recipe.

## [0.8.0] — 2026-09-28

### Added
- **A second kind of table**: `.ed-table--managed` plus `react/useColumns`.
  The first kind is fixed — somebody chose the column order and it is the
  same for everyone. This one lets the reader pin columns into view and drag
  the rest into the order they think in. Everything else is the same table:
  density, zebra, severity, sticky head.
  - **Reordering is keyboard-first.** Tab to a grip and press the arrow keys.
    A drag handle with no arrow-key path is a keyboard trap under WCAG 2.1.1,
    and it is the failure almost every reorderable table ships with. Drag is
    the second way in, never the only one.
  - **Focus follows the column, not the slot** — otherwise the second arrow
    press moves whatever slid into the position you just left. Verified: two
    presses move one column two places.
  - **Pinned columns are always leftmost**, whatever the drag order says. A
    pinned column floating in the middle would stick to the left edge anyway
    and land on top of whatever is actually there.
  - The `left` offsets are measured from the rendered header and written
    inline, because which columns are pinned changes at runtime and CSS
    cannot know. Verified cumulative: the second pinned column sits at
    exactly the first one's width, and its body cells match.
  - Only the **last** pinned column carries the boundary rule; one after
    every pinned column turns the frozen block into a little table of its own.
  - Controls appear on hover and focus, but a **pinned** column keeps its pin
    visible — that one is state rather than an offer.

### Changed
- `Th` takes **`pin`** and **`grip`**, and `useColumns` gained `thProps(id)`,
  so a managed header is one spread: `<Th {...cols.thProps('order')}>`.
  They are prop *bags* rather than booleans-plus-callbacks, so the header
  stays ignorant of where the state lives — `useColumns` is one source, a
  store or a URL param is another, and `Th` does not need to know.
- `Table` takes **`managed`**. It wins over `pinFirst`: the two are different
  answers to the same question — one column chosen by whoever built the
  screen, versus columns chosen by the reader.
- `THead` forwards its ref, which `useColumns` needs to measure the rendered
  header for the pin offsets.
- The pin and grip glyphs are inlined in `Table.jsx`, like Badge's remove
  glyph, so the package still ships no icon dependency.
- **The pin is a tilted pushpin, and there is only one drawing of it.**
  Pinned is signalled by colour — the stroke turns teal — rather than by a
  filled variant, so there is no second glyph to keep in step with the first.
  It is drawn upright and rotated 45°: the rotated coordinates would be
  unreadable and impossible to adjust, and a transform is exact where
  hand-derived beziers are not.
  - Scaled to 0.88 about the centre as well. At 45° the upright 14×20 box
    spans the full 24 diagonally, so the 1.8 stroke — centred on the path,
    half of it outside — was clipped on all four edges. Measured before and
    after: 0–24 became 1.42–22.58.

### Fixed
- Five captured specimens (`content/*.html`) had `.note` blocks with two
  paragraphs. `.note` is a two-column grid, so the second one wrapped into
  the narrow key column and rendered about three words wide. The earlier
  pass fixed the JSX pages and missed these, because they are captured HTML.

## [0.7.0] — 2026-09-28

### Changed
- **The primary button is dark neutral, not teal.** `--ed-primary-surface`
  is neutral-950 (15.02:1 under white), inverting to neutral-25 in dark mode
  because a near-black button on a dark page is invisible.
  - A deliberate trade: teal stops marking every submit and goes back to
    marking identity, so the one `brand` button on a screen means something
    again. A brand colour on every submit button is a brand colour on nothing.
  - **`--ed-action` stays teal and keeps its other jobs** — input focus, the
    checkbox fill, the selected menu row. Those are brand moments, not commit
    moments, which is why this needed a new role rather than a redefinition.
- **Secondary is a filled grey, not a bordered white.** Beside a solid dark
  primary a bordered button reads as the weaker of two outlines; filled, the
  pair reads as two weights of the same thing.
- **Ghost is neutral too.** With a neutral primary, a teal ghost would have
  been the most brand-coloured thing on screen while being the least
  important — the hierarchy inverted.
- Contrast suite is **476 pairings**, up from 452.

### Fixed
- The Button page claimed secondary "carries a border, not a fill" and that
  primary was `#008277`. Both were true until this release and false after
  it — corrected alongside the change rather than after someone noticed.
- Six contrast pairs were still labelled "primary button" while measuring
  `--ed-action`, which no longer fills a button. Relabelled to what they
  actually guard.

## [0.6.0] — 2026-09-28

### Added
- **Soft nav variant** (`.ed-nav--soft`) and ten `--ed-nav-soft-*` roles.
  Grey rail, white selected pill, 20px icons, carets on groups rather than
  items, tight rows inside a group and a large gap between groups.
  - The pill carries `elevation-1`. White on neutral-100 is **1.26:1**, far
    too little to read as a state on contrast alone, so the shadow supplies
    the edge the value cannot. The one place in the system where a state
    leans on elevation, and deliberate: the alternative is a darker pill,
    which the variant exists not to have.
  - The selected sub-item takes the pill too, and keeps its dot: the pill
    says "this row", the dot says "and it is a page, not a section". Rows
    carry 3px of margin so two adjacent pills do not merge into one tall
    rectangle — with a shadow and no border they otherwise would.
  - One expanded parent at a time. Opening a parent collapses any other.
  - The caret beside a group name is **scenery, not a control**: the
    affordance for a popup that has not been built. It is `aria-hidden`,
    has no handler, and does not rotate — rotation would imply an
    open/closed state there is none of. It becomes a real button with
    `aria-haspopup` when the popup exists; until then a button that does
    nothing is worse than no button, because a keyboard user lands on it.

### Fixed
- `.note` is a two-column grid, so a second `<p>` inside one wrapped into
  the narrow key column. Seven notes across the site were rendering their
  second paragraph three words wide.

### Changed
- Contrast suite is **452 pairings**, up from 416.

## [0.5.0] — 2026-09-28

### Added
- **Icon library** (`icons/`, `react/Icon`, `icon.css`). Every icon the
  seller dashboard and the picker app use — 100 names — in one library with
  two fill states, two paths each: a **body** that takes the text colour and
  **one accent** on `--ed-icon-accent`. Rules are `docs/icon-brief.md`.
  - **Outline is monochrome; the accent belongs to the filled state.** Both
    states draw the same two paths, so the roof, the lid and the awning are
    all still there when outlined. The component paints the accent in the
    body colour unless `filled`, so teal means *this one is current* rather
    than decoration every row carries at once.
  - **Twelve drawn, 88 seeded.** The seeds are Material Symbols Rounded
    (Apache-2.0, `icons/THIRD_PARTY.md`) on the brief's own grid, body path
    only, so the set is complete on day one. `icons/manifest.json` records
    each icon's status, version and near pairs; `icons/CHANGELOG.md` records
    what moved. A seed becomes `drawn` the moment its file changes.
  - **No strokes.** What reads as an outline is a filled ring with the
    counter punched — the way the brief says, and unlike the stroked preview
    on the nav decision page, which the library now replaces.
  - `lint:icons`, in `npm test`: viewBox, two paths, fills, no
    strokes/groups/effects, 40-unit grid, 800-unit live area, accent share
    and placement — errors on drawn icons, warnings on seeds. `npm run build`
    regenerates `icons/index.js` and the manifest's computed fields; CI fails
    if either is stale.
  - `icon.css` carries the rule the 0.3.0 notes promised: on a primary,
    brand or danger button `--ed-icon-accent` collapses to the body colour,
    because nothing teal reads on teal.
  - Docs: `/components/icon` — a contact sheet at 14/16/20/24/32 on white and
    near-black, the near pairs at 14px, and the list of icons whose fill state
    equals their outline (41 today), which the apps need to know.

### Changed
- CI's stale check covers `icons/` as well as `dist/`.
- `react/Icon` accepts `children` as well as `icon`, so an app can wrap a
  glyph it has not migrated yet in the same sized box.

## [0.5.0] — 2026-09-28

### Added
- **Light nav variant** (`.ed-nav--light`) and nine `--ed-nav-light-*` roles.
  White ground, neutral-200 selected panel, neutral-950 text.
  - **The two variants move the panel in opposite directions**, and that is
    forced rather than stylistic. On dark it lifts (neutral-800 on
    neutral-950, 1.63:1). On light a lift barely registers — white on
    neutral-100 separates at only 1.26:1 — so it darkens instead
    (neutral-200 on white, 1.53:1).
  - Hover sits between the ground and the panel, so hovering a selected row
    deepens it rather than erasing it.
  - It carries a right border; a white rail is 1.12:1 against a neutral-50
    canvas and has no edge of its own.
  - In dark mode it steps back to dark chrome. A bright rail beside a dark
    page is glare, not contrast.

### Fixed
- **The focus ring was the same hue as the accent it surrounds, in both
  variants.** On dark, ring teal-300 against accent teal-400 separated at
  **1.28:1**; on light the two were the *same value*. A focused selected item
  lost its accent into its own outline. The ring is now neutral — **white**
  on dark, **ink** on light — 2.38:1 and 3.94:1 clear of their accents.
  Two brand colours from one ramp never separate well; the accent carries
  meaning, so the ring gave way.
- The light accent is **teal-600** rather than teal-700: lighter, and clear
  of the ink ring. At 3.07:1 on the panel it is the tightest pair in the nav,
  past the 3:1 a graphic part needs but without much room.

### Changed
- Contrast suite is **416 pairings**, up from 364. Two of the new ones
  measure *separation* rather than legibility — the only pairs that do —
  so the ring/accent collision cannot come back unnoticed.

## [0.4.0] — 2026-09-28

### Added
- **A platform-neutral token layer.** `dist/tokens.js`, `dist/tokens.d.ts`
  and `tokens/resolved.json`, generated from the authored CSS by
  `npm run gen:tokens`. 153 tokens in each of the four modes.
  - **`var()` is resolved.** React Native, Compose and SwiftUI have no
    custom properties; they need `#008277`, not `var(--ed-teal-600)`.
  - **Modes are pre-composed.** CSS gets dark+warehouse from the cascade —
    two attributes on `<html>`, four real states. A platform with no cascade
    needs the fourth handed to it already merged, in the same order
    `contrast-check.mjs` merges it.
  - `themeFor({ dark, warehouse })` returns the right table. Light is still
    the product; dark and warehouse are added, never inherited.
  - Verified by cross-checking **728 resolved values** against the contrast
    checker, which resolves the same tokens by its own independent code.
    Two resolvers agreeing is a much better check than either alone.
- `lint:tokens-fresh`, in `npm test`. Fails when the generated layer no
  longer matches the CSS. Without it the two would drift the first time
  somebody edited a colour, and a mobile app would ship last month's palette
  while the web shipped this month's. Verified against a planted change:
  exit 1 when stale, exit 0 when clean.

### Changed
- The CSS remains the **authored source**; the token data is an output. A
  generator that round-tripped the CSS would throw away every comment, and
  the comments are where this system keeps its reasoning.

## [0.3.0] — 2026-09-26

### Added
- **Nav** (`nav.css`), eight `--ed-nav-*` roles and `--ed-icon-accent`. Sidebar chrome: the one
  surface that does not follow the page, dark in every mode.
  - The ground is **neutral**, not brand. That is what lets the selected
    highlight read as teal at all — a teal panel on a teal ground is not a
    highlight — and it buys contrast: white sits at 15.02:1 rather than 11.86:1.
  - Selection is a **white filled icon on a neutral panel** (neutral-800,
    9.24:1 for the label), with the icon's **teal accent** carrying the brand
    at 3.89:1. The panel is neutral on purpose: a brand-coloured panel cannot
    host a brand-coloured accent — teal-500 measures 2.93:1 on teal-800 and
    3.04:1 on neutral-800, either side of the 3:1 line. Making the panel teal
    would have cost the accent its saturation.
  - The panel measures **1.55:1 against the ground**, far below the 3:1 a
    state indicator needs to stand alone — which is what "quiet" means, not a
    defect. The panel is the findability signal; the **filled icon and the
    heavier label** are the accessible ones.
  - That division matters because fill is not always available: in Material
    Symbols `apartment` and `bar_chart` are byte-identical across the FILL
    axis, so on icons like those the weight and the panel are all there is.
  - Sub-items have no icon to fill, so the dot is their filled state. It sits
    in the gutter the parent's icon occupies, so the column still lines up.
  - Rows are 48px: a 24px icon — `--ed-icon-lg`, which the space foundation
    already nominates for nav — plus 12px of block padding. Separation is
    space, not rules.
  - The nav defines its own focus ring, teal-300. The page's `--ed-focus` is
    teal-600, invisible on this chrome. A dark surface inside a light product
    does not inherit a focus colour that works.
  - `color-scheme: dark` on the nav, so a scrollbar inside it comes up dark
    even while the product is light.
  - No counts. A number beside every other item turns the nav into a
    dashboard and competes with the one thing it has to say.

- **Two-colour icons.** `--ed-icon-accent` is a role, not a hex, because no
  single teal survives every surface: teal-600 is 4.71:1 on white but 1.89:1
  on a teal panel; teal-300 is 8.11:1 on the nav but 1.85:1 on white. On a
  brand-coloured fill it collapses to the body colour. Drawing rules are in
  `docs/icon-brief.md`; the one that came out of building the preview rather
  than theory is that the accent must stay **outside** the body silhouette,
  since the body flips white/near-black with the theme and an accent sitting
  on it has to clear both.

### Fixed
- The shipped sidebar's unselected state, `text-white/70` on `bg-edg-primary`
  (teal-600), measures **3.12:1** — below the 4.5:1 a label needs, though it
  does clear the 3:1 for an icon. Six further uses at 60% opacity and below
  fail both thresholds. All of it on the product's primary navigation. No opacity could fix it
  there: white at full strength is only 4.71:1, so every reduction fails.
  State cannot be an alpha on that surface.
- Selection on that ground was worse: teal-500, which the Tailwind config
  calls `sidebarActive`, is **1.55:1** on teal-600, and every teal step down
  to teal-50 fails as a label.

### Changed
- Contrast suite is **364 pairings**, up from 324.

## [0.2.0] — 2026-09-22

### Added
- **Badge** (`badge.css`, `react/Badge`). Four statuses, a neutral and a brand
  tone. Replaces 140 status-colour class strings across 30 files, which between
  them reach for twelve hue families — slate, emerald, amber, rose, blue,
  violet, orange, purple, green, sky, indigo and brand — where the system
  defines four statuses and a neutral.
  - `strong` is how one status outranks another of the same kind (Delivered
    over Dispatched). The dashboard solved that with a darker emerald, and
    solved workflow stages (Picked, Packed, Assembly) with indigo and violet.
    Neither needs a hue: rank is a modifier, a stage is a different word.
  - `onRemove` turns it into a removable tag with a real `<button>` whose hit
    area expands to `--ed-target-min` — 44px in warehouse mode — without moving
    a visible pixel.
  - Carries no warehouse rules of its own. The padding follows
    `--ed-pad-chip-*` and the status tints become solid blocks because the
    colour foundation already redefines them for that mode.
  - One exception to that: in warehouse mode the plain tint is already a
    solid block, so `strong` would land on the identical colour and rank
    would silently disappear — which is the only thing it is for. It steps
    to the deep end of the ramp there instead. Caught by rendering the page
    in warehouse mode, not by the contrast suite, which had nothing to
    compare. All five deep steps are now measured.
- **Tooltip** (`tooltip.css`, `react/Tooltip`). Replaces the native `title`
  attribute, used in 17 places across the two apps and invisible in the picker
  app entirely, which is touch-only. WCAG 1.4.13 is built in: dismissible with
  Escape, hoverable, and it never times out. Lives in the top layer through
  `popover="manual"`, so there is no z-index to choose.
  - Attaches with `aria-describedby`, which supplements a name and cannot
    supply one — an icon-only button still needs its own `aria-label`.
  - Does not open on a non-mouse pointer. Touch has no hover, and a bubble the
    user cannot dismiss by moving away is worse than none.
- `--ed-tooltip-surface` / `--ed-tooltip-text`: a real colour role that inverts
  with the theme — dark over the light product, light over the dark one. Both
  directions measured; the contrast suite is now 304 pairings, up from 296.

### Changed
- `build/bundle-specimen-css.mjs` now bundles twelve stylesheets.

## [Unreleased]

### Added
- `lint:tokens` — fails on a reference to an `--ed-*` custom property the
  system never defines. A typo there is silent: CSS drops the whole
  declaration, so `gap: var(--ed-space-7)` where no such step exists becomes
  `gap: 0` and a layout quietly collapses. It found three on the docs site the
  day it was written. A declared fallback is treated as deliberate.
- `build/contrast-check.mjs` now exports `measure()`, `summary()` and
  `contrast()`, so the docs site can state measured numbers rather than carry
  a copy of them. Running it as a CLI is unchanged.
- `./build/contrast-check` added to the exports map.

### Changed
- `npm test` now runs four checks: contrast, grid, scale and tokens.

## [0.1.0] — 2026-09-17

First tagged version. Three foundations, six components, three build-time
checks, and a React layer for the pieces that need behaviour.

### Foundations
- **Colour** — six OKLCH ramps generated from `#00a699` at hue 185.07°, twelve
  steps each, spaced evenly in perceptual lightness. Two invariants hold across
  every ramp and are enforced by `npm test`: step 600 is ≥ 4.5:1 on white, step
  500 is ≥ 3.0:1. Neutrals carry 7% chroma at the brand hue so greys belong to
  the palette rather than sitting beside it.
- **Type** — Inter for UI, JetBrains Mono for identifiers. An eleven-step
  scale. IDs, SKUs and bin locations are set in the mono face deliberately: it
  disambiguates `0`/`O` and `1`/`l`, which matters when someone is reading a
  label off a carton.
- **Space** — a 4px grid, control heights, icon sizes, radii, elevation and
  z-layers.

### Components
`button`, `card`, `table`, the `input` family, `modal` (native `<dialog>`),
and the `menu` family (`Menu`, `Select`, `MultiSelect`, `CascadeSelect`,
`TreeSelect`, all native `popover`), plus `Popover` — a controlled panel for
screens that already own their open/closed state.

### Modes
Light is the product. Dark and warehouse are *added* modes, reached only by an
explicit attribute the app sets — never inherited from the operating system:

```
<html>                          light  (the product)
<html data-theme="dark">        dark
<html data-mode="warehouse">    warehouse
both attributes                 compose
```

### Checks
- `check:contrast` — 296 measured pairings across all four states, exits non-zero on failure
- `lint:grid` — spacing, radius and icon sizes against the grid
- `lint:scale` — type scale, bridge-aware for apps still on Tailwind defaults
