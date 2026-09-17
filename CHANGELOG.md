# Changelog

Notable changes to `@edgistify/design-system`. This file is the contract with
the apps that consume it: anything that changes how a shipped component looks
or behaves belongs here, so an upgrade is a decision rather than a surprise.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [semver](https://semver.org/).

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
