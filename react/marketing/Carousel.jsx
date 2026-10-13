'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* Whether the carousel's container is showing it. A parent that keeps
   several carousels mounted but shows one (InstrumentBoard's readout)
   provides false for the others: they don't move, and their cards' media
   isn't mounted until they have been shown once. */
export const CarouselActive = createContext(true);

const DUR = 500;   // ms, one slide — matches the CSS transition

/* A carousel of cards (media on top, a title, a few lines), the current one
   in the middle with its neighbours peeking either side. It moves on by
   itself every `interval` ms and wraps round without a jump back (two
   copies at each end); the arrow buttons move it by hand. It holds still
   while the pointer or focus is on it, while it is off screen or not shown,
   and under reduced motion (the arrows still work).

   items: [{ title, body, media }] */
export function Carousel({ items = [], interval = 1000, label = 'Cards', className = '', ...rest }) {
  const on = useContext(CarouselActive);
  const n = items.length;
  const loop = n > 1;
  const C = loop ? Math.min(2, n) : 0;
  const list = loop ? [...items.slice(-C), ...items, ...items.slice(0, C)] : items;

  const [i, setI] = useState(C);           // index into list
  const [anim, setAnim] = useState(true);
  const [held, setHeld] = useState(false);
  const [seen, setSeen] = useState(on);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef(null);

  useEffect(() => { if (on) setSeen(true); }, [on]);
  useEffect(() => { setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((d) => { setAnim(true); setI((x) => Math.max(0, Math.min(list.length - 1, x + d))); }, [list.length]);

  useEffect(() => {
    if (!loop || !on || held || still || !visible) return undefined;
    const t = setInterval(() => go(1), interval);
    return () => clearInterval(t);
  }, [loop, on, held, still, visible, interval, go]);

  /* Once a slide into the copies has finished, jump to the same card in
     the middle set without animating; then animate again. */
  useEffect(() => {
    if (!loop || (i >= C && i < C + n)) return undefined;
    const t = setTimeout(() => { setAnim(false); setI((x) => (x >= C + n ? x - n : x + n)); }, still ? 0 : DUR + 20);
    return () => clearTimeout(t);
  }, [i, loop, C, n, still]);
  useEffect(() => {
    if (anim) return undefined;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setAnim(true)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [anim]);

  const current = n ? (((i - C) % n) + n) % n : 0;
  const hold = () => setHeld(true);
  const release = (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); };

  return (
    <div
      ref={root}
      className={cx('ed-mk-carousel', className)}
      role="region" aria-roledescription="carousel" aria-label={label}
      onPointerEnter={hold} onPointerLeave={() => setHeld(false)} onFocus={hold} onBlur={release}
      {...rest}
    >
      <div className="ed-mk-carousel__view">
        <ul
          className={cx('ed-mk-carousel__track', !anim && 'is-jumping')}
          style={{ '--i': i }}
        >
          {list.map((it, k) => {
            const real = loop ? (((k - C) % n) + n) % n : k;
            const here = k === i;
            return (
              <li
                key={k}
                className={cx('ed-mk-carousel__card', here && 'is-current')}
                aria-hidden={!here}
                inert={!here}
                aria-roledescription="slide"
                aria-label={`${real + 1} of ${n}`}
              >
                <div className="ed-mk-carousel__media">{seen ? it.media : null}</div>
                <div className="ed-mk-carousel__text">
                  <h4>{it.title}</h4>
                  {it.body && <p>{it.body}</p>}
                </div>
              </li>
            );
          })}
        </ul>
        {loop && (
          <>
            <button type="button" className="ed-mk-carousel__btn ed-mk-carousel__btn--prev" aria-label="Previous card" onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6" /></svg>
            </button>
            <button type="button" className="ed-mk-carousel__btn ed-mk-carousel__btn--next" aria-label="Next card" onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6" /></svg>
            </button>
          </>
        )}
      </div>
      <span className="ed-mk-carousel__sr" aria-live="polite">{held ? `${items[current]?.title ?? ''}` : ''}</span>
    </div>
  );
}
