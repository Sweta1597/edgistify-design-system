'use client';
import { useEffect, useRef, useState } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* Pinned horizontal cards (Freshworks' "AI agents that act"). The stage —
   heading, the active card's copy on the left, the cards on the right —
   holds under the header while the page scrolls; the scroll moves the
   cards sideways from the first to the last, and the copy on the left
   follows the card in front. When the last card is in place the page
   scrolls on.
   On a narrow screen there is no pinning: the cards sit in a row you swipe,
   each with its own copy. */
export function ScrollCards({ head, items = [], per = 0.8, lead = 0, className }) {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const n = items.length;

  useEffect(() => {
    const el = ref.current;
    const track = trackRef.current;
    if (!el || !track) return undefined;
    const wide = window.matchMedia('(min-width: 901px)');
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      if (!wide.matches) { track.style.transform = ''; el.style.removeProperty('--ed-mk-hscroll-lead'); return; }
      const header = document.querySelector('.ed-mk-header');
      const top = header ? header.getBoundingClientRect().height : 0;
      el.style.setProperty('--ed-mk-hscroll-top', `${top}px`);
      // The stage is centred in its pinned box, so the space above the
      // heading (n) depends on the window. `lead` adds n × lead above the
      // whole thing, so the gap from the section before reads (1 + lead) n.
      if (lead) {
        const first = el.firstElementChild.firstElementChild;
        const n = first ? first.offsetTop : 0;
        el.style.setProperty('--ed-mk-hscroll-lead', `${Math.round(n * lead)}px`);
      }
      const rect = el.getBoundingClientRect();
      const sticky = el.firstElementChild.getBoundingClientRect().height;
      const span = rect.height - sticky;
      const p = span > 0 ? Math.min(1, Math.max(0, (top - rect.top) / span)) : 0;
      const kids = track.children;
      const step = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : 0;
      track.style.transform = `translate3d(${-p * (n - 1) * step}px, 0, 0)`;
      const i = Math.round(p * (n - 1));
      if (i !== last) { last = i; setActive(i); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    wide.addEventListener('change', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      wide.removeEventListener('change', onScroll);
    };
  }, [n, lead]);

  const copy = (it) => (<>
    {it.eyebrow && <p className="ed-mk-hscroll__eyebrow">{it.eyebrow}</p>}
    {it.title && <h3 className="ed-mk-hscroll__title">{it.title}</h3>}
    {it.body && <p className="ed-mk-hscroll__body">{it.body}</p>}
    {it.href && <a className="ed-mk-hscroll__link" href={it.href}>{it.linkLabel || 'Learn more'} <span aria-hidden="true">→</span></a>}
  </>);

  return (
    <div ref={ref} className={cx('ed-mk-hscroll', className)} style={{ '--n': n, '--per': per }}>
      <div className="ed-mk-hscroll__sticky">
        {head && <div className="ed-mk-hscroll__head">{head}</div>}
        <div className="ed-mk-hscroll__stage">
          <div className="ed-mk-hscroll__copy" aria-live="polite">
            {items.map((it, i) => (
              <div key={i} className="ed-mk-hscroll__text" data-active={i === active || undefined} aria-hidden={i !== active || undefined}>
                {copy(it)}
              </div>
            ))}
          </div>
          <div className="ed-mk-hscroll__viewport">
            <div className="ed-mk-hscroll__track" ref={trackRef}>
              {items.map((it, i) => (
                <div key={i} className="ed-mk-hscroll__item" data-active={i === active || undefined} data-past={i < active || undefined}>
                  {it.card}
                  <div className="ed-mk-hscroll__caption">{copy(it)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
