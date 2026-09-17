import { ramps, invariants, brand, contrastSummary, rootTokens } from '@/lib/tokens';

export const metadata = {
  title: 'Colour',
  description: 'Six OKLCH ramps from one brand teal, with every pairing measured.',
};

const ROLE_NOTES = {
  '--ed-canvas': 'App background behind cards and tables',
  '--ed-surface': 'Cards, table rows, panels',
  '--ed-text': 'Headings and body copy',
  '--ed-text-secondary': 'Field labels, column headers',
  '--ed-text-muted': 'Captions, timestamps, helper text',
  '--ed-text-id': 'SKU, order ID, pincode, bin location',
  '--ed-brand': 'Logo, active nav, chart series 1',
  '--ed-action': 'Primary button fill, links',
  '--ed-focus': 'Focus ring, 2px with an offset',
  '--ed-border': 'Card and input edges',
};

export default function ColourPage() {
  const all = ramps();
  const inv = invariants();
  const roles = rootTokens('semantic.css').filter((t) => t.name in ROLE_NOTES);

  return (
    <article className="prose">
      <h1>Colour</h1>
      <div className="lede">
        Six ramps generated in OKLCH from a single brand teal, serving the seller
        dashboard, the warehouse apps and the support docs. Every value on this page is
        read from <code>tokens/color.json</code> and every ratio is measured when the
        page builds — nothing here is typed in by hand.
      </div>

      <dl className="meta">
        <div><dt>Brand</dt><dd>{brand.hex}</dd></div>
        <div><dt>Hue</dt><dd>{brand.hue}°</dd></div>
        <div><dt>Ramps</dt><dd>{all.length} × 12</dd></div>
        <div><dt>Pairings</dt><dd>{contrastSummary.passing} / {contrastSummary.total}</dd></div>
        <div><dt>States</dt><dd>{contrastSummary.modes.length}</dd></div>
      </dl>

      <h2>The ramps</h2>
      <p>
        Twelve steps per hue, spaced evenly in perceptual lightness so a step means the
        same thing in every colour. Outlined swatches are the two load-bearing steps.
        The number under each is its measured contrast on white.
      </p>

      {all.map((ramp) => (
        <section className="ramp" key={ramp.name}>
          <div className="ramp__head">
            <span className="ramp__name">--ed-{ramp.name}-*</span>
            <span className="ramp__role">{ramp.role}</span>
          </div>
          <div className="ramp__swatches">
            {ramp.steps.map((s) => {
              const key = s.step === '500' || s.step === '600';
              return (
                <div className={`sw${key ? ' sw--key' : ''}`} key={s.step}>
                  <div className="sw__chip" style={{ background: s.hex }}>
                    <span style={{ color: s.onWhite >= 4.5 ? '#fff' : '#0f1417' }}>{s.step}</span>
                  </div>
                  <span className="sw__hex">{s.hex.slice(1)}</span>
                  <span className="sw__cr">{s.onWhite.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className="callout">
        <span className="callout__k">RULE 01</span>
        <p>
          <strong>Teal is the brand. Teal is not a status.</strong> It never means
          “success”, “done” or “in stock”. Success green sits just 39° away in hue —
          close enough to confuse when someone is scanning a pick list under a sodium
          lamp. Teal means <em>this is Edgistify</em>, and <em>this is the thing to click</em>.
        </p>
      </div>

      <h2>Two invariants</h2>
      <p>
        These hold across all six ramps, which is what makes the palette safe to use
        without looking anything up. <code>npm test</code> fails the build if either
        breaks — and the figures below are the <em>worst</em> case across every ramp,
        computed while this page rendered.
      </p>
      <table>
        <thead>
          <tr><th>Step</th><th>Must clear</th><th>Worst across ramps</th><th>Use it for</th></tr>
        </thead>
        <tbody>
          {inv.map((i) => (
            <tr key={i.step}>
              <td><code>{i.step}</code></td>
              <td>{i.target.toFixed(1)}:1 on white</td>
              <td>
                <strong style={{ color: i.holds ? 'var(--ed-success-text)' : 'var(--ed-danger-text)' }}>
                  {i.worst.toFixed(2)}:1
                </strong>
              </td>
              <td>
                {i.step === '600'
                  ? 'The workhorse — body text, and a fill behind white text'
                  : 'Large text, icons, borders and chart marks only'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Brand teal lives at step 500, which is why <strong>{brand.hex} is never safe
        behind white body text</strong>. That is the whole reason the system separates
        <code>--ed-brand</code> from <code>--ed-action</code>: one is identity, the other
        is the thing you click.
      </p>

      <h2>Semantic roles</h2>
      <p>
        Components reference these, never the primitives. That indirection is the whole
        reason dark and warehouse modes cost nothing to maintain.
      </p>
      <table>
        <thead><tr><th>Token</th><th>Light value</th><th>Use it for</th></tr></thead>
        <tbody>
          {roles.map((t) => (
            <tr key={t.name}>
              <td><code>{t.name}</code></td>
              <td><code>{t.value.replace(/var\(--ed-|\)/g, '')}</code></td>
              <td>{ROLE_NOTES[t.name]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Two axes, not three modes</h2>
      <p>
        Light and dark is the theme. Desk and warehouse is how loud the interface has to
        be. They are independent, so there are four states rather than three — and a
        night shift in a warehouse is a real one. Switch them at the top of this page and
        watch every component on the site change without any markup changing.
      </p>
      <p>
        That fourth state went unmeasured until recently, and it was broken: warehouse
        stated “louder” in absolute greys, which only reads as louder on a light canvas.
        On dark it inverted — muted text landed at 1.00:1 on its own surface. All{' '}
        {contrastSummary.total} pairings now cover every combination.
      </p>
    </article>
  );
}
