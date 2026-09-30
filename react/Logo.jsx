import React from "react";

/**
 * Logo.
 *
 * Three shapes, one component. The artwork is inlined rather than loaded
 * from brand/*.svg because a logo in an <img> cannot inherit colour, and
 * the whole point of the currentColor build is that the mark takes the
 * colour of the thing it sits in — a dark nav, a light header, a teal
 * splash — without shipping a file per colour. The Drive originals did
 * ship a file per colour, three of them byte-identical apart from a fill.
 *
 *   <Logo />                     mark, 1em, currentColor
 *   <Logo variant="wordmark" />  the word "Edgistify"
 *   <Logo variant="square" />    mark centred in a square, for avatars
 *
 * Colour comes from CSS. There is no `color` prop: the brand teal is
 * --ed-teal-500, and a prop would invite hard-coded hexes to creep back.
 *
 *   <span style={{ color: "var(--ed-teal-500)" }}><Logo /></span>
 */

const ART = {
  mark:     { viewBox: "0 0 50.12 48.58", d: "M31.42,47.7V39.4H15.21c-2.23,0-3.78-.36-4.62-1.08s-1.28-2-1.28-3.88h0V27.81H24.12l.67-8.31H9.31V8.31H31.42V0H0V35.11q0,7,3.25,9.81T14.54,47.7H31.42Zm13.27.88c2.23,0,3.7-.36,4.39-1.08s1-2.19,1-4.42S49.76,39.4,49,38.73s-2.12-1.08-4.35-1.08-3.71.35-4.42,1-1.08,2.16-1.08,4.39.36,3.71,1.08,4.42S42.46,48.58,44.69,48.58Z", dy: 0 },
  square:   { viewBox: "0 0 50.12 50.12", d: "M31.42,47.7V39.4H15.21c-2.23,0-3.78-.36-4.62-1.08s-1.28-2-1.28-3.88h0V27.81H24.12l.67-8.31H9.31V8.31H31.42V0H0V35.11q0,7,3.25,9.81T14.54,47.7H31.42Zm13.27.88c2.23,0,3.7-.36,4.39-1.08s1-2.19,1-4.42S49.76,39.4,49,38.73s-2.12-1.08-4.35-1.08-3.71.35-4.42,1-1.08,2.16-1.08,4.39.36,3.71,1.08,4.42S42.46,48.58,44.69,48.58Z", dy: 0.77 },
  wordmark: { viewBox: "0 0 258.29 65.23", d: "M31.42,50.94V42.63H15.21c-2.23,0-3.78-.36-4.62-1.07s-1.28-2-1.28-3.89h0V31H24.12l.67-8.31H9.31V11.54H31.42V3.23H0V38.34q0,7,3.25,9.82t11.29,2.78H31.42Zm20,.65a11.54,11.54,0,0,0,9.45-4.35h0l.4,3.7h7.36V.69H60.49V18.78a11.41,11.41,0,0,0-9-3.89,12.51,12.51,0,0,0-7.44,2.25,14.26,14.26,0,0,0-4.84,6.35,24.75,24.75,0,0,0-1.68,9.45h0v.69a23.73,23.73,0,0,0,1.7,9.23,14.76,14.76,0,0,0,4.86,6.41A12,12,0,0,0,51.43,51.59Zm2.06-6.67a6.42,6.42,0,0,1-5.9-3.13,15.4,15.4,0,0,1-1.92-8.16h0v-.69a15.56,15.56,0,0,1,1.95-8.24,6.49,6.49,0,0,1,5.94-3.17,7.23,7.23,0,0,1,6.93,4.15h0v15A7.3,7.3,0,0,1,53.49,44.92Zm37.16,20a19.41,19.41,0,0,0,8.48-1.75A13,13,0,0,0,104.82,58a15.39,15.39,0,0,0,2-8.08h0V15.54h-7.4L99.13,19q-3.37-4.15-9.46-4.15a12.84,12.84,0,0,0-7.54,2.25,14.32,14.32,0,0,0-4.95,6.35,24,24,0,0,0-1.74,9.45h0v.69a23.37,23.37,0,0,0,1.75,9.23,15,15,0,0,0,5,6.41,12.36,12.36,0,0,0,7.46,2.32,11.59,11.59,0,0,0,9.09-3.86h0v2.36a8.23,8.23,0,0,1-2.25,6.2,8.64,8.64,0,0,1-6.25,2.17,11.25,11.25,0,0,1-4.81-1.06,12.45,12.45,0,0,1-4.16-3.22h0l-3.79,4.87a11.87,11.87,0,0,0,3.78,3.3A18.41,18.41,0,0,0,86,64.27,19.9,19.9,0,0,0,90.65,64.87Zm1-20a6.74,6.74,0,0,1-6-3.14,14.74,14.74,0,0,1-2-8.15h0v-.69a17.88,17.88,0,0,1,.88-5.82A8.87,8.87,0,0,1,87.19,23a6.92,6.92,0,0,1,4.54-1.5,7.4,7.4,0,0,1,7,3.95h0V40.89A7.41,7.41,0,0,1,91.67,44.92Zm27.81-34.29a4.63,4.63,0,0,0,3.37-1.21,4.14,4.14,0,0,0,1.24-3.07,4.24,4.24,0,0,0-1.24-3.13,5.26,5.26,0,0,0-6.74,0,4.21,4.21,0,0,0-1.25,3.13,4.11,4.11,0,0,0,1.25,3.09A4.68,4.68,0,0,0,119.48,10.63Zm4,40.31V15.54h-8.14v35.4Zm21.89.65A19.5,19.5,0,0,0,153,50.23,11.44,11.44,0,0,0,158,46.42a9.2,9.2,0,0,0,1.78-5.56,8.62,8.62,0,0,0-1.53-5.23,11.06,11.06,0,0,0-4.39-3.41A34.63,34.63,0,0,0,146.73,30a25.53,25.53,0,0,1-4.35-1.24,5.33,5.33,0,0,1-2.21-1.48,3.1,3.1,0,0,1-.64-2A3.87,3.87,0,0,1,141,22.18a6.54,6.54,0,0,1,4.28-1.24,7.13,7.13,0,0,1,3.34.72,4.95,4.95,0,0,1,2.78,4.51h8.14a10,10,0,0,0-1.73-5.77,11.6,11.6,0,0,0-5-4,18.06,18.06,0,0,0-7.57-1.47,16.88,16.88,0,0,0-7.21,1.45,11.48,11.48,0,0,0-4.81,3.93,9.37,9.37,0,0,0-1.69,5.38,8,8,0,0,0,3.31,6.74,23.64,23.64,0,0,0,9.39,3.76A22.58,22.58,0,0,1,149,37.52a5.3,5.3,0,0,1,2.24,1.64,3.7,3.7,0,0,1,.59,2.13,3.62,3.62,0,0,1-1.65,3.09,8,8,0,0,1-4.63,1.16,8.72,8.72,0,0,1-5-1.41,5.22,5.22,0,0,1-2.21-4.38h-7.88a10.28,10.28,0,0,0,1.76,5.72,12.8,12.8,0,0,0,5.17,4.42A17.86,17.86,0,0,0,145.42,51.59Zm32.52,0a16.82,16.82,0,0,0,5.3-.78h0V44.52a12.73,12.73,0,0,1-2.78.33,4.1,4.1,0,0,1-2.75-.8,3.93,3.93,0,0,1-.92-3h0V21.56H183v-6h-6.22V6.9h-8.14v8.64h-5.76v6h5.76v20q0,5.24,2.48,7.62A9.4,9.4,0,0,0,177.94,51.59Zm15.67-41A4.61,4.61,0,0,0,197,9.42a4.1,4.1,0,0,0,1.24-3.07A4.2,4.2,0,0,0,197,3.22a5.26,5.26,0,0,0-6.74,0A4.2,4.2,0,0,0,189,6.35a4.1,4.1,0,0,0,1.24,3.09A4.68,4.68,0,0,0,193.61,10.63Zm4,40.31V15.54h-8.14v35.4Zm19.47,0V21.56h7.16v-6h-7.16V12.2a5.48,5.48,0,0,1,1.47-4.09,5.7,5.7,0,0,1,4.16-1.44,13.47,13.47,0,0,1,3,.3h0L226,.59A18.78,18.78,0,0,0,221.48,0a14.71,14.71,0,0,0-6.67,1.41,9.74,9.74,0,0,0-4.32,4.15A13.69,13.69,0,0,0,209,12.2h0v3.34h-5.39v6H209V50.94Zm16.06,14.29c3.1,0,5.48-.87,7.15-2.63a18.15,18.15,0,0,0,3.85-6.3h0l14.1-40.76h-8.67l-7.14,23.75-7.36-23.75h-8.8l12.43,35.27-1.11,3a6.91,6.91,0,0,1-2.4,3.61,7.89,7.89,0,0,1-4.43,1h0l-1.51-.06v6.24A15.71,15.71,0,0,0,233.19,65.23Z", dy: 0 },
};

export function Logo({ variant = "mark", title, className = "", ...rest }) {
  const art = ART[variant] || ART.mark;

  /* A logo is either a picture that needs naming or decoration beside a
     name that already exists. Passing title gives it an accessible name;
     omitting it marks it aria-hidden. Silence is not the default — a
     nameless <svg role="img"> is announced as an unlabelled graphic. */
  const labelled = typeof title === "string" && title.length > 0;

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
        ? <g transform={`translate(0 ${art.dy})`}><path fill="currentColor" d={art.d} /></g>
        : <path fill="currentColor" d={art.d} />}
    </svg>
  );
}

export default Logo;
