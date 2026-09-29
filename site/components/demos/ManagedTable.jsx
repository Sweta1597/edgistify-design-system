'use client';

import { useColumns } from '@edgistify/design-system/react/useColumns';
import { Table, THead, TBody, Tr, Th, Td, TableWrap } from '@edgistify/design-system/react/Table';
import { Badge } from '@edgistify/design-system/react/Badge';

const COLS = [
  { id: 'order', label: 'Order', pinned: true },
  { id: 'status', label: 'Status' },
  { id: 'hub', label: 'Hub' },
  { id: 'sku', label: 'SKU' },
  { id: 'qty', label: 'Qty', num: true },
  { id: 'weight', label: 'Weight', num: true },
  { id: 'carrier', label: 'Carrier' },
  { id: 'eta', label: 'ETA' },
];

const ROWS = [
  { order: 'ORD-0098871', status: ['warning', 'Pending'], hub: 'Mumbai DC', sku: 'SKU-4471-B', qty: 14, weight: '212.4 kg', carrier: 'Delhivery', eta: '28 Sep' },
  { order: 'ORD-0098872', status: ['success', 'Dispatched'], hub: 'Bengaluru DC', sku: 'SKU-1180-A', qty: 3, weight: '41.0 kg', carrier: 'Bluedart', eta: '27 Sep' },
  { order: 'ORD-0098873', status: ['danger', 'Returned'], hub: 'Gurugram DC', sku: 'SKU-9902-C', qty: 1, weight: '6.2 kg', carrier: 'Ekart', eta: '—' },
  { order: 'ORD-0098874', status: ['info', 'Picked'], hub: 'Hosur DC', sku: 'SKU-3310-A', qty: 22, weight: '88.5 kg', carrier: 'Delhivery', eta: '29 Sep' },
];


export function ManagedTable() {
  const c = useColumns(COLS);

  return (
    <div>
      <p id="ed-col-help" className="sr-only">
        Press the left or right arrow key to move this column. Press Escape to stop.
      </p>

      <TableWrap>
        <Table managed density="dense">
          <THead ref={c.headRef}>
            <Tr>
              {/* One spread per header. Th renders the pin and the grip; it
                  never learns where their state lives. */}
              {c.columns.map((col) => (
                <Th key={col.id} num={col.num} {...c.thProps(col.id)}>{col.label}</Th>
              ))}
            </Tr>
          </THead>
          <TBody>
            {ROWS.map((r) => (
              <Tr key={r.order}>
                {c.columns.map((col) => (
                  <Td key={col.id} num={col.num} id={col.id === 'order' || col.id === 'sku'}
                      {...c.cellProps(col.id)}>
                    {col.id === 'status'
                      ? <Badge tone={r.status[0]} size="sm">{r.status[1]}</Badge>
                      : r[col.id]}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableWrap>

      <div className="ed-btn-group" style={{ marginTop: 'var(--ed-space-4)' }}>
        <button type="button" className="ed-btn ed-btn--secondary ed-btn--sm" onClick={c.reset}>
          Reset columns
        </button>
        <span className="sub" style={{ alignSelf: 'center' }}>
          Pinned: {c.pinned.length ? c.pinned.join(', ') : 'none'}
        </span>
      </div>
    </div>
  );
}
