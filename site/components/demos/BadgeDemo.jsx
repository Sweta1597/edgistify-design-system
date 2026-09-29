'use client';

import { useState } from 'react';
import { Badge, BadgeGroup } from '@edgistify/design-system/react/Badge';

/* The four maps the dashboard actually ships today, side by side with what
   each row becomes. Read from the source, not retyped: see
   ordersMockData.js, IntegrationsPage.jsx, KitToStockPage.jsx and
   OrdersListPendingB2BPage.jsx. */
export const MIGRATION = [
  ['Pending',    'bg-amber-50 text-amber-700 border-amber-200',       'warning',  false],
  ['In Process', 'bg-blue-50 text-blue-700 border-blue-200',          'info',     false],
  ['Dispatched', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'success',  false],
  ['Delivered',  'bg-emerald-100 text-emerald-800 border-emerald-300','success',  true],
  ['Return',     'bg-rose-50 text-rose-700 border-rose-200',          'danger',   false],
  ['Cancelled',  'bg-slate-100 text-slate-600 border-slate-200',      'neutral',  false],
  ['Picked',     'bg-indigo-50 text-indigo-700 border-indigo-200',    'info',     false],
  ['Packed',     'bg-violet-50 text-violet-700 border-violet-200',    'info',     true],
  ['Assembly',   'bg-violet-50 text-violet-700 border-violet-200',    'info',     true],
];

export function MigrationTable() {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr><th>Label</th><th>Class string today</th><th>Becomes</th><th>Renders</th></tr>
        </thead>
        <tbody>
          {MIGRATION.map(([label, tw, tone, strong]) => (
            <tr key={label}>
              <td className="t">{label}</td>
              <td className="p"><code className="mono">{tw}</code></td>
              <td className="p">
                <code className="mono">
                  {`<Badge tone="${tone}"${strong ? ' strong' : ''}>`}
                </code>
              </td>
              <td><Badge tone={tone} strong={strong}>{label}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Live: the tag case. Nothing in the products does this yet — it is the
   reason Badge takes onRemove rather than a separate Tag component. */
export function FilterTags() {
  const [filters, setFilters] = useState(['Pending', 'Mumbai DC', 'B2B', 'Last 7 days']);
  const drop = (f) => setFilters((all) => all.filter((x) => x !== f));

  return (
    <div>
      <BadgeGroup>
        {filters.map((f) => (
          <Badge key={f} tone="neutral" onRemove={() => drop(f)}>{f}</Badge>
        ))}
        {filters.length === 0 && (
          <span style={{ fontSize: 'var(--ed-text-md)', color: 'var(--ed-text-muted)' }}>
            No filters applied.
          </span>
        )}
      </BadgeGroup>
      {filters.length < 4 && (
        <p style={{ marginTop: 'var(--ed-space-3)' }}>
          <button type="button" className="ed-btn ed-btn--ghost ed-btn--sm"
                  onClick={() => setFilters(['Pending', 'Mumbai DC', 'B2B', 'Last 7 days'])}>
            Reset
          </button>
        </p>
      )}
    </div>
  );
}

import { Example } from '@/components/Example';

/* Example takes function props (the live scope), so it can only be called
   from a client component — same as every other page on this site. */
export function BadgeExample() {
  return (
    <Example
      scope={{ Badge, BadgeGroup }}
      code={`<BadgeGroup>
  <Badge tone="success" dot>Live</Badge>
  <Badge tone="danger" dot>Sync error</Badge>
  <Badge tone="neutral" dot>Paused</Badge>
  <Badge tone="info" count>12</Badge>
  <Badge tone="warning" outline>Low stock</Badge>
  <Badge tone="neutral" size="sm">SKU-4471</Badge>
</BadgeGroup>`}
    />
  );
}
