'use client';
import { useId, useRef, useState } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* Tabs inside a panel: a left-aligned row with an optional count on each,
   over panels that all stay in the page (hidden, not unmounted), so print
   and find-in-page see every one. Arrow keys move between tabs. */
export function SubTabs({ tabs = [], initial = 0, label = 'Sections', className = '' }) {
  const [active, setActive] = useState(initial);
  const id = useId();
  const refs = useRef([]);

  const onKey = (e) => {
    const n = tabs.length;
    const next = { ArrowRight: (active + 1) % n, ArrowLeft: (active - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={cx('ed-mk-subtabs', className)}>
      <div className="ed-mk-subtabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-p${i}`}
            tabIndex={i === active ? 0 : -1}
            className="ed-mk-subtabs__tab"
            onClick={() => setActive(i)}
          >
            {t.label}
            {t.count != null && <span className="ed-mk-subtabs__count">{t.count}</span>}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${id}-p${i}`}
          aria-labelledby={`${id}-t${i}`}
          hidden={i !== active}
          data-label={typeof t.label === 'string' ? t.label : undefined}
          className="ed-mk-subtabs__panel"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
