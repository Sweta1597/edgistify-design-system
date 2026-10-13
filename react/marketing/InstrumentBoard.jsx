'use client';
import { useCallback, useId, useRef, useState } from 'react';
import { CarouselHost } from './Carousel';

const cx = (...a) => a.filter(Boolean).join(' ');

/* An instrument board: six tiles in a framed panel (left), each with a live
   figure, beside a readout (right) that describes the chosen one. Hovering a
   tile chooses it — and its figure answers the same pointer — as do a click,
   the arrow keys (across and down the grid) and the pager dots (a row
   under the readout). Every tile's readout is in the page, stacked in one
   place and sharing one set of rows, so each part (title, lede, strip,
   media) is as tall as the tallest of its kind and starts at the same
   height whichever is shown; the chosen one fades in. The title links to
   the item's href. Single light look on purpose.

   items: [{ id, label, figure, headline, lede, stats, media, href }]
     stats  [{ value, label }] — a strip of figures under the lede
     media  e.g. a Carousel; it runs only while its readout is shown, and
            once it has shown its last card the next tile is chosen (so
            the board tours every service); all of it holds while the
            pointer is on the board or the readout
   linkLabel: text, or (item) => text, for a link at the readout's foot
              as well as the title (none by default) */
export function InstrumentBoard({
  items = [], label = 'Services', readout = null, live = null,
  count = null, linkLabel = null,
  className = '',
}) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);   // the pointer is on the board or readout
  const tiles = useRef([]);
  const grid = useRef(null);
  const id = useId();

  const select = (i, focus) => {
    if (!items[i]) return;
    if (focus) tiles.current[i]?.focus({ preventScroll: true });
    setActive(i);
  };
  /* A readout's carousel has shown its last card: on to the next tile. */
  const next = useCallback(() => setActive((a) => (a + 1) % items.length), [items.length]);

  const onKey = (e) => {
    const cols = grid.current ? getComputedStyle(grid.current).gridTemplateColumns.split(' ').length : 3;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
    const to = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1
      : step === undefined ? null : Math.max(0, Math.min(items.length - 1, active + step));
    if (to === null) return;
    e.preventDefault();
    select(to, true);
  };

  return (
    <div className={cx('ed-mk-instr', className)} onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
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
              aria-controls={`${id}-panel-${i}`}
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

      <div className="ed-mk-instr__readout">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <article
              key={it.id || i}
              className={cx('ed-mk-instr__panel', on && 'is-on')}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              aria-hidden={!on}
              inert={!on}
            >
              {(readout || live) && <div className="ed-mk-instr__top"><span>{readout}</span>{live && <span className="ed-mk-instr__live">{live}</span>}</div>}
              <h3 className="ed-mk-instr__title">
                {it.href ? <a href={it.href}>{it.label}<span className="ed-mk-instr__go" aria-hidden="true">→</span></a> : it.label}
              </h3>
              {it.headline && <p className="ed-mk-instr__head">{it.headline}</p>}
              {it.lede && <p className="ed-mk-instr__lede">{it.lede}</p>}
              {it.stats?.length > 0 && (
                <ul className="ed-mk-instr__stats">
                  {it.stats.map((st, k) => (
                    <li key={k} className={cx('ed-mk-instr__stat', st.label && 'ed-mk-instr__stat--figure')}>
                      <b>{st.value}</b>{st.label && <span>{st.label}</span>}
                    </li>
                  ))}
                </ul>
              )}
              {it.media && <div className="ed-mk-instr__media"><CarouselHost.Provider value={{ active: on, held, onRound: next }}>{it.media}</CarouselHost.Provider></div>}
              {(count || (linkLabel && it.href)) && (
                <div className="ed-mk-instr__end">
                  {count && <span className="ed-mk-instr__count">{count(i + 1, items.length)}</span>}
                  {linkLabel && it.href && <a className="ed-mk-instr__link" href={it.href}>{typeof linkLabel === 'function' ? linkLabel(it) : linkLabel} <span aria-hidden="true">→</span></a>}
                </div>
              )}
            </article>
          );
        })}
      </div>
      <nav className="ed-mk-instr__pager" aria-label={`Choose a ${label.toLowerCase().replace(/s$/, '')}`}>
        {items.map((t, i) => (
          <button key={t.id || i} type="button" aria-label={t.label} aria-current={i === active} onClick={() => select(i)} />
        ))}
      </nav>
    </div>
  );
}
