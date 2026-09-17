# Design system site

The public documentation for `@edgistify/design-system`. It lives in the same
repo as the code on purpose: a component and its page change in the same
commit, reviewed together. A separate docs repo is how drift starts.

```bash
npm install
npm run dev      # http://localhost:5190
```

## Examples cannot drift

Every example is a single string that `react-live` both **renders** and
**displays**. There is no second copy of the markup to fall out of step, and
the component rendered is the one imported from the package — not a replica of
it.

This exists because of a specific failure. The old Button specimen carried a
hand-copied snapshot of `button.css`, and went on documenting a ghost button
that failed contrast at 4.24:1 for months after the real one was fixed. Docs
that import the component can't do that.

The site installs the design system with `install-links=true` (see `.npmrc`),
so `node_modules/@edgistify/design-system` is a real copy of what `npm pack`
would ship. Two useful consequences: the package lives at the repo root, which
is an *ancestor* of this folder, and a bundler cannot resolve a package
symlinked to its own parent — and the `exports` map and `files` list get
exercised here before any app sees them. If an export is missing, these docs
break first.

After changing the design system, re-run `npm install` here to pick it up.

## Adding a component page

1. `app/components/<name>/page.mdx`
2. A client wrapper in `components/demos/<Name>Demo.jsx` that imports the real
   component and supplies it as the live scope — a server-rendered MDX page
   can't hand component functions to a client component.
3. Register the wrapper in `mdx-components.jsx`.
4. Add it to `GROUPS` in `components/SiteNav.jsx`.

## Deploying

Vercel, with **Root Directory set to `site`** in the project settings. Nothing
else needs configuring — it builds from `main` and gives a preview URL per pull
request, so a docs change is reviewed like code.

The site currently sends `X-Robots-Tag: noindex, nofollow` (see
`next.config.mjs`). Anyone with the link can read it with no login, exactly as
intended — it just won't appear in search results. Remove that header the day
you want it found.

## What this is not, yet

No search, no versioned docs, no auth. Sign-in is additive and comes later:
the public tier is complete on its own, so nothing here has to be rebuilt to
add a signed-in view on top.
