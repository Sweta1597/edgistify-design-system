import React from "react";

/**
 * Logo.
 *
 * The artwork is inlined rather than loaded from brand/*.svg because a
 * logo in an <img> cannot inherit colour, and the whole point of the
 * currentColor build is that the mark takes the colour of the thing it
 * sits in — a dark nav, a light header, a teal splash — without shipping
 * a file per colour. The Drive originals did ship a file per colour,
 * three of them byte-identical apart from a fill.
 *
 *   <Logo />                     mark, 1em, currentColor
 *   <Logo variant="square" />    mark centred in a square, for avatars
 *   <Logo variant="wordmark" />  the word "Edgistify"
 *
 * Colour comes from CSS. There is no `color` prop: the brand teal is
 * --ed-teal-500, and a prop would invite hard-coded hexes to creep back.
 *
 *   <span style={{ color: "var(--ed-teal-500)" }}><Logo /></span>
 *
 * THE WORDMARK IS A RASTER, AND THAT IS NOT A CHOICE.
 * The current wordmark reached us as a 2800x698 PNG (Oct 2024). The SVG
 * we had before it is a DIFFERENT, EARLIER drawing (Oct 2020) — measured
 * letter by letter, its `d` is 26% narrower relative to its height, and
 * every other letter differs too. It is not a re-export, so it could not
 * be kept as "the vector version of the same thing"; it is in
 * brand/source/wordmark-2020-superseded.svg and is not shipped.
 *
 * Consequences, until someone supplies the 2024 wordmark as vector:
 *   - the wordmark does NOT follow currentColor. Pass `tone` to pick a
 *     file: "teal" (default), "black" or "white".
 *   - it is served from brand/wordmark/ as an <img>, so a consumer must
 *     be able to serve that directory.
 * The mark is unaffected — it is still vector and still currentColor.
 */

/* Vector, currentColor. The monogram only — the wordmark is a raster. */
const ART = {
  mark:   { viewBox: "0 0 50.12 48.58", dy: 0 },
  square: { viewBox: "0 0 50.12 50.12", dy: 0.77 },
};

const MARK_D = "M31.42,47.7V39.4H15.21c-2.23,0-3.78-.36-4.62-1.08s-1.28-2-1.28-3.88h0V27.81H24.12l.67-8.31H9.31V8.31H31.42V0H0V35.11q0,7,3.25,9.81T14.54,47.7H31.42Zm13.27.88c2.23,0,3.7-.36,4.39-1.08s1-2.19,1-4.42S49.76,39.4,49,38.73s-2.12-1.08-4.35-1.08-3.71.35-4.42,1-1.08,2.16-1.08,4.39.36,3.71,1.08,4.42S42.46,48.58,44.69,48.58Z";

/* The wordmark's intrinsic size, from the master PNG. Passing width and
   height means the browser reserves the right box before the image loads,
   so a header does not jump. */
const WORDMARK = { w: 2800, h: 698 };
const TONES = ["teal", "black", "white"];

/**
 * Where the wordmark PNGs are served from. Defaults to /brand/wordmark,
 * which is where they land if you copy the package's brand/ directory into
 * a public root. Override once at the app edge rather than per call site.
 */
export let wordmarkBase = "/brand/wordmark";
export function setWordmarkBase(path) {
  wordmarkBase = String(path).replace(/\/$/, "");
}

export function Logo({
  variant = "mark", tone = "teal", title, className = "", ...rest
}) {
  const labelled = typeof title === "string" && title.length > 0;

  if (variant === "wordmark") {
    /* An <img>, not an <svg>, because the current wordmark only exists as
       a raster. It therefore ignores `color` — hence `tone`. The moment a
       vector arrives this branch goes away and tone becomes a no-op. */
    const t = TONES.includes(tone) ? tone : "teal";
    return (
      <img
        src={`${wordmarkBase}/edgistify-wordmark-${t}.png`}
        /* The browser picks by density. @1x is 700px wide, which covers a
           logo up to ~700 CSS px on a 1x screen; the srcset lets a 2x or
           3x screen reach for more without every visitor paying for 2800px. */
        srcSet={[
          `${wordmarkBase}/edgistify-wordmark-${t}@1x.png 700w`,
          `${wordmarkBase}/edgistify-wordmark-${t}@2x.png 1400w`,
          `${wordmarkBase}/edgistify-wordmark-${t}.png 2800w`,
        ].join(", ")}
        sizes="(max-width: 600px) 200px, 300px"
        width={WORDMARK.w}
        height={WORDMARK.h}
        /* An <img> with alt="" is skipped by a screen reader, which is what
           we want beside a visible "Edgistify". With a title it is named. */
        alt={labelled ? title : ""}
        className={["ed-logo", "ed-logo--word", className].filter(Boolean).join(" ")}
        {...rest}
      />
    );
  }

  const art = ART[variant] || ART.mark;

  /* A logo is either a picture that needs naming or decoration beside a
     name that already exists. Passing title gives it an accessible name;
     omitting it marks it aria-hidden. Silence is not the default — a
     nameless <svg role="img"> is announced as an unlabelled graphic. */
  /* aria-label rather than aria-labelledby pointing at the <title>. That
     pairing needs a unique id, the only source of one is useId, and a hook
     would make this a client component — which it must not be, because the
     marketing header and footer that use it are server-rendered. The
     <title> is still there for the native tooltip and for AT that reads it. */
  return (
    <svg
      viewBox={art.viewBox}
      className={["ed-logo", className].filter(Boolean).join(" ")}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : "true"}
      focusable="false"
      {...rest}
    >
      {labelled && <title>{title}</title>}
      {art.dy
        ? <g transform={`translate(0 ${art.dy})`}><path fill="currentColor" d={MARK_D} /></g>
        : <path fill="currentColor" d={MARK_D} />}
    </svg>
  );
}

export default Logo;
