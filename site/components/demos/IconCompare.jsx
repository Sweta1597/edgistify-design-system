'use client';

import { useState } from 'react';
import { Badge, BadgeGroup } from '@edgistify/design-system/react/Badge';
import data from './iconData.json';

/* Real artwork, fetched from both libraries rather than redrawn:
   lucide-static@1.48.0 (ISC) and google/material-design-icons (Apache 2.0).
   Nothing here is traced from Strava — only the two properties that define
   its icon language, fill and optical sizing, are being compared. */

const BY_LABEL = Object.fromEntries(data.pairs.map((p) => [p.label, p]));

/** lucide: stroked, one 24-grid drawing at every size. */
export function Lucide({ name, size = 'sm', stroke }) {
  const p = BY_LABEL[name];
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke ?? 2} strokeLinecap="round" strokeLinejoin="round"
      className={`ed-icon-${size}`} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: p.lucide }}
    />
  );
}

/** Material Symbols: filled, and drawn again for each optical size. */
export function Symbol({ name, size = 'sm', opsz = 24 }) {
  const p = BY_LABEL[name];
  const art = p.ms[String(opsz)];
  return (
    <svg
      viewBox={art.viewBox} fill="currentColor"
      className={`ed-icon-${size}`} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: art.body }}
    />
  );
}

/* ---- 1. the sets, at the sizes the products actually use ---------- */

export function IconGrid() {
  const SIZES = [['xs', '14px — table cells, 212 uses'], ['sm', '16px — buttons, 56 uses'], ['md', '24px — nav']];
  const [size, setSize] = useState('xs');

  return (
    <div>
      <div className="ed-btn-group" style={{ marginBottom: 'var(--ed-space-5)' }}>
        {SIZES.map(([k, label]) => (
          <button key={k} type="button"
            className={`ed-btn ed-btn--sm ${size === k ? 'ed-btn--primary' : 'ed-btn--secondary'}`}
            onClick={() => setSize(k)}>{label}</button>
        ))}
      </div>

      <div className="cmp-grid">
        <div className="cmp-col">
          <div className="vn">lucide · stroked</div>
          <div className="cmp-icons">
            {data.pairs.map((p) => (
              <span key={p.label} className="cmp-cell" title={p.lucideName}>
                <Lucide name={p.label} size={size} />
              </span>
            ))}
          </div>
        </div>
        <div className="cmp-col">
          <div className="vn">Material Symbols · filled</div>
          <div className="cmp-icons">
            {data.pairs.map((p) => (
              <span key={p.label} className="cmp-cell" title={p.msName}>
                <Symbol name={p.label} size={size} opsz={size === 'md' ? 24 : 20} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- 2. optical sizing, the part lucide cannot do ----------------- */

/* Measured, not asserted: all twelve icons differ between the drawing
   authored for 20px and the one authored for 48px. It is NOT a
   simplification — counted across the set, the 20px drawings carry
   585 path nodes against the 48px drawings' 531. The axis adjusts
   weight and the size of counters so the shape holds at its intended
   size; it does not throw detail away. */
export function OpticalProof() {
  const PICKS = ['Scan', 'Picking', 'Exception', 'Remove'];
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Drawn for 20px</th>
            <th>Drawn for 48px</th>
            <th>Both at 14px</th>
            <th>lucide at 14px</th>
          </tr>
        </thead>
        <tbody>
          {PICKS.map((name) => (
            <tr key={name}>
              <td className="t">{name}</td>
              <td><span className="opt opt--big"><Symbol name={name} size="xl" opsz={20} /></span></td>
              <td><span className="opt opt--big"><Symbol name={name} size="xl" opsz={48} /></span></td>
              <td>
                <span className="opt">
                  <Symbol name={name} size="xs" opsz={20} />
                  <Symbol name={name} size="xs" opsz={48} />
                </span>
              </td>
              <td><span className="opt"><Lucide name={name} size="xs" /></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---- 3. in context: the real components -------------------------- */

export function InContext() {
  const [set, setSet] = useState('both');
  const show = (which) => set === 'both' || set === which;

  const Row = ({ Icon, opsz, label }) => (
    <div className="cmp-col">
      <div className="vn">{label}</div>

      <div className="ctx-block">
        <div className="ed-btn-group">
          <button type="button" className="ed-btn ed-btn--primary ed-btn--sm">
            <Icon name="Scan" size="xs" opsz={opsz} />Start pick
          </button>
          <button type="button" className="ed-btn ed-btn--secondary ed-btn--sm">
            <Icon name="Filter" size="xs" opsz={opsz} />Filter
          </button>
          <button type="button" className="ed-btn ed-btn--secondary ed-btn--icon ed-btn--sm"
                  aria-label="Remove">
            <Icon name="Remove" size="xs" opsz={opsz} />
          </button>
        </div>
      </div>

      <div className="ctx-block">
        <BadgeGroup>
          <Badge tone="success" icon={<Icon name="Delivered" size="xs" opsz={opsz} />}>Delivered</Badge>
          <Badge tone="danger" icon={<Icon name="Exception" size="xs" opsz={opsz} />}>Exception</Badge>
          <Badge tone="info" icon={<Icon name="Shipment" size="xs" opsz={opsz} />}>In transit</Badge>
        </BadgeGroup>
      </div>

      <div className="ctx-block">
        <table className="ctx-table">
          <tbody>
            {[['ORD-0098871', 'Mumbai DC', 'Inventory'],
              ['ORD-0098872', 'Bengaluru DC', 'Shipment'],
              ['ORD-0098873', 'Gurugram DC', 'Picking']].map(([id, hub, ic]) => (
              <tr key={id}>
                <td className="mono">{id}</td>
                <td>
                  <span className="cellrow">
                    <Icon name="Location" size="xs" opsz={opsz} />{hub}
                  </span>
                </td>
                <td>
                  <span className="cellrow">
                    <Icon name={ic} size="xs" opsz={opsz} />{ic}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="ed-btn-group" style={{ marginBottom: 'var(--ed-space-5)' }}>
        {[['both', 'Side by side'], ['lucide', 'lucide only'], ['ms', 'Material only']].map(([k, l]) => (
          <button key={k} type="button"
            className={`ed-btn ed-btn--sm ${set === k ? 'ed-btn--primary' : 'ed-btn--secondary'}`}
            onClick={() => setSet(k)}>{l}</button>
        ))}
      </div>
      <div className={set === 'both' ? 'cmp-grid' : ''}>
        {show('lucide') && <Row Icon={Lucide} label="lucide · stroked" />}
        {show('ms') && <Row Icon={Symbol} opsz={20} label="Material Symbols · filled" />}
      </div>
    </div>
  );
}
