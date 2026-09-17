/* The icon set the published specimens drew with. Kept as-is so the pages
   look the way they did — the design system ships no icon library, it
   specifies sizes and stroke weights for whichever one an app uses. */
const PATHS = {
  check:  <path d="M20 6 9 17l-5-5" />,
  plus:   <path d="M12 5v14M5 12h14" />,
  filter: <path d="M3 4h18l-7 8v6l-4 2v-8z" />,
  trash:  <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />,
  scan:   <path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3M7 12h10" />,
  more:   <><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></>,
  down:   <path d="M12 3v14M5 12l7 7 7-7" />,
};

export function Icon({ name, width = 2 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width}
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
