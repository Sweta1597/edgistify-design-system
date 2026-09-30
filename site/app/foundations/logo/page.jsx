import '@/styles/doc-shell.css';
import '@/styles/compare.css';
import { Logo } from '@edgistify/design-system/react/Logo';
import { LogoSizes, LogoOnGrounds, ClearSpace, MinSizes } from '@/components/demos/LogoDemo';

export const metadata = {
  title: 'Logo',
  description: 'One drawing per shape, coloured by currentColor — not one file per colour.',
};

const API = [
  ['variant', '"mark" | "square" | "wordmark"', 'Which artwork. Defaults to the E. monogram.'],
  ['title', 'string', 'Accessible name. Omit beside a visible "Edgistify" — it is then aria-hidden.'],
  ['className', 'string', 'Added to .ed-logo. Use .ed-logo--sm/md/lg/xl to size.'],
];

const FILES = [
  ['brand/edgistify-mark.svg', '50.12 × 48.58', 'The E. monogram. Favicon, avatar, collapsed nav, splash.'],
  ['brand/edgistify-mark-square.svg', '50.12 × 50.12', 'The same path centred on a square. App icons, tiles.'],
  ['brand/edgistify-wordmark.svg', '258.29 × 65.23', 'The word. Headers, footers, documents, email.'],
];

export default function LogoPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Foundation 05</div>
          <h1>Logo</h1>
          <div className="lede"><strong>One drawing per shape, not one file per colour.</strong> The brand
          folder shipped the same E three times — teal, white and black — with byte-identical path data and
          three different fills. Those are three files to keep in step for no gain. Everything here is drawn in
          <code className="mono"> currentColor</code>, so the mark takes the colour of whatever it sits in.</div>
        </header>

        <section>
          <div className="sec-head"><h2>The colour was already ours</h2>
          <p className="sub">The logo is <code className="mono">#00a699</code>. So is
          <code className="mono"> --ed-teal-500</code>.</p></div>
          <div className="note">
            <span className="k">NO BRAND TOKEN</span>
            <p>There is no separate <code className="mono">--ed-brand-logo</code>, and there should not be.
            The colour ramp was built outward from this hex, so a second name for it would be a second thing
            to keep in step. If the brand colour ever moves, it moves in
            <code className="mono"> primitives.css</code> and the logo follows — because the artwork carries
            no colour of its own.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>The three shapes</h2>
          <p className="sub">The monogram is an <em>E.</em> — the letter and a full stop, one piece of
          artwork. The wordmark is the word alone and carries no dot.</p></div>
          <div className="table-scroll">
            <table className="ed-table">
              <thead><tr><th>File</th><th>viewBox</th><th>Use</th></tr></thead>
              <tbody>{FILES.map(([f, v, u]) => (
                <tr key={f}><td><code className="mono">{f}</code></td><td className="mono">{v}</td><td>{u}</td></tr>
              ))}</tbody>
            </table>
          </div>
          <LogoSizes />
        </section>

        <section>
          <div className="sec-head"><h2>On any ground</h2>
          <p className="sub">The whole point of <code className="mono">currentColor</code>: set
          <code className="mono"> color</code> on a parent and the artwork follows. There is no knockout
          file, because there does not need to be one.</p></div>
          <LogoOnGrounds />
          <div className="note">
            <span className="k">ON A PHOTOGRAPH</span>
            <p>The brand ships no outlined variant, so the answer to a busy background is a plate behind the
            logo — <code className="mono">.ed-logo-plate</code> — rather than an outline around it. An outline
            would mean redrawing the mark, and a redrawn mark is a different mark.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>How small it goes</h2>
          <p className="sub">Measured by rasterising each shape at 1600px and reading the ink-run histogram
          back in viewBox units — not copied from a template.</p></div>
          <MinSizes />
          <div className="note">
            <span className="k">STROKE WEIGHT IS NOT THE LIMIT</span>
            <p>Which is worth saying, because it is the usual reason a logo has a floor. The wordmark&rsquo;s
            typical stem is <strong>8.15 units of a 65.23-unit canvas — 12.5% of its height</strong>, and even
            the 5th percentile is 7.62. A stem that thick only rounds away below 9px tall. The mark is sturdier
            again at 22%. The floors are about <em>reading</em>, not rendering.</p>
          </div>
          <div className="note">
            <span className="k">WHY THE MARK SURVIVES BEING SMALL</span>
            <p>It has <strong>no enclosed counters at all</strong> — the E is three open arms, and the dot is a
            separate shape. Most monograms lose their counters first; this one has none to lose. The only
            feature that can close is the gap between the E and its dot, 15% of the height, which is still
            2.4px at 16px tall.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Clear space</h2>
          <p className="sub">Half the logo&rsquo;s own height on every side, driven by
          <code className="mono"> --ed-logo-h</code> — one variable sets both the artwork and the padding.</p></div>
          <ClearSpace />
          <div className="note">
            <span className="k">WHY NOT <code className="mono">0.5em</code></span>
            <p>Because it does not mean what it looks like it means. <code className="mono">em</code> on the
            wrapper resolves against the <em>wrapper&rsquo;s</em> font-size — whatever the page happened to
            inherit — not against the logo. The first version of this rule measured
            <strong> 6.3px around a 40px logo, a ratio of 0.16</strong> rather than 0.5, and got further
            adrift the larger the logo. The number under the specimen above is read back from the DOM, so it
            cannot quietly go wrong again.</p>
          </div>
          <div className="note">
            <span className="k">PADDING, NOT MARGIN</span>
            <p>On a wrapper. Margin collapses against neighbours and disappears entirely in a flex row — which
            is exactly where a header logo lives, so the one place the rule matters most is the one place
            margin would not have held. Inside a lockup, don&rsquo;t also add an
            <code className="mono"> .ed-logo--*</code> size class: use
            <code className="mono"> .ed-logo-lockup--*</code>, or the padding will be sized from one number and
            the artwork from another.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Don&rsquo;t</h2></div>
          <ul className="dont">
            <li><strong>Don&rsquo;t set the wordmark in a font.</strong> It is drawn letterforms. Inter Bold is
            not it, and the marketing layer said otherwise until the brand files arrived.</li>
            <li><strong>Don&rsquo;t add a dot to the word.</strong> The dot belongs to the monogram.
            <code className="mono"> .ed-mk-wordmark::after</code> used to append one; it is gone.</li>
            <li><strong>Don&rsquo;t hard-code the hex.</strong> Set <code className="mono">color</code>, or use
            <code className="mono"> var(--ed-teal-500)</code>.</li>
            <li><strong>Don&rsquo;t put it in an <code className="mono">&lt;img&gt;</code></strong> when it
            needs to change colour — an <code className="mono">&lt;img&gt;</code> cannot inherit
            <code className="mono"> currentColor</code>. Use <code className="mono">&lt;Logo /&gt;</code>.</li>
            <li><strong>Don&rsquo;t recolour the word and the dot separately.</strong> They are two assets, not
            two halves of one.</li>
          </ul>
        </section>

        <section>
          <div className="sec-head"><h2>API</h2></div>
          <div className="table-scroll">
            <table className="ed-table">
              <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
              <tbody>{API.map(([p, t, n]) => (
                <tr key={p}><td className="mono">{p}</td><td className="mono">{t}</td><td>{n}</td></tr>
              ))}</tbody>
            </table>
          </div>
          <div className="note">
            <span className="k">SERVER-SAFE</span>
            <p>No hooks, so it renders in a server component — which it must, because the marketing header and
            footer are server-rendered. That is why the accessible name is
            <code className="mono"> aria-label</code> rather than <code className="mono">aria-labelledby</code>
            pointing at the <code className="mono">&lt;title&gt;</code>: the pairing needs a unique id, and the
            only source of one is <code className="mono">useId</code>.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Still in Drive</h2></div>
          <div className="note">
            <span className="k">NOT YET SHIPPED</span>
            <p>The brand folder also holds two lockups that pair the wordmark with a descriptor —
            <code className="mono"> Asset 13</code> (horizontal, with a hairline rule) and
            <code className="mono"> Asset 18</code> (stacked). They are not in the package: a lockup fixes the
            relationship between two pieces of artwork, and that is a brand decision rather than a mechanical
            one. Squaring the mark was arithmetic and is included; inventing a lockup is not, and would risk
            contradicting guidance nobody here has seen. Whoever owns brand should add them.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
