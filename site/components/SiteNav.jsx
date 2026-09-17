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
      { href: '/foundations/colour', title: 'Colour', soon: true },
      { href: '/foundations/type', title: 'Type', soon: true },
      { href: '/foundations/space', title: 'Space', soon: true },
    ],
  },
  {
    label: 'Components',
    items: [
      { href: '/components/button', title: 'Button' },
      { href: '/components/card', title: 'Card', soon: true },
      { href: '/components/table', title: 'Table', soon: true },
      { href: '/components/input', title: 'Input', soon: true },
      { href: '/components/modal', title: 'Modal', soon: true },
      { href: '/components/menu', title: 'Menu & Select', soon: true },
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
