'use client';
import { useId, useRef, useState } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* A row of tabs over a three-part stage: copy on the left, a product
   screen in the middle, one figure on the right (Freshworks' platform
   tabs). Switching tabs replays the entrances: copy from the left, screen
   from below, figure from the right. Arrow keys move between tabs. */
export function ShowcaseTabs({ tabs = [], initial = 0, label = 'Sections', className }) {
  const [active, setActive] = useState(initial);
  const id = useId();
  const refs = useRef([]);
  const t = tabs[active] || {};

  const onKey = (e) => {
    const n = tabs.length;
    let next = null;
    if (e.key === 'ArrowRight') next = (active + 1) % n;
    if (e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next] && refs.current[next].focus();
  };

  return (
    <div className={cx('ed-mk-stabs', className)}>
      <div className="ed-mk-stabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="ed-mk-stabs__tab"
            onClick={() => setActive(i)}
          >
            {tab.icon ? <span className="ed-mk-stabs__icon" aria-hidden="true">{tab.icon}</span> : null}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="ed-mk-stabs__stage" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} key={active}>
        <div className="ed-mk-stabs__copy">
          {t.title && <h3 className="ed-mk-stabs__title">{t.title}</h3>}
          {t.body && <p className="ed-mk-stabs__body">{t.body}</p>}
          {t.href && <a className="ed-mk-stabs__link" href={t.href}>{t.linkLabel || 'Learn more'} <span aria-hidden="true">→</span></a>}
        </div>
        <div className="ed-mk-stabs__media">{t.media}</div>
        <div className="ed-mk-stabs__stat">
          {t.stat && (<>
            <span className="ed-mk-stabs__num">{t.stat.value}</span>
            {t.stat.caption && <span className="ed-mk-stabs__cap">{t.stat.caption}</span>}
          </>)}
        </div>
      </div>
    </div>
  );
}
