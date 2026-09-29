'use client';

import { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from '@edgistify/design-system/react/Modal';
import { Button } from '@edgistify/design-system/react/Button';
import { Field, Input, Select, Checkbox, Radio, InputGroup, InputAddon } from '@edgistify/design-system/react/Input';
import { Table } from '@edgistify/design-system/react/Table';

const SPLIT_ROWS = [
  ['SKU-4417-BLK-M', 'A-12-03', 4], ['SKU-9120-WHT-L', 'C-04-11', 102],
  ['SKU-2288-NVY-S', 'B-21-07', 1], ['SKU-0071-GRN-XL', 'A-03-19', 1240],
  ['SKU-5510-RED-M', 'D-08-02', 18], ['SKU-3390-BLU-L', 'B-14-06', 7],
  ['SKU-1102-BLK-S', 'A-22-11', 56], ['SKU-7741-WHT-M', 'C-19-04', 3],
];

/* The specimen's six dialogs, rendered by the real component rather than as
   markup — so Tab, Escape, the top layer and focus return are the browser's
   behaviour on this page too, not a description of it. */
export function ModalGallery() {
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);
  const is = (k) => open === k;

  return (
    <>
      <div className="stage">
        <div className="lbl">Sizes and variants</div>
        <div className="ed-btn-group">
          <Button variant="secondary" onClick={() => setOpen('sm')}>Small · confirm</Button>
          <Button variant="secondary" onClick={() => setOpen('md')}>Medium · form</Button>
          <Button variant="secondary" onClick={() => setOpen('lg')}>Large · scrolling table</Button>
          <Button variant="danger-quiet" onClick={() => setOpen('alert')}>Alert · destructive</Button>
          <Button variant="secondary" onClick={() => setOpen('drawer')}>Drawer · filters</Button>
          <Button variant="secondary" onClick={() => setOpen('sheet')}>Sheet</Button>
        </div>
      </div>

      <Modal open={is('sm')} onClose={close} size="sm"
             title="Close wave 4471?" subtitle="28 lines · 2 short">
        <ModalBody>
          <p className="filler">The two short lines will be raised as discrepancies for a supervisor to
          reconcile. This cannot be undone from the picker app.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={close}>Cancel</Button>
          <Button onClick={close}>Close wave</Button>
        </ModalFooter>
      </Modal>

      <Modal open={is('md')} onClose={close} ruled
             title="Create purchase order" subtitle="BLR-01 · Bommanahalli">
        <ModalBody>
          <Field label="SKU"><Input defaultValue="SKU-0071-GRN-XL" /></Field>
          <Field label="Quantity">
            <InputGroup>
              <Input type="number" defaultValue="500" />
              <InputAddon>units</InputAddon>
            </InputGroup>
          </Field>
          <Field label="Supplier">
            <Select><option>Vasanth &amp; Co</option><option>Deccan Supply</option></Select>
          </Field>
          <Checkbox label="Notify supplier by email" defaultChecked
                    hint="Sends on approval, not on save" />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={close}>Cancel</Button>
          <Button onClick={close}>Create PO</Button>
        </ModalFooter>
      </Modal>

      <Modal open={is('lg')} onClose={close} size="lg" ruled
             title="Split order" subtitle="ORD-880241 · Aarti Menon">
        <ModalBody style={{ gap: 0, paddingInline: 0 }}>
          <Table.Wrap>
            <Table density="compact">
              <Table.Head>
                <Table.Tr>
                  <Table.Th select><input type="checkbox" className="ed-checkbox" aria-label="Select all" /></Table.Th>
                  <Table.Th>SKU</Table.Th><Table.Th>Bin</Table.Th><Table.Th num>Qty</Table.Th>
                </Table.Tr>
              </Table.Head>
              <Table.Body>
                {SPLIT_ROWS.map(([sku, bin, qty]) => (
                  <Table.Tr key={sku}>
                    <Table.Td select><input type="checkbox" className="ed-checkbox" aria-label={`Select ${sku}`} /></Table.Td>
                    <Table.Td id>{sku}</Table.Td>
                    <Table.Td id>{bin}</Table.Td>
                    <Table.Td num>{qty.toLocaleString()}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Body>
            </Table>
          </Table.Wrap>
        </ModalBody>
        <ModalFooter spread>
          <span style={{ fontSize: 'var(--ed-text-xs)', color: 'var(--ed-text-muted)' }}>
            Scroll — the head stays
          </span>
          <span style={{ display: 'flex', gap: 'var(--ed-gap-inline)' }}>
            <Button variant="secondary" onClick={close}>Cancel</Button>
            <Button onClick={close}>Split into 2 shipments</Button>
          </span>
        </ModalFooter>
      </Modal>

      <Modal open={is('alert')} onClose={close} alert size="sm" title="Delete wave 4471?">
        <ModalBody>
          <p className="filler">28 picked lines will be returned to the unassigned queue and the pickers
          working this wave will be signed out of it. This cannot be undone.</p>
          <p className="filler" style={{ color: 'var(--ed-text-muted)', fontSize: 'var(--ed-text-xs)' }}>
            Backdrop clicks and Escape are ignored here — this decision needs a real answer.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={close}>Keep wave</Button>
          <Button variant="danger" onClick={close}>Delete wave</Button>
        </ModalFooter>
      </Modal>

      <Modal open={is('drawer')} onClose={close} variant="drawer" ruled
             title="Filters" subtitle="3 applied">
        <ModalBody>
          <Field label="Warehouse">
            <Select><option>All</option><option>BLR-01</option><option>HYD-01</option></Select>
          </Field>
          <Field label="From"><Input type="date" defaultValue="2026-09-01" /></Field>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="ed-field__label" style={{ padding: 0, marginBottom: 6 }}>Status</legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Checkbox label="Pending" defaultChecked />
              <Checkbox label="Picked" defaultChecked />
              <Checkbox label="Dispatched" />
            </div>
          </fieldset>
        </ModalBody>
        <ModalFooter spread>
          <Button variant="link" onClick={close}>Clear all</Button>
          <Button onClick={close}>Apply</Button>
        </ModalFooter>
      </Modal>

      <Modal open={is('sheet')} onClose={close} variant="sheet"
             title="Report short pick" subtitle="SKU-9120-WHT-L · 6 of 8">
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
               role="radiogroup" aria-label="Reason">
            <Radio name="sr" label="Stock not in bin" defaultChecked />
            <Radio name="sr" label="Damaged" />
            <Radio name="sr" label="Wrong batch" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={close}>Cancel</Button>
          <Button onClick={close}>Submit short pick</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
