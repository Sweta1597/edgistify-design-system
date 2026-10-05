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
    a drawer; the only client component). `SiteHeader` takes `tone="ink"` for
    the dark header: bar and panels are ink, the wordmark stays teal. Hovering a
    top-level item dims its siblings rather than painting a pill behind it;
    hovering a menu item turns its name teal and its description white. Menus open on hover with a mouse and on click with anything else. The
    panel is full width: three quarters sub-menu (one column per group, an
    icon and a name per item), one quarter related content (`aside`: a card
    and a list), and a footer strip carrying the `lead` link (a waving hand, a
    sentence, an arrow that grows its tail on hover) and optionally `footer`
    links. The sub-menu sets the panel's height; the aside fits inside it,
    its card fixed and its list scrolling. The aside's label sits on the
    same line as the group labels. Its `links` show a small white title
    over a grey line; on hover the title turns teal and the line white.
  - **RULE 05 — no placeholder facts.** `<Pending>` renders a dashed slot
    where a number, logo or city is not yet verified. `StatStrip`,
    `ResultCard`, `Network` and `Press` all route unverified values through
    it, so an invented figure cannot reach a page by accident. The current
    site contradicts itself (75+ vs 100+ warehouses, 50+ vs 80+ customers);
    this is the mechanism that stops the next one doing the same.
  - **One brand button per viewport.** `variant="brand"` on the hero action
    only; `primary` (ink) everywhere else. RULE 04, restated for a page that
    scrolls.
  - **Announcement bar** (`react/marketing/Announcement`): the one-line strip
    above the header — newsletter, report, event, offer. Three formats in
    one component (whole-line link, text + link, text + button), three tones
    (ink, brand, tint), a close button on every bar remembered per `id`,
    and an `end` slot at the right edge for a small text button (Login).
  - **Prompt** (`react/marketing/Prompt`): the requirement composer — a
    large text field, a website-URL field bottom left, attach and voice
    buttons bottom right, one submit (or `submit={false}` for Enter only) —
    with `.ed-mk-glow` for the dark, lit backdrop and `WaveMesh`, a teal
    wireframe wave surface drawn as deterministic inline SVG, for the dark,
    lit backdrop behind it. The "describe it in your own words" first touch.
  - **Explorer** (`Explorer`, `ExplorerNav`, `ExplorerPanel`, `FeatureCard`):
    a side list and panels — one quarter areas, three quarters content as
    feature cards, either one chosen panel or all of them stacked in a
    stream with the list highlighting as you scroll. The Services page is
    built on it.
  - **ShowcaseCard**: image on top, title and a line below; as a link it
    lifts on hover, an arrow appears beside the title and a teal light on
    its edge follows the cursor (`spotlight` pointer handler). `ExplorerPanel` takes `eyebrow` and `cols={3}`.
  - `Footer` takes `tone="ink"` for pages that are dark to the bottom.
  - **Hero `variant="bento"`**: copy on the left, a `Bento` on the right.
    Headline, lede and call to action sit as one group at the vertical
    middle of the bento's height. Spacing steps 1n, 2n, 3n: headline to
    lede, lede to call to action, call to action to the logo marquee.
    The headline is capped at 3rem in this hero, and on narrow desktops the
    bento grows with the copy so they share a height.
    The bento meets the header and bleeds to the window's right edge
    (full width on phones); its blocks have square corners.
  - **Bento** (`Bento`, `BentoTile`, `BentoHub`, `BentoOrbit`): three
    blocks stacked vertically, 1 : 2 : 1, the middle one the hub with the
    mark. One set of rings centred on the hub runs behind all three, so
    they read as connected; arcs travel round the rings and a pulse
    ripples out. One block is open at a time, at twice the height, the
    rings sliding with the hub (Shopify's unified-commerce strip, turned
    vertical). The open block cycles every two seconds (`cycle`, via the
    client `BentoMotion`); the block under the mouse stays open. On the
    dark tone the blocks take the page's ink, so the rings, broken by the
    gaps, are what mark them out. No glow behind the hub or around the
    mark. The drawing fades out toward the bento's outer edges
    (`--ed-mk-bento-fade-x`, `--ed-mk-bento-fade-y`) so it melts into the page. `orbit` puts channel tiles on a ring that
    circles through the bottom block. `tone="dark"` (default) or `"light"`.
    Motion stops under reduced motion; the hover needs a mouse.
  - **ExpandOnScroll** (`react/marketing/Expand`, client): a panel that
    widens from inset sides to full width as it scrolls in, its content
    rising into place (Freshworks' platform panel). `tone="light"` puts
    the light roles back inside it for a dark page.
  - **ShowcaseTabs** (`react/marketing/ShowcaseTabs`, client): tabs over
    copy · product screen · one figure; the parts enter from the left,
    below and right on each switch. Arrow keys move between tabs. Each
    tab can carry an icon in the label's colour; the row centres when it
    fits and scrolls from the first tab when it does not. The panel's
    heading stays on one line on wide screens.
  - **Screen**: a product-screen frame; without `image`, a dashed slot.
  - **ScrollCards** (`react/marketing/ScrollCards`, client): a pinned
    stage under the header; the page's scroll moves the cards sideways,
    first to last, with the front card's copy on the left, then the page
    scrolls on. Passed cards fade out, the next waits dimmed. A swipe row
    on phones. `lead` adds space above in multiples of the stage's own
    top space (lead={1} doubles the gap from the section before).
  - **SystemCard**: a system drawn as a small product card — icon, name,
    line, and three capabilities as a tree.
  - **LoopHalo** (`react/marketing/LoopHalo`, client): Attio's halo — a
    half circle exactly as wide as the page under a small line and a large
    title; the section ends at its equator, so the rim meets both page
    edges and the black runs straight on into the next section. The rim
    is lit by a conic band of teals at three blurs; scrolling sweeps the
    glow from the left edge over the crown to the right, completing the
    halo. `nodes` sit on the rim and light as the glow reaches them;
    `inner` sits inside the dome. Hairlines and drifting streaks behind.
  - **RuledColumns**: columns under a small label, each with a hairline on
    top — title, a line or two, optional link.
  - **LoopCompare**: open loop against closed loop — muted dashed steps
    ending at a wall, then teal steps with a drawn return path.
  - **ShowcaseCard `media`**: any node in place of the image — an
    illustration or a live figure — on a dark ink ground.
  - **Footer `art`**: a visual under the brand description; a compact
    bento (`ed-mk-bento--footer`) fits the brand column, fading on every
    side. A Hero with no `aside` sets one column of copy.
  - **Glow button** (`.ed-btn--glow` + `Spotlight`, client): teal label on
    white; on hover the button goes black with a light-teal label, and a
    light-teal edge light covers about half the border, centred on the
    cursor.
  - **LogoMarquee**: monochrome logos drifting left with faded edges;
    pauses on hover, still under reduced motion. A logo without `src`
    shows its name in plain type until the file arrives.
  - **`.ed-mk-serif`** and `--ed-mk-font-serif`: a serif italic phrase
    inside an Inter headline (Lora Variable, loaded by the app).
  - **`ed-btn--pill`** inside `.ed-mk`: a pill-shaped button, for marketing
    calls to action only. It replaces the
    utility bar as the first thing on the page; Partners, Careers and Client
    login move to the footer and the three doors.
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
