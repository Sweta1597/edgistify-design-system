'use client';

import { Tooltip } from '@edgistify/design-system/react/Tooltip';
import { Icon } from '@/components/demos/ArtifactIcon';

/* A row of icon-only buttons — the case that produced 34 aria-labels and
   17 native title attributes across the two apps. Every button keeps its
   aria-label: the tooltip DESCRIBES, it does not name. */
export function ToolbarDemo() {
  const BTNS = [
    ['filter', 'Filter rows', 'Narrow this list by status, hub or date'],
    ['down',   'Export CSV',  'Downloads the rows currently visible, not the whole table'],
    ['scan',   'Scan barcode', 'Opens the scanner overlay'],
    ['more',   'More actions', 'Bulk edit, reassign, cancel'],
    ['trash',  'Delete wave',  'Removes the wave. Picks already started are kept.'],
  ];
  return (
    <div style={{ display: 'flex', gap: 'var(--ed-gap-inline)', flexWrap: 'wrap', alignItems: 'center' }}>
      {BTNS.map(([icon, name, desc]) => (
        <Tooltip key={name} label={desc}>
          <button type="button" className="ed-btn ed-btn--secondary ed-btn--icon" aria-label={name}>
            <Icon name={icon} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

/* The other real case: a cell that had to be truncated. The tooltip
   restores the full value, in the mono face, because it is still an ID. */
export function TruncatedCellDemo() {
  const ROWS = [
    ['ORD-2024-0098871-MUM', 'Pending', 'Nagpur → Mumbai DC · 14 cartons · 212.4 kg'],
    ['ORD-2024-0098872-BLR', 'Dispatched', 'Hosur → Bengaluru DC · 3 cartons · 41.0 kg'],
    ['ORD-2024-0098873-DEL', 'Returned', 'Gurugram DC → seller · 1 carton · 6.2 kg'],
  ];
  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th>Order</th><th>Status</th><th>Route</th></tr></thead>
        <tbody>
          {ROWS.map(([id, status, route]) => (
            <tr key={id}>
              <td className="t">
                <Tooltip label={id} mono>
                  <span tabIndex={0} style={{
                    fontFamily: 'var(--ed-font-id)', color: 'var(--ed-text-id)',
                    display: 'inline-block', maxWidth: '11ch',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    verticalAlign: 'bottom', cursor: 'help',
                  }}>{id}</span>
                </Tooltip>
              </td>
              <td>{status}</td>
              <td className="p">{route}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Side-by-side with the thing it replaces, so the difference is felt
   rather than described. */
export function VersusNative() {
  return (
    <div style={{ display: 'flex', gap: 'var(--ed-gap-section)', flexWrap: 'wrap' }}>
      <div>
        <div className="vn" style={{ marginBottom: 'var(--ed-space-2)' }}>native title</div>
        <button type="button" className="ed-btn ed-btn--secondary ed-btn--icon"
                aria-label="Reprint shipping label" title="Reprint shipping label">
          <Icon name="more" />
        </button>
        <p className="sub" style={{ maxWidth: '22ch' }}>~1s delay, OS-styled, gone on touch.</p>
      </div>
      <div>
        <div className="vn" style={{ marginBottom: 'var(--ed-space-2)' }}>Tooltip</div>
        <Tooltip label="Reprint shipping label">
          <button type="button" className="ed-btn ed-btn--secondary ed-btn--icon"
                  aria-label="Reprint shipping label">
            <Icon name="more" />
          </button>
        </Tooltip>
        <p className="sub" style={{ maxWidth: '22ch' }}>Tokenised, placed, dismissible, hoverable.</p>
      </div>
    </div>
  );
}

import { Example } from '@/components/Example';

export function TooltipExample() {
  return (
    <Example
      scope={{ Tooltip, Icon }}
      code={`<div style={{ display: 'flex', gap: '8px' }}>
  <Tooltip label="Downloads the rows currently visible, not the whole table">
    <button className="ed-btn ed-btn--secondary">
      <Icon name="down" />Export
    </button>
  </Tooltip>

  <Tooltip label="ORD-2024-0098871-MUM" mono side="bottom">
    <button className="ed-btn ed-btn--ghost">Order id</button>
  </Tooltip>
</div>`}
    />
  );
}

/* Tooltip uses hooks, so like Modal and Menu it may only be rendered from a
   client component. The package deliberately ships no "use client" directive
   — the consumer owns the boundary. */
export function WarehouseDemo() {
  return (
    <Tooltip label="Bay 14 · Aisle C · Level 3">
      <button type="button" className="ed-btn ed-btn--brand ed-btn--lg">
        <Icon name="scan" />Start pick
      </button>
    </Tooltip>
  );
}
