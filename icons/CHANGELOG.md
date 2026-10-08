# Icon library changelog

What changed in `icons/`, per package version. The root `CHANGELOG.md` says
*that* the icons changed; this file says *which*, and how.

The rules: an icon's `version` (in `manifest.json`) bumps on its own when
its artwork changes — the build hashes every file. Its status flips from
`seed` to `drawn` the same way. Any artwork change ships in at least a
minor package version and gets a line here. Renaming or removing an icon,
or changing the silhouette of an `approved` one, is called out under
**Changed** or **Removed**, because the apps rely on the fill swap for
selection and on the names for imports.

Line format: `name v1 → v2 — what changed, why`.

## 0.12.0

### Added
- phone v1 — seed from Material Symbols Rounded `call`, for "Request a
  Callback" on the website; to be redrawn with the rest.

## 0.5.0 — 2026-09-28

The library exists. 100 icons, both fill states, two paths each.

### Drawn (12, at 24dp only)
Redrawn to `docs/icon-brief.md`: 40-unit grid, 80-unit stroke and counters,
filled silhouette with the counter punched for the outline, one accent on
the outer silhouette. Their Material 20 and 48 seeds were removed so one
drawing shows at every size; the 20 and 48 redraws are still to do.

- home v1 → v2 — chevron roof (accent) over a box; roof is 24% of the area
- package v1 → v2 — lid line, carton, tape down the seam (accent)
- box v1 → v2 — carton with its lid as the accent; judge against package at 14px
- truck v1 → v2 — cargo box, chassis, wheels; the cab is the accent
- store v1 → v2 — walls with a door notch, awning as the accent
- blocks v1 → v2 — four blocks, one is the accent; outline is three rings and one solid
- inventory v1 (new) — rack with two shelves; filled puts cartons in the bays; the carton on top is the accent. Replaces the shelf-bars drawing from the nav preview, whose accent was enclosed.
- book-open v1 → v3 — two covers with a bookmark ribbon (accent) between them
- bar-chart v1 → v2 — three bars, shortest is the accent; no counter, so fill = outline
- shopping-cart v1 → v2 — handle, basket, wheels; goods above the rim are the accent
- scan-line v1 → v2 — corner brackets, scan line as the accent; no counter, so fill = outline
- check-circle v1 → v2 — no accent, on purpose: a teal disc would be 90% of the drawing, and teal must never read as a status. Filled punches the tick; outline is a ring plus tick.

### Seed (88)
Material Symbols Rounded, Apache-2.0, at 20/24/48 in both fill states;
body path only, empty accent. See `THIRD_PARTY.md`. Mappings marked
uncertain in `manifest.json` notes: boxes, refresh, settings-2, pin-off,
shield-off, file-spreadsheet.

### Fill = outline
39 seeds and 2 drawn icons (bar-chart, scan-line) have no counter to punch,
so selection gets no fill change on them. The build prints the list; the
docs page shows it.
