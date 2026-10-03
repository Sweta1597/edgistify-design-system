'use client';

/* Tracks the pointer over its child and writes the position as --mx/--my
   (percent of the child's box), for edge lights that follow the cursor —
   e.g. a Button with className "ed-btn--glow". Renders no box of its own. */
export function Spotlight({ children }) {
  const move = (e) => {
    const el = e.currentTarget.firstElementChild;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return <span className="ed-mk-spotlight" onPointerMove={move} onPointerEnter={move}>{children}</span>;
}
