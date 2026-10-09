'use client';
import { useEffect, useRef } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* Light streaks drifting down the hairline background: [left %, delay s, duration s]. */
const STREAKS = [[8, 0, 9], [21, 3.5, 11], [37, 1.2, 8], [58, 5, 12], [71, 2.2, 9.5], [86, 6.4, 10.5], [94, 0.8, 13]];

/* "The only 3PL with / Closed-loop Fulfilment" — Attio's Universal Context
   halo. A dark planet as wide as the page rises under the heading; its
   rim meets both edges of the page where the section ends, and its body
   is the page's own black, so the next section carries straight on.
   `nodes` sit on the rim and light as the glow reaches them; `inner` sits
   inside the dome.
   As the section scrolls in (--p 0 → 1) the heading comes out of a blur;
   as the dome's crown rises from the bottom of the window to its top fifth
   (--q 0 → 1) the glow sweeps along the rim, from the left horizon over
   the top to the right, completing the halo. Under reduced motion it is simply there.
   `head` replaces the eyebrow and title with a heading of your own (e.g. an
   .ed-mk-h2, the size of the other sections' heads). With className
   "ed-mk-halo--map" the dome grows under the arc to hold a DotMap in `inner`. */
export function LoopHalo({ eyebrow, title, head, nodes = [], inner, children, className, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const planet = el.querySelector('.ed-mk-halo__planet');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '1'); el.style.setProperty('--q', '1'); return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (h - top) / (h * 0.8)));
      el.style.setProperty('--p', p.toFixed(4));
      // The rim sweeps while the dome is on screen: from its crown entering
      // at the bottom of the window to the crown reaching the top fifth.
      const crown = planet ? planet.getBoundingClientRect().top : top;
      const q = Math.min(1, Math.max(0, (h - crown) / (h * 0.8)));
      el.style.setProperty('--q', q.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <section ref={ref} className={cx('ed-mk-halo', className)} {...rest}>
      <div className="ed-mk-halo__lines" aria-hidden="true">
        {STREAKS.map(([x, d, t], i) => <i key={i} style={{ left: `${x}%`, animationDelay: `${d}s`, animationDuration: `${t}s` }} />)}
      </div>
      <div className="ed-mk-halo__copy">
        {head ?? <>
          {eyebrow && <p className="ed-mk-halo__eyebrow">{eyebrow}</p>}
          {title && <h2 className="ed-mk-halo__title">{title}</h2>}
        </>}
        {children}
      </div>
      <div className="ed-mk-halo__dome">
        <div className="ed-mk-halo__planet" aria-hidden="true">
          <span className="ed-mk-halo__aura" />
          <span className="ed-mk-halo__rim ed-mk-halo__rim--wide" />
          <span className="ed-mk-halo__rim ed-mk-halo__rim--near" />
          <span className="ed-mk-halo__rim" />
          <span className="ed-mk-halo__disc" />
        </div>
        {nodes.length > 0 && (
          <ol className="ed-mk-halo__nodes" aria-label="The loop">
            {nodes.map((n, i) => {
              // Spread evenly over the crown, left to right, in sweep order.
              const a = nodes.length === 1 ? 0 : -56 + (112 / (nodes.length - 1)) * i;
              return <li key={i} className="ed-mk-halo__node" style={{ '--a': a.toFixed(1) }}><span>{n}</span></li>;
            })}
          </ol>
        )}
        {inner && <div className="ed-mk-halo__inner">{inner}</div>}
      </div>
    </section>
  );
}
