'use client';
import { useEffect, useId, useRef, useState } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* An instrument board: six tiles in a framed panel (left), each with a live
   figure, beside a readout (right) that describes the chosen one. Hovering a
   tile chooses it — and its figure answers the same pointer — as do a click,
   the arrow keys (across and down the grid) and the pager dots. The readout
   fades out, swaps and fades back in. Single light look on purpose.

   items: [{ id, label, figure, headline, lede, href, media }] */
export function InstrumentBoard({
  items = [], label = 'Services', readout = 'Readout', live = 'Live',
  count = (i, n) => `Instrument ${i} / ${n}`, linkLabel = (it) => `Explore ${it.label}`,
  className = '',
}) {
  const [active, setActive] = useState(0);   // the tile lit now
  const [shown, setShown] = useState(0);     // what the readout says (lags by the fade)
  const [swapping, setSwapping] = useState(false);
  const timer = useRef(0);
  const tiles = useRef([]);
  const grid = useRef(null);
  const id = useId();

  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (i, focus) => {
    if (!items[i]) return;
    if (focus) tiles.current[i]?.focus({ preventScroll: true });
    if (i === active) return;
    setActive(i);
    clearTimeout(timer.current);
    const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) { setShown(i); return; }
    setSwapping(true);
    timer.current = setTimeout(() => { setShown(i); setSwapping(false); }, 200);
  };

  const onKey = (e) => {
    const cols = grid.current ? getComputedStyle(grid.current).gridTemplateColumns.split(' ').length : 3;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
    const to = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1
      : step === undefined ? null : Math.max(0, Math.min(items.length - 1, active + step));
    if (to === null) return;
    e.preventDefault();
    select(to, true);
  };

  const it = items[shown] || {};

  return (
    <div className={cx('ed-mk-instr', className)}>
      <div className="ed-mk-instr__board">
        <span className="ed-mk-instr__screw ed-mk-instr__screw--tl" aria-hidden="true" />
        <span className="ed-mk-instr__screw ed-mk-instr__screw--tr" aria-hidden="true" />
        <span className="ed-mk-instr__screw ed-mk-instr__screw--bl" aria-hidden="true" />
        <span className="ed-mk-instr__screw ed-mk-instr__screw--br" aria-hidden="true" />
        <div className="ed-mk-instr__tiles" role="tablist" aria-label={label} ref={grid} onKeyDown={onKey}>
          {items.map((t, i) => (
            <div
              key={t.id || i}
              ref={(el) => { tiles.current[i] = el; }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-readout`}
              tabIndex={i === active ? 0 : -1}
              className="ed-mk-instr__tile"
              onPointerEnter={() => select(i)}
              onClick={() => select(i)}
            >
              <div className="ed-mk-instr__fig">{t.figure}</div>
              <div className="ed-mk-instr__foot">
                <span className="ed-mk-instr__label">{t.label}</span>
                <span className="ed-mk-instr__dot" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <article
        className={cx('ed-mk-instr__readout', swapping && 'is-swapping')}
        role="tabpanel"
        id={`${id}-readout`}
        aria-labelledby={`${id}-tab-${active}`}
      >
        <div className="ed-mk-instr__top"><span>{readout}</span>{live && <span className="ed-mk-instr__live">{live}</span>}</div>
        <h3 className="ed-mk-instr__title ed-mk-instr__swap">{it.label}</h3>
        {it.headline && <p className="ed-mk-instr__head ed-mk-instr__swap">{it.headline}</p>}
        {it.lede && <p className="ed-mk-instr__lede ed-mk-instr__swap">{it.lede}</p>}
        {it.media && <div className="ed-mk-instr__media ed-mk-instr__swap">{it.media}</div>}
        <div className="ed-mk-instr__end">
          <span className="ed-mk-instr__count">{count(shown + 1, items.length)}</span>
          {it.href && <a className="ed-mk-instr__link" href={it.href}>{linkLabel(it)} <span aria-hidden="true">→</span></a>}
        </div>
        <nav className="ed-mk-instr__pager" aria-label={`Choose a ${label.toLowerCase().replace(/s$/, '')}`}>
          {items.map((t, i) => (
            <button key={t.id || i} type="button" aria-label={t.label} aria-current={i === active} onClick={() => select(i)} />
          ))}
        </nav>
      </article>
    </div>
  );
}
