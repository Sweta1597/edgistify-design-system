import { rootTokens } from '@/lib/tokens';

export const metadata = {
  title: 'Space',
  description: 'A 4px grid, control heights sized for gloves, and radii that mean something.',
};

const pick = (tokens, prefix, exclude = []) =>
  tokens.filter((t) => t.name.startsWith(prefix) && !exclude.some((e) => t.name.includes(e)));

export default function SpacePage() {
  const tokens = rootTokens('space.css');
  const space   = pick(tokens, '--ed-space-');
  const pad     = pick(tokens, '--ed-pad-');
  const gap     = pick(tokens, '--ed-gap-');
  const control = pick(tokens, '--ed-control-');
  const icon    = pick(tokens, '--ed-icon-');
  const radius  = pick(tokens, '--ed-radius-');

  return (
    <article className="prose">
      <h1>Space</h1>
      <div className="lede">
        A 4px grid underneath everything, with named roles on top of it. You should be
        reaching for <code>--ed-pad-card</code> rather than <code>--ed-space-5</code> —
        the grid is the substrate, the roles are the interface.
      </div>

      <dl className="meta">
        <div><dt>Base</dt><dd>4px</dd></div>
        <div><dt>Steps</dt><dd>{space.length}</dd></div>
        <div><dt>Controls</dt><dd>{control.length}</dd></div>
        <div><dt>Radii</dt><dd>{radius.length}</dd></div>
      </dl>

      <h2>The grid</h2>
      <p>
        Everything lands on a multiple of 4. <code>npm run lint:grid</code> fails the
        build on anything that doesn't — which is how <code>p-[7px]</code> stops
        appearing in a codebase.
      </p>
      <div className="spec-grid">
        {space.map((t) => (
          <div className="spec-cell" key={t.name}>
            <div className="spec-cell__bar" style={{ width: `var(${t.name})`, minWidth: 2 }} />
            <span className="spec-cell__name">{t.name.replace('--ed-space-', '')}</span>
            <span className="spec-cell__val">{t.value}</span>
          </div>
        ))}
      </div>

      <h2>Roles, not numbers</h2>
      <p>
        These are what components actually use. The point of the indirection is that
        warehouse mode changes them all at once: padding opens up, controls grow, and no
        component has to know it happened.
      </p>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Use it for</th></tr></thead>
        <tbody>
          {[...pad, ...gap].map((t) => (
            <tr key={t.name}>
              <td><code>{t.name}</code></td>
              <td><code>{t.value}</code></td>
              <td>{t.note ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Control heights</h2>
      <p>
        Five heights, and the reason there are five is the second audience. WCAG asks for
        24px at AA and 44px at AAA — but both figures assume a bare fingertip. Nothing in
        the standard covers a gloved one, so warehouse mode uses a 44px floor, 56px for
        anything operational and 64px for the primary action. Those are my judgment, not
        a citable specification, and they should be tested with real gloves on a real
        handheld.
      </p>
      <div className="example">
        <div className="example__preview" style={{ alignItems: 'flex-end' }}>
          {control.map((t) => (
            <div key={t.name} style={{ textAlign: 'center' }}>
              <div className="swatch-box"
                   style={{ height: `var(${t.name})`, width: '4.5rem',
                            borderRadius: 'var(--ed-radius-control)' }}>
                {t.value}
              </div>
              <span className="spec-cell__val" style={{ display: 'block', marginTop: 6 }}>
                {t.name.replace('--ed-control-', '')}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p>
        Switch <strong>Warehouse</strong> above: every box grows, and so does every
        button and input on this site, because they are all sized from these.
      </p>

      <h2>Icons</h2>
      <p>
        Three sizes, all multiples of 2 and all matched to a control height. Lucide draws
        on a 24px canvas with a 2px stroke, so the rendered stroke is{' '}
        <code>2 × size ÷ 24</code> — an off-grid size gives you a sub-pixel stroke and a
        blurry icon. Stay on these.
      </p>
      <div className="example">
        <div className="example__preview">
          {icon.map((t) => (
            <div key={t.name} style={{ textAlign: 'center' }}>
              <svg style={{ width: `var(${t.name})`, height: `var(${t.name})`,
                            color: 'var(--ed-action)' }}
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
              </svg>
              <span className="spec-cell__val" style={{ display: 'block', marginTop: 6 }}>
                {t.name.replace('--ed-icon-', '')} · {t.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h2>Corner radius</h2>
      <p>
        Radius carries meaning here: the bigger the surface, the rounder the corner. A
        control and the panel it sits inside should not share a radius, or the control
        looks stuck to the wall.
      </p>
      <div className="example">
        <div className="example__preview">
          {radius.map((t) => (
            <div key={t.name} style={{ textAlign: 'center' }}>
              <div className="swatch-box"
                   style={{ width: '5.5rem', height: '3.5rem', borderRadius: `var(${t.name})` }}>
                {t.value}
              </div>
              <span className="spec-cell__val" style={{ display: 'block', marginTop: 6 }}>
                {t.name.replace('--ed-radius-', '')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
