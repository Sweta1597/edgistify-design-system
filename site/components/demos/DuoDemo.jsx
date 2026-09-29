'use client';

import { useState } from 'react';
import { Icon } from '@edgistify/design-system/react/Icon';
import { Home, Package, ScanLine, CheckCircle } from '@edgistify/design-system/icons';

/* Body inherits the text colour; the accent takes the role token, which the
   surrounding surface redefines. Exactly the structure the brief specifies,
   now served by the library rather than a local table. Outline is the
   library's real outline — a filled ring — not a stroke. */
const DUO = { home: Home, package: Package, scan: ScanLine, check: CheckCircle };

export function Duo({ name, size = 24, outline = false }) {
  return <Icon icon={DUO[name]} filled={!outline} size={size} />;
}

const ROWS = ['home', 'package', 'scan', 'check'];

/* The decision on screen: same icons, same white body, same teal accent
   role — only the panel underneath changes. */
export function PanelCompare() {
  const [sel, setSel] = useState('package');
  const Panel = ({ variant, label, note }) => (
    <figure className={`duo-panel duo-panel--${variant}`}>
      <div className="duo-strip">
        {ROWS.map((n) => (
          <button key={n} type="button"
            className="duo-item" aria-current={sel === n ? 'page' : undefined}
            onClick={() => setSel(n)}>
            <Duo name={n} outline={sel !== n} />
          </button>
        ))}
      </div>
      <figcaption><strong>{label}</strong><br />{note}</figcaption>
    </figure>
  );
  return (
    <div className="duo-grid">
      <Panel variant="teal" label="teal-800 panel" note="brand teal accent 2.93:1 — fails. Accent must go pale." />
      <Panel variant="neutral" label="neutral-800 panel" note="brand teal accent 3.04:1 — passes at full strength." />
    </div>
  );
}

/* The accent has to survive the sizes the products actually use. */
export function DuoSizes() {
  return (
    <div className="duo-sizes">
      {[14, 16, 20, 24, 32, 48].map((s) => (
        <div key={s} className="duo-size">
          <div className="duo-size__light"><Duo name="home" size={s} /></div>
          <div className="duo-size__dark"><Duo name="home" size={s} /></div>
          <span>{s}px</span>
        </div>
      ))}
    </div>
  );
}
