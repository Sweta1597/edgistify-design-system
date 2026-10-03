'use client';

import React, { useEffect, useRef, useState } from 'react';

const HOVER_CLOSE_MS = 160;
import { Container, Wordmark } from './index.jsx';

const cx = (...a) => a.filter(Boolean).join(' ');

const Caret = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);


/* The lead: a waving hand, a sentence and an arrowhead that grows its tail
   on hover. Lives in the footer strip of the panel. */
const Lead = ({ lead }) => (
  <a className="ed-mk-menu__lead" href={lead.href}>
    <svg className="ed-mk-menu__lead-hand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
    <span>{lead.label}</span>
    <svg className="ed-mk-menu__lead-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path className="ed-mk-menu__lead-tail" d="M5 12h14" pathLength="1" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  </a>
);

/**
 * The marketing site header: wordmark, top-level nav with disclosure
 * mega-menus, the one CTA, and a full-screen drawer below 1024px.
 *
 * nav: [
 *   { label: 'Services',
 *     groups: [{ label?, items: [{ title, href, icon?, desc?, tag? }], note?, all?: { label, href } }],
 *     aside?:  { label?, links?: { label?, items: [{ title, desc?, href }] },
 *                card?: { title, body?, href, image?, cta? }, list?: { label?, items: [{ title, href }] } },
 *     lead?:   { label, href }   — the footer strip's link: a waving hand, a sentence, an arrow
 *     footer?: { cta?: { label, href }, links?: [{ title, desc?, href }] } },
 *   { label: 'About', href: '/about' },
 * ]
 *
 * The panel is full width: three quarters sub-menu (one column per group,
 * icon + name per item), one quarter related content, and a footer strip.
 *
 * Disclosure, not hover: a menu that opens on hover cannot be reached on a
 * touch laptop and closes when the pointer crosses the gap. Click opens,
 * Escape and outside-click close, and every item is a real link in the
 * HTML whether the menu is open or not — crawlers read all of it.
 */
/* `tone`: light (default) | ink. Ink re-maps the colour roles for the header
   bar, the panels and the drawer; the wordmark stays teal — the brand does
   not change colour with the surface.

   Menus open on hover with a mouse and on click with anything else; the
   click always works, so a touch laptop is never locked out. */
export function SiteHeader({ nav = [], cta, secondary, brandHref = '/', tone = 'light' }) {
  const [open, setOpen] = useState(null);      // index of the open menu
  const [drawer, setDrawer] = useState(false);
  const rootRef = useRef(null);
  const closeTimer = useRef(null);

  const hoverOpen = (i) => (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const hoverClose = (i) => (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen((cur) => (cur === i ? null : cur)), HOVER_CLOSE_MS);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

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
    <header className={cx('ed-mk-header', tone === 'ink' && 'ed-mk-header--ink ed-mk-band')} ref={rootRef}>
      <Container className="ed-mk-header__in">
        <Wordmark href={brandHref} />
        <nav className="ed-mk-header__nav" aria-label="Main">
          {nav.map((item, i) => item.groups ? (
            <div className="ed-mk-navitem" key={item.label}
                 onPointerEnter={hoverOpen(i)} onPointerLeave={hoverClose(i)}>
              <button type="button" className="ed-mk-navitem__trigger"
                      aria-expanded={open === i} aria-controls={`ed-mk-menu-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}>
                {item.label}<Caret />
              </button>
              <div id={`ed-mk-menu-${i}`} data-open={open === i}
                   className={cx('ed-mk-menu', item.aside && 'ed-mk-menu--aside')}>
                <Container className="ed-mk-menu__in">
                  <div>
                  <div className="ed-mk-menu__main" style={{ '--cols': item.groups.length }}>
                    {item.groups.map((g, gi) => (
                      <div className="ed-mk-menu__group" key={gi}>
                        {g.label && <p className="ed-mk-menu__label">{g.label}</p>}
                        {g.items.map((it, ii) => (
                          <a className="ed-mk-menu__item" href={it.href} key={ii}>
                            {it.icon && <span className="ed-mk-menu__icon" aria-hidden="true">{it.icon}</span>}
                            <span className="ed-mk-menu__text">
                              <b>{it.title}{it.tag && <span className="ed-badge ed-badge--brand ed-badge--sm">{it.tag}</span>}</b>
                              {it.desc && <span>{it.desc}</span>}
                            </span>
                          </a>
                        ))}
                        {g.note && <p className="ed-mk-menu__note">{g.note}</p>}
                        {g.all && <a className="ed-mk-more ed-mk-menu__all" href={g.all.href}>{g.all.label}</a>}
                      </div>
                    ))}
                  </div>
                  </div>
                  {item.aside && (
                    <aside className="ed-mk-menu__aside">
                      {item.aside.label && <p className="ed-mk-menu__label">{item.aside.label}</p>}
                      {item.aside.links && (
                        <div className="ed-mk-menu__links">
                          {item.aside.links.label && <p className="ed-mk-menu__label">{item.aside.links.label}</p>}
                          {item.aside.links.items.map((l, li) => (
                            <a className="ed-mk-menu__link" href={l.href} key={li}>
                              <b>{l.title}</b>
                              {l.desc && <span>{l.desc}</span>}
                            </a>
                          ))}
                        </div>
                      )}
                      {item.aside.card && (
                        <a className="ed-mk-menu__card" href={item.aside.card.href}>
                          {item.aside.card.image
                            ? <img src={item.aside.card.image} alt="" loading="lazy" />
                            : <span className="ed-mk-menu__card-art" aria-hidden="true" />}
                          <span className="ed-mk-menu__card-body">
                            <b>{item.aside.card.title}</b>
                            {item.aside.card.body && <span>{item.aside.card.body}</span>}
                            {item.aside.card.cta && (
                              <span className="ed-mk-menu__card-cta">{item.aside.card.cta}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                              </span>
                            )}
                          </span>
                        </a>
                      )}
                      {item.aside.list && (
                        <div className="ed-mk-menu__latest">
                          {item.aside.list.label && <p className="ed-mk-menu__label" style={{ marginBottom: 'var(--ed-space-3)' }}>{item.aside.list.label}</p>}
                          <ul className="ed-mk-menu__list">
                            {item.aside.list.items.map((l, li) => <li key={li}><a href={l.href} title={l.title}><span>{l.title}</span></a></li>)}
                          </ul>
                        </div>
                      )}
                    </aside>
                  )}
                </Container>
                {(item.footer || item.lead) && (
                  <div className="ed-mk-menu__foot">
                    <Container className="ed-mk-menu__foot-in" style={{ '--links': (item.footer?.links || []).length }}>
                      {item.lead && <Lead lead={item.lead} />}
                      {item.footer?.cta && <a className="ed-mk-more" href={item.footer.cta.href}>{item.footer.cta.label}</a>}
                      {(item.footer?.links || []).map((l, li) => (
                        <a className="ed-mk-menu__footlink" href={l.href} key={li}><b>{l.title}</b>{l.desc && <span>{l.desc}</span>}</a>
                      ))}
                    </Container>
                  </div>
                )}
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
            {item.lead && <a href={item.lead.href} className="ed-mk-more">{item.lead.label}</a>}
            {item.footer?.cta && <a href={item.footer.cta.href} className="ed-mk-more">{item.footer.cta.label}</a>}
          </div>
        ))}
        <div className="ed-mk-drawer__cta">{cta}{secondary}</div>
      </div>
    </header>
  );
}
