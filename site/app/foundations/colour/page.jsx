import '@/styles/colour.css';
import { colours, brand, contrastSummary } from '@/lib/tokens';

export const metadata = {
  title: 'Colour',
  description: 'Every colour in the system: the core ramps from one brand teal, the marketing accents and brand A, with every pairing measured.',
};

/* Verbatim from the published specimen — this is content, not data. */
const ROLES = [
  ['--ed-canvas', 'neutral-50', '', 'App background behind cards and tables'],
  ['--ed-surface', 'white', '', 'Cards, table rows, panels'],
  ['--ed-text', 'neutral-950', '15.0', 'Headings and body copy'],
  ['--ed-text-secondary', 'neutral-800', '9.2', 'Field labels, column headers'],
  ['--ed-text-muted', 'neutral-700', '6.8', 'Captions, timestamps, helper text'],
  ['--ed-text-id', 'neutral-800', '9.2', 'SKU, order ID, pincode, bin location'],
  ['--ed-text-id-strong', 'teal-700', '6.6', 'The identifier that was just scanned'],
  ['--ed-brand', 'teal-500', '3.0', 'Logo, active nav, chart series 1 — never behind white body text'],
  ['--ed-action', 'teal-600', '4.7', 'Primary button fill, links'],
  ['--ed-action-hover', 'teal-700', '6.6', 'Hover on a primary button'],
  ['--ed-focus', 'teal-600', '4.7', 'Focus ring, 2px with a white offset'],
  ['--ed-border', 'neutral-200', '', 'Card and input edges'],
  ['--ed-border-strong', 'neutral-500', '3.2', 'Emphasis dividers — non-text, so 3:1'],
  ['--ed-success-solid', 'green-600', '4.6', 'Solid badge, warehouse status block'],
  ['--ed-danger-solid', 'red-600', '5.5', 'Destructive fill, breach block'],
];

export default function ColourPage() {
  const { groups, singles, count } = colours();
  const rampCount = groups.reduce((n, g) => n + g.ramps.length, 0);
  const chip = (s) => (
    <div className={`sw${!s.hex ? ' empty' : s.step === '500' || s.step === '600' ? ' key' : ''}`} key={s.step}>
      <div className="chip" style={s.hex ? { background: s.hex } : undefined}>
        {s.hex && (
          <span className="step" style={{ color: s.onWhite >= 4.5 ? '#fff' : '#0f1417' }}>
            {s.step}
          </span>
        )}
      </div>
      <span className="hex">{s.hex ? s.hex.slice(1) : ''}</span>
    </div>
  );

  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Foundation 01 of 07</div>
          <h1>Colour</h1>
          <p className="lede">Every colour in the system, kept here in one place: six core ramps generated
          in OKLCH from a single brand teal, the two marketing accents, and the ramps of brand A, the
          shipping label. The app and marketing pages show the ones each uses; this page holds them all.
          Every pairing below is measured, not eyeballed.</p>
          <dl className="meta">
            <div><dt>Brand</dt><dd>{brand.hex}</dd></div>
            <div><dt>Hue</dt><dd>{brand.hue}°</dd></div>
            <div><dt>Ramps</dt><dd>{rampCount}</dd></div>
            <div><dt>Colours</dt><dd>{count}</dd></div>
            <div><dt>States</dt><dd>2 × 2</dd></div>
            <div><dt>Checked pairings</dt><dd>{contrastSummary.passing} / {contrastSummary.total}</dd></div>
          </dl>
        </header>

        <section>
          <div className="sec-head">
            <h2>The ramps</h2>
            <p className="sub">Twelve steps per hue, spaced evenly in perceptual lightness so a step means the
            same thing in every colour. Outlined swatches are the two load-bearing steps.</p>
          </div>
          <div id="ramps">
            {groups.map((g) => (
              <div className="ramp-group" key={g.key}>
                <div className="group-head">
                  <h3>{g.title}</h3>
                  {g.note && <p>{g.note}</p>}
                </div>
                {g.ramps.map((ramp) => (
                  <div className="ramp" key={ramp.name}>
                    <div className="ramp-head">
                      <span className="ramp-name">--ed-{ramp.name}-*</span>
                      <span className="ramp-role">{ramp.role}</span>
                    </div>
                    <div className="swatches">{ramp.steps.map(chip)}</div>
                  </div>
                ))}
              </div>
            ))}
            <div className="ramp-group">
              <div className="group-head">
                <h3>Single colours</h3>
                <p>Outside a ramp’s 25 to 950: pure white, ink, and teal past its 950.</p>
              </div>
              <div className="singles">
                {singles.map((s) => (
                  <div className="single" key={s.name}>
                    <div className="chip" style={{ background: s.hex }} />
                    <span className="ramp-name">{s.name}</span>
                    <span className="hex">{s.hex.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rule">
            <span className="k">RULE 01</span>
            <p><strong>Teal is the brand. Teal is not a status.</strong> It must never mean “success”,
            “done” or “in stock”. Our success green sits just 39° away in hue — close enough that someone
            scanning a pick list under a sodium lamp will confuse the two. Success is always green.
            Teal means <em>this is Edgistify</em>, and <em>this is the thing to click</em>.</p>
          </div>
        </section>

        <section>
          <div className="sec-head">
            <h2>Two invariants</h2>
            <p className="sub">These hold across the six core ramps and the two accents, which is what makes
            the palette safe to use without looking anything up. <code>npm test</code> fails the build if
            either breaks on a core ramp. Brand A is pinned to its palette instead: tan and orange keep both,
            but <strong>stone-600 is 4.4:1</strong>, so text on a light ground is stone-700 or darker.</p>
          </div>
          <div className="inv">
            <div>
              <div className="big">600</div>
              <div className="lbl">≥ 4.5:1 on white</div>
              <p>The workhorse. Safe for body text, and safe as a fill behind white text. When in doubt,
              reach for 600.</p>
            </div>
            <div>
              <div className="big">500</div>
              <div className="lbl">≥ 3.0:1 on white</div>
              <p>Large text, icons, borders and chart marks only. Brand teal lives here — so
              <strong>#00a699 is never safe behind white body text</strong>.</p>
            </div>
            <div>
              <div className="big">6.10:1</div>
              <div className="lbl">Ink on brand</div>
              <p>When you do want the full-strength brand as a fill, put near-black on it rather than
              white. That pairing passes comfortably.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="sec-head">
            <h2>Two axes, one palette</h2>
            <p className="sub">Light and dark is the theme. Desk and warehouse is how loud the interface has
            to be — the same colours, not a second brand: status stops being a tint and becomes a solid
            block, and muted text and borders step up so nothing important depends on a subtle grey seen
            through glare, at arm’s length, in a hurry. They are independent, so there are four states,
            not three. Flip between them with the controls at the top of the page — the components below
            are identical, only the tokens change.</p>
          </div>
          <div className="board" id="board">
            <div className="specimens">
              <div className="spec">
                <h3>Actions</h3>
                <div className="row">
                  <button className="btn primary">Confirm pick</button>
                  <button className="btn secondary">Cancel</button>
                  <button className="btn ghost">Details</button>
                </div>
              </div>
              <div className="spec">
                <h3>Status</h3>
                <div className="row">
                  <span className="pill ok"><span className="d" />Picked</span>
                  <span className="pill warn"><span className="d" />Short</span>
                  <span className="pill bad"><span className="d" />SLA breach</span>
                </div>
              </div>
              <div className="spec">
                <h3>Identifiers</h3>
                <div className="row">
                  <span className="idchip">SKU-4417-BLK-M</span>
                  <span className="idstrong">ORD-880241</span>
                </div>
              </div>
              <div className="spec" style={{ gridColumn: '1/-1' }}>
                <h3>Pick list row</h3>
                <div className="picklist">
                  {[
                    ['SKU-4417-BLK-M', 'A-12-03', 4, 'ok', 'Picked'],
                    ['SKU-9120-WHT-L', 'C-04-11', 2, 'warn', 'Short'],
                    ['SKU-2288-NVY-S', 'B-21-07', 1, 'bad', 'Not found'],
                  ].map(([sku, bin, qty, tone, label]) => (
                    <div className="pick" key={sku}>
                      <span className="sku">{sku}</span>
                      <span className="bin">{bin}</span>
                      <span className="qty">×&nbsp;{qty}</span>
                      <span className={`pill ${tone}`}><span className="d" />{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="sec-head">
            <h2>Semantic roles</h2>
            <p className="sub">Components reference these, never the primitives. That indirection is the whole
            reason dark and warehouse modes cost nothing to maintain.</p>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Token</th><th>Light value</th><th>On white</th><th>Use it for</th></tr></thead>
              <tbody id="roles">
                {ROLES.map(([t, v, cr, u]) => (
                  <tr key={t}>
                    <td className="tok">{t}</td>
                    <td className="val">{v}</td>
                    <td>{cr ? <span className="cr pass">{cr}:1</span> : <span className="val">—</span>}</td>
                    <td className="use">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <p>Read from <code>dist/primitives.css</code>, so a colour added there appears here. Verify with <code>npm test</code> in
          <code>edgistify-design-system/</code>. Next foundation: <strong>Type</strong> — including the
          identifier face these SKU and order numbers are set in.</p>
        </footer>
      </div>
    </div>
  );
}
