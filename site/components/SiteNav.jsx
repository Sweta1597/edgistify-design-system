'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* One place that knows what exists. `soon` marks a page not written yet —
   saying so beats a nav that quietly omits it. */
const GROUPS = [
  { label: 'Get started', items: [{ href: '/', title: 'Overview' }] },
  {
    label: 'Foundations',
    items: [
      { href: '/foundations/colour', title: 'Colour' },
      { href: '/foundations/type', title: 'Type' },
      { href: '/foundations/space', title: 'Space' },
    ],
  },
  {
    label: 'Components',
    items: [
      { href: '/components/button', title: 'Button' },
      { href: '/components/card', title: 'Card' },
      { href: '/components/table', title: 'Table' },
      { href: '/components/input', title: 'Input' },
      { href: '/components/modal', title: 'Modal' },
      { href: '/components/menu', title: 'Menu & Select' },
    ],
  },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Following a link should put the nav away again. Above 900px the panel is
  // always visible, so this flag simply stops mattering.
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className="sidebar" aria-label="Documentation" data-open={open ? 'true' : 'false'}>
      <div className="sidebar__bar">
        <Link href="/" className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Edgistify</span>
        </Link>
        <button type="button" className="nav-toggle"
                aria-expanded={open} aria-controls="site-nav-panel"
                onClick={() => setOpen((v) => !v)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div className="sidebar__panel" id="site-nav-panel">
        {GROUPS.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-group__label">{group.label}</div>
            {group.items.map((item) =>
              item.soon ? (
                <span key={item.href} className="nav-link" aria-disabled="true"
                      style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                  {item.title}<span className="nav-link__tag">soon</span>
                </span>
              ) : (
                <Link key={item.href} href={item.href} className="nav-link"
                      aria-current={pathname === item.href ? 'page' : undefined}>
                  {item.title}
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
