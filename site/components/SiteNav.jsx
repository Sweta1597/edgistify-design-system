'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* One place that knows what exists. `soon` marks a page that has not been
   written yet — saying so is more useful than a nav that quietly omits it. */
const GROUPS = [
  {
    label: 'Get started',
    items: [{ href: '/', title: 'Overview' }],
  },
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
  return (
    <nav className="sidebar" aria-label="Documentation">
      <Link href="/" className="brand">
        <span className="brand__mark" aria-hidden="true" />
        <span className="brand__name">Edgistify</span>
      </Link>

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
    </nav>
  );
}
