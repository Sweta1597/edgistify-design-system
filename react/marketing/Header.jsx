'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Container, Wordmark } from './index.jsx';

const cx = (...a) => a.filter(Boolean).join(' ');

const Caret = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * The marketing site header: wordmark, top-level nav with disclosure
 * mega-menus, the one CTA, and a full-screen drawer below 1024px.
 *
 * nav: [
 *   { label: 'Services', groups: [{ label?, cols?, items: [{ title, desc?, href, tag? }], all?: { label, href } }] },
 *   { label: 'About', href: '/about' },
 * ]
 *
 * Disclosure, not hover: a menu that opens on hover cannot be reached on a
 * touch laptop and closes when the pointer crosses the gap. Click opens,
 * Escape and outside-click close, and every item is a real link in the
 * HTML whether the menu is open or not — crawlers read all of it.
 */
export function SiteHeader({ nav = [], cta, secondary, brandHref = '/' }) {
  const [open, setOpen] = useState(null);      // index of the open menu
  const [drawer, setDrawer] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [drawer]);

  return (
    <header className="ed-mk-header" ref={rootRef}>
      <Container className="ed-mk-header__in">
        <Wordmark href={brandHref} />
        <nav className="ed-mk-header__nav" aria-label="Main">
          {nav.map((item, i) => item.groups ? (
            <div className="ed-mk-navitem" key={item.label}>
              <button type="button" className="ed-mk-navitem__trigger"
                      aria-expanded={open === i} aria-controls={`ed-mk-menu-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}>
                {item.label}<Caret />
              </button>
              <div id={`ed-mk-menu-${i}`} data-open={open === i}
                   className={cx('ed-mk-menu', item.groups.length > 1 && 'ed-mk-menu--cols')}
                   style={item.groups.length > 1 ? { '--cols': item.groups.length } : undefined}>
                {item.groups.map((g, gi) => (
                  <div className="ed-mk-menu__group" key={gi}>
                    {g.label && <p className="ed-mk-menu__label">{g.label}</p>}
                    {g.items.map((it, ii) => (
                      <a className={cx('ed-mk-menu__item', !it.desc && 'ed-mk-menu__item--plain')} href={it.href} key={ii}>
                        <b>{it.title}{it.tag && <span className="ed-badge ed-badge--brand ed-badge--sm">{it.tag}</span>}</b>
                        {it.desc && <span>{it.desc}</span>}
                      </a>
                    ))}
                    {g.all && <a className="ed-mk-more ed-mk-menu__all" href={g.all.href}>{g.all.label}</a>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <a className="ed-mk-navitem__trigger" href={item.href} key={item.label}>{item.label}</a>
          ))}
        </nav>
        <span className="ed-mk-header__spacer" />
        <div className="ed-mk-header__actions">
          {secondary && <span className="ed-mk-header__secondary">{secondary}</span>}
          {cta}
          <button type="button" className="ed-btn ed-btn--ghost ed-btn--icon ed-mk-burger"
                  aria-label="Open menu" aria-expanded={drawer} aria-controls="ed-mk-drawer"
                  onClick={() => setDrawer(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </Container>

      <div className="ed-mk-drawer" id="ed-mk-drawer" data-open={drawer} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="ed-mk-drawer__bar">
          <Wordmark href={brandHref} />
          <button type="button" className="ed-btn ed-btn--ghost ed-btn--icon" aria-label="Close menu" onClick={() => setDrawer(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {nav.map((item) => (
          <div className="ed-mk-drawer__group" key={item.label}>
            <h4>{item.label}</h4>
            {item.groups
              ? item.groups.flatMap((g) => g.items).map((it, ii) => <a href={it.href} key={ii}>{it.title}</a>)
              : <a href={item.href}>{item.label}</a>}
          </div>
        ))}
        <div className="ed-mk-drawer__cta">{cta}{secondary}</div>
      </div>
    </header>
  );
}
