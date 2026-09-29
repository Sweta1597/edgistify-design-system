'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@edgistify/design-system/react/Icon';

const SIZES = [
  ['xs', 'table cells, dense meta', '14 / 16'],
  ['sm', 'the UI default — buttons, inputs', '16 / 18'],
  ['md', 'buttons at lg, section headers', '20 / 22'],
  ['lg', 'nav and page headers', '24 / 26'],
  ['xl', 'empty states', '32 / 34'],
];

/* The whole foundation in one measurement: the same two icons, one sized
   by a prop and one by a class, measured live in both modes. */
export function ScalingProof() {
  const [mode, setMode] = useState('desk');
  const [m, setM] = useState(null);
  const propRef = useRef(null);
  const classRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute('data-mode');
    if (mode === 'warehouse') root.setAttribute('data-mode', 'warehouse');
    else root.removeAttribute('data-mode');
    const t = setTimeout(() => {
      const p = propRef.current?.querySelector('svg');
      const c = classRef.current?.querySelector('svg');
      if (p && c) {
        setM({
          prop: Math.round(p.getBoundingClientRect().width),
          cls: Math.round(c.getBoundingClientRect().width),
          target: getComputedStyle(root).getPropertyValue('--ed-target-min').trim(),
          text: getComputedStyle(root).getPropertyValue('--ed-text-sm').trim(),
        });
      }
    }, 60);
    return () => { clearTimeout(t); if (prev) root.setAttribute('data-mode', prev); else root.removeAttribute('data-mode'); };
  }, [mode]);

  return (
    <div>
      <div className="ed-btn-group" style={{ marginBottom: 'var(--ed-space-5)' }}>
        {[['desk', 'Desk'], ['warehouse', 'Warehouse']].map(([k, l]) => (
          <button key={k} type="button"
            className={`ed-btn ed-btn--sm ${mode === k ? 'ed-btn--primary' : 'ed-btn--secondary'}`}
            onClick={() => setMode(k)}>{l}</button>
        ))}
      </div>

      <div className="cmp-grid">
        <div className="cmp-col">
          <div className="vn">size={'{14}'} — a prop</div>
          <div className="proof" ref={propRef}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3M7 12h10" />
            </svg>
          </div>
          <p className="sub">Rendered <strong>{m ? `${m.prop}px` : '—'}</strong></p>
        </div>

        <div className="cmp-col">
          <div className="vn">.ed-icon-xs — a class</div>
          <div className="proof" ref={classRef}>
            {/* The SAME markup as the left, wrapped. Only the sizing
                method differs, which is the whole comparison. */}
            <Icon size="xs">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3M7 12h10" />
              </svg>
            </Icon>
          </div>
          <p className="sub">Rendered <strong>{m ? `${m.cls}px` : '—'}</strong></p>
        </div>
      </div>

      {m && (
        <div className="note">
          <span className="k">{mode === 'warehouse' ? 'WAREHOUSE' : 'DESK'}</span>
          <p>Minimum target <strong>{m.target}</strong>, body text <strong>{m.text}</strong>.
          The prop stays at <strong>{m.prop}px</strong>; the class is at <strong>{m.cls}px</strong>.
          {mode === 'warehouse'
            ? ' On a handheld everything around the icon has grown and the propped icon has not — this is what 280 call sites are doing in the picker app right now.'
            : ' On the desk they agree, which is exactly why nobody notices until the handheld.'}</p>
        </div>
      )}
    </div>
  );
}

export function SizeRamp() {
  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th>Step</th><th>Desk / Warehouse</th><th>Stroke</th><th>Use</th><th></th></tr></thead>
        <tbody>
          {SIZES.map(([k, use, px]) => (
            <tr key={k}>
              <td className="t"><code className="mono">.ed-icon-{k}</code></td>
              <td className="p">{px}</td>
              <td className="p"><code className="mono">--ed-icon-stroke-{k}</code></td>
              <td className="p">{use}</td>
              <td><Icon size={k}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zM3.3 7 12 12l8.7-5M12 22V12" />
                  </svg>
                </Icon></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
