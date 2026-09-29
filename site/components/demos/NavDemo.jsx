'use client';

import { useState } from 'react';
import { Icon } from '@edgistify/design-system/react/Icon';
import {
  Home, ShoppingCart, Truck, Store, Package, Blocks, Inventory, BookOpen, BarChart,
} from '@edgistify/design-system/icons';

/* The nine nav items, from the icon library. Every one is a filled path in
   both states: the outline is a ring with the counter punched, not a
   stroke — the brief forbids a stroke attribute anywhere, and the earlier
   preview's strokeWidth trick is exactly what a designer must not copy.

   The selected item swaps to the FILLED drawing, and only then does the
   teal appear — so the accent means "you are here" rather than being
   decoration every row carries. Both states draw the SAME two paths, so
   the silhouette never changes: the roof, the awning, the lid are all
   still there when outlined. Only the treatment differs. */
const NAV_ICON = {
  Dashboard: Home,
  B2C: ShoppingCart,
  'B2C Outward': Truck,
  B2B: Store,
  Purchase: Package,
  Kitting: Blocks,
  Inventory,
  'Master Edit': BookOpen,
  Reports: BarChart,
};

function NavIcon({ name, current }) {
  return <Icon icon={NAV_ICON[name]} filled={current} size="lg" className="ed-nav__icon" />;
}

function Caret() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="ed-nav__caret"
         aria-hidden="true"><path d="M9 5.5v13l8.5-6.5z" /></svg>
  );
}

/* The real shape of the dashboard's nav: groups, parents with children,
   and no counts. */
const TREE = [
  { group: 'Overview', items: [{ label: 'Dashboard' }] },
  {
    group: 'Orders',
    items: [
      { label: 'B2C', children: ['Open orders', 'Returns'] },
      { label: 'B2C Outward', children: ['Manifests', 'Handovers'] },
      { label: 'B2B' },
      { label: 'Purchase' },
      { label: 'Kitting' },
    ],
  },
  {
    group: 'Catalogue',
    items: [{ label: 'Inventory' }, { label: 'Master Edit' }, { label: 'Reports' }],
  },
];

export function NavDemo({ collapsed = false, light = false, soft = false, minHeight = 560 }) {
  const [current, setCurrent] = useState('Manifests');
  const [open, setOpen] = useState({ 'B2C Outward': true });

  const isOn = (l) => current === l;
  const holdsCurrent = (it) => it.children?.includes(current);

  return (
    <nav
      className={`ed-nav${collapsed ? ' ed-nav--collapsed' : ''}${light ? ' ed-nav--light' : ''}${soft ? ' ed-nav--soft' : ''}`}
      aria-label="Demo"
      style={{ borderRadius: 10, minHeight }}
    >
      {TREE.map((g) => (
        <div key={g.group}>
          <div className="ed-nav__group">
            {g.group}
            {soft && (
              /* Scenery, not a control: this is where a popup trigger will
                 go. aria-hidden so a screen reader is not told about a
                 button that does not exist yet. */
              <svg viewBox="0 0 24 24" fill="currentColor" className="ed-nav__group-caret"
                   aria-hidden="true"><path d="M9 5.5v13l8.5-6.5z" /></svg>
            )}
          </div>
          {g.items.map((it) => {
            const expanded = !!open[it.label];
            return (
              <div key={it.label}>
                <button
                  type="button"
                  className="ed-nav__item"
                  /* A parent that merely CONTAINS the current page is not
                     itself current — aria-current marks one thing. */
                  aria-current={isOn(it.label) ? 'page' : undefined}
                  /* Visual state only — the parent is not the current page. */
                  data-within={holdsCurrent(it) ? 'true' : undefined}
                  aria-expanded={it.children ? expanded : undefined}
                  /* Accordion: opening one parent closes any other. The map
                     is replaced rather than merged, so only the clicked key
                     can survive. Clicking the open one closes it. */
                  onClick={() => (it.children
                    ? setOpen((o) => (o[it.label] ? {} : { [it.label]: true }))
                    : setCurrent(it.label))}
                >
                  <NavIcon name={it.label} current={isOn(it.label) || holdsCurrent(it)} />
                  <span className="ed-nav__label">{it.label}</span>
                  {it.children && <Caret />}
                </button>

                {it.children && expanded && (
                  <div className="ed-nav__sub">
                    {it.children.map((c) => (
                      <button key={c} type="button" className="ed-nav__item"
                              aria-current={isOn(c) ? 'page' : undefined}
                              onClick={() => setCurrent(c)}>
                        <span className="ed-nav__label">{c}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/* The before: today's sidebar colours, same items, so the two columns
   differ only in the thing under discussion. */
export function NavToday({ minHeight = 560 }) {
  const [current, setCurrent] = useState('Manifests');
  const [open, setOpen] = useState({ 'B2C Outward': true });

  return (
    <nav className="ed-nav nav-today" aria-label="Today" style={{ borderRadius: 10, minHeight }}>
      {TREE.map((g) => (
        <div key={g.group}>
          <div className="ed-nav__group">{g.group}</div>
          {g.items.map((it) => (
            <div key={it.label}>
              <button type="button" className="ed-nav__item"
                      aria-current={current === it.label ? 'page' : undefined}
                      aria-expanded={it.children ? !!open[it.label] : undefined}
                      onClick={() => (it.children
                        ? setOpen((o) => (o[it.label] ? {} : { [it.label]: true }))
                        : setCurrent(it.label))}>
                <NavIcon name={it.label} current={false} />
                <span className="ed-nav__label">{it.label}</span>
                {it.children && <Caret />}
              </button>
              {it.children && open[it.label] && (
                <div className="ed-nav__sub">
                  {it.children.map((c) => (
                    <button key={c} type="button" className="ed-nav__item"
                            aria-current={current === c ? 'page' : undefined}
                            onClick={() => setCurrent(c)}>
                      <span className="ed-nav__label">{c}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
