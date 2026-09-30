'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Logo } from '@edgistify/design-system/react/Logo';

const SIZES = [
  ['sm', 20, 'Dense headers, table cells'],
  ['md', 28, 'App header — the default'],
  ['lg', 40, 'Auth screens, empty states'],
  ['xl', 64, 'Splash, marketing hero'],
];

export function LogoSizes() {
  return (
    <div className="vgrid">
      {SIZES.map(([k, px, use]) => (
        <div className="vcell" key={k}>
          <div className="vd" style={{ color: 'var(--ed-teal-500)' }}>
            <Logo className={`ed-logo--${k}`} />
          </div>
          <div className="vn"><code className="mono">.ed-logo--{k}</code> · {px}px</div>
          <div className="vn" style={{ opacity: 0.7 }}>{use}</div>
        </div>
      ))}
      <div className="vcell">
        <div className="vd" style={{ color: 'var(--ed-text)' }}>
          <Logo variant="wordmark" className="ed-logo--lg" />
        </div>
        <div className="vn">wordmark · 40px</div>
        <div className="vn" style={{ opacity: 0.7 }}>Height-driven, like text</div>
      </div>
      <div className="vcell">
        <div className="vd" style={{ color: 'var(--ed-teal-500)' }}>
          <Logo variant="square" className="ed-logo--lg" />
        </div>
        <div className="vn">square · 40px</div>
        <div className="vn" style={{ opacity: 0.7 }}>Centred on the short axis</div>
      </div>
    </div>
  );
}

const GROUNDS = [
  ['Teal on white', { background: 'var(--ed-white)', color: 'var(--ed-teal-500)' }],
  ['Ink on white', { background: 'var(--ed-white)', color: 'var(--ed-neutral-950)' }],
  ['White on teal', { background: 'var(--ed-teal-600)', color: 'var(--ed-white)' }],
  ['White on ink', { background: 'var(--ed-neutral-950)', color: 'var(--ed-white)' }],
  ['Teal on ink', { background: 'var(--ed-neutral-950)', color: 'var(--ed-teal-400)' }],
];

export function LogoOnGrounds() {
  return (
    <div className="vgrid">
      {GROUNDS.map(([label, style]) => (
        <div className="vcell" key={label}>
          <div className="vd" style={{ ...style, borderRadius: 8, padding: '18px 10px' }}>
            <Logo className="ed-logo--lg" />
          </div>
          <div className="vn">{label}</div>
        </div>
      ))}
      <div className="vcell">
        {/* The plate. A stand-in photograph, because the rule only bites on
            something busy — a flat swatch would prove nothing. */}
        <div className="vd" style={{
          borderRadius: 8, padding: '18px 10px',
          backgroundImage:
            'repeating-linear-gradient(45deg, #7a6a55 0 14px, #3f4a3a 14px 28px, #9aa07f 28px 42px)',
        }}>
          <span className="ed-logo-plate ed-logo-lockup--lg"><Logo /></span>
        </div>
        <div className="vn"><code className="mono">.ed-logo-plate</code></div>
      </div>
    </div>
  );
}

/* The floors, drawn at and below the stated minimum so the claim can be
   checked by looking rather than taken on trust. */
export function MinSizes() {
  const STEPS = [10, 12, 16, 20, 24];
  return (
    <div className="vgrid">
      <div className="vcell" style={{ gridColumn: 'span 2' }}>
        <div className="vd" style={{ color: 'var(--ed-teal-500)', display: 'flex', gap: 18, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {STEPS.map((h) => (
            <span key={h} style={{ textAlign: 'center' }}>
              <Logo style={{ height: h }} />
              <span className="vn" style={{ display: 'block', marginTop: 6 }}>{h}px</span>
            </span>
          ))}
        </div>
        <div className="vn">Mark · floor <strong>16px</strong>. Below it the E and its dot start to merge.</div>
      </div>
      <div className="vcell" style={{ gridColumn: 'span 2' }}>
        <div className="vd" style={{ color: 'var(--ed-text)', display: 'flex', gap: 18, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {[12, 16, 20, 24, 32].map((h) => (
            <span key={h} style={{ textAlign: 'center' }}>
              <Logo variant="wordmark" style={{ height: h }} />
              <span className="vn" style={{ display: 'block', marginTop: 6 }}>{h}px</span>
            </span>
          ))}
        </div>
        <div className="vn">Wordmark · floor <strong>24px</strong>. It stays crisp below that; it stops being read.</div>
      </div>
    </div>
  );
}

/* Clear space, measured off the rendered element rather than annotated —
   the numbers below are read back from the DOM. */
export function ClearSpace() {
  const ref = useRef(null);
  const [m, setM] = useState(null);

  useLayoutEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const logo = wrap.querySelector('.ed-logo');
    if (!logo) return;
    const w = wrap.getBoundingClientRect();
    const l = logo.getBoundingClientRect();
    setM({
      logoH: Math.round(l.height),
      pad: +(l.top - w.top).toFixed(1),
      ratio: +((l.top - w.top) / l.height).toFixed(2),
    });
  }, []);

  return (
    <>
      <div className="vgrid">
        <div className="vcell" style={{ gridColumn: 'span 2' }}>
          <div className="vd" style={{ background: 'var(--ed-white)' }}>
            <span
              ref={ref}
              className="ed-logo-lockup ed-logo-lockup--lg"
              style={{ color: 'var(--ed-teal-500)', outline: '1px dashed var(--ed-teal-400)' }}
            >
              <Logo />
            </span>
          </div>
          <div className="vn">
            {m
              ? <>Logo <strong>{m.logoH}px</strong> tall · clear space <strong>{m.pad}px</strong> · ratio <strong>{m.ratio}</strong></>
              : 'measuring…'}
          </div>
        </div>
      </div>
    </>
  );
}
