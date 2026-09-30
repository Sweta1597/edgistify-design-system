import '@/styles/doc-shell.css';
import '@/styles/compare.css';
import { Logo } from '@edgistify/design-system/react/Logo';
import { LogoSizes, LogoOnGrounds, WordmarkTones, ClearSpace, MinSizes } from '@/components/demos/LogoDemo';

export const metadata = {
  title: 'Logo',
  description: 'One drawing per shape, coloured by currentColor — not one file per colour.',
};

const API = [
  ['variant', '"mark" | "square" | "wordmark"', 'Which artwork. Defaults to the E. monogram.'],
  ['tone', '"teal" | "black" | "white"', 'Wordmark only — it is a raster, so it cannot follow currentColor. The mark ignores it.'],
  ['title', 'string', 'Accessible name. Omit beside a visible "Edgistify" — the mark is then aria-hidden, the wordmark gets alt="".'],
  ['className', 'string', 'Added to .ed-logo. Use .ed-logo--sm/md/lg/xl to size.'],
];

const FILES = [
  ['brand/edgistify-mark.svg', 'SVG · 50.12 × 48.58', 'The E. monogram. Favicon, avatar, collapsed nav, splash.'],
  ['brand/edgistify-mark-square.svg', 'SVG · 50.12 × 50.12', 'The same path centred on a square. App icons, tiles.'],
  ['brand/wordmark/…-teal.png', 'PNG · 2800 × 698', 'The word, brand teal. Default.'],
  ['brand/wordmark/…-black.png', 'PNG · 2800 × 698', 'Ink. Documents, print, anything one-colour.'],
  ['brand/wordmark/…-white.png', 'PNG · 2800 × 698', 'Knockout. Dark bands, photographs, the dark theme.'],
];

export default function LogoPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Foundation 05</div>
          <h1>Logo</h1>
          <div className="lede"><strong>The mark is vector and takes its colour from CSS. The wordmark is a
          raster and ships in three tones.</strong> That split is not a design decision — it is what we have.
          The current wordmark reached us as a PNG, and until a vector of it exists the two halves of the logo
          behave differently.</div>
        </header>

        <section>
          <div className="note note--warn">
            <span className="k">THE WORDMARK CHANGED, AND WE SHIPPED THE OLD ONE</span>
            <p>The first version of this page used an SVG wordmark from the 2020 brand folder. The wordmark
            supplied since — <code className="mono">edgistifylogo.png</code>, October 2024 — is a
            <strong> different drawing</strong>, not a re-export. Measured letter by letter at matched height,
            its <em>d</em> is <strong>26% wider</strong> relative to its height; <em>g</em> and <em>y</em> are
            wider too, and <em>E</em> and <em>f</em> are narrower. The 2020 file is now in
            <code className="mono"> brand/source/wordmark-2020-superseded.svg</code> and is not shipped.</p>
          </div>
          <div className="note note--warn">
            <span className="k">WE NEED THE VECTOR</span>
            <p>A 2800px PNG is enough for screens and most print, but it cannot follow
            <code className="mono"> currentColor</code>, cannot be recoloured beyond the three tones we cut,
            and cannot be set in a cutting plotter, an embroidery file or a single-colour press. Tracing it
            would produce a fourth drawing, which is how brands end up with four logos. If the 2024 wordmark
            exists as AI, EPS or SVG, that file replaces this whole section.</p>
          </div>
          <div className="note">
            <span className="k">AND PROBABLY THE MONOGRAM TOO</span>
            <p>The <em>E.</em> mark still comes from the 2020 set. Nothing here shows whether it was redrawn
            alongside the wordmark — worth checking before it goes on anything permanent.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>The colour was already ours</h2>
          <p className="sub">The logo is <code className="mono">#00a699</code>. So is
          <code className="mono"> --ed-teal-500</code> — and the 2024 PNG is that same flat hex edge to edge,
          which is how we know the black and white cuts are exact.</p></div>
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
          <WordmarkTones />
          <div className="note note--warn">
            <span className="k">THE WORDMARK CANNOT DO THIS</span>
            <p>Everything in the row above is the mark. The wordmark is a raster, so it ignores
            <code className="mono"> color</code> entirely — pick a file with
            <code className="mono"> tone</code> instead. Three cuts exist; a fourth needs a new export, which
            is precisely the cost the vector would remove.</p>
          </div>
          <div className="note note--warn">
            <span className="k">DARK MODE IS YOURS TO HANDLE</span>
            <p>The mark flips for free — it inherits <code className="mono">color</code>. The wordmark does
            not: an <code className="mono">&lt;img&gt;</code> has one <code className="mono">src</code>, and a
            <code className="mono"> &lt;picture&gt;</code> with a
            <code className="mono"> prefers-color-scheme</code> source cannot see our
            <code className="mono"> [data-theme]</code> attribute, which is what actually drives the theme
            here. So pass <code className="mono">tone</code> from wherever you already know the theme. If you
            would rather not think about it, <strong>teal reads on both</strong> — it is the only cut that
            does.</p>
          </div>
          <div className="note">
            <span className="k">ON A PHOTOGRAPH</span>
            <p>The brand ships no outlined variant, so the answer to a busy background is a plate behind the
            logo — <code className="mono">.ed-logo-plate</code> — rather than an outline around it. An outline
            would mean redrawing the mark, and a redrawn mark is a different mark.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>How small it goes</h2>
          <p className="sub">The mark&rsquo;s floor is measured — rasterised at 1600px and read back as an
          ink-run histogram. The wordmark&rsquo;s is a judgement about reading, and the section says which is
          which.</p></div>
          <MinSizes />
          <div className="note">
            <span className="k">STROKE WEIGHT IS NOT THE LIMIT</span>
            <p>Which is worth saying, because it is the usual reason a logo has a floor. The mark&rsquo;s
            median stem is <strong>10.75 units of a 48.58-unit canvas — 22% of its height</strong>. Nothing
            that thick rounds away at any size you would use. Its floor is about <em>reading</em>, not
            rendering. The equivalent histogram was run on the 2020 wordmark and is not quoted here, because
            re-running it on a PNG would measure the export resolution rather than the drawing.</p>
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
            <li><strong>Don&rsquo;t trace the PNG.</strong> An autotrace is a fourth drawing, and it will not
            match the one on the website. Ask for the vector.</li>
            <li><strong>Don&rsquo;t use the 2020 SVG.</strong> It is kept in
            <code className="mono"> brand/source/</code> for reference only. It is a different wordmark.</li>
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
            <span className="k">NOT SHIPPED</span>
            <p>The 2020 folder also holds two lockups pairing the wordmark with a descriptor —
            <code className="mono"> Asset 13</code> (horizontal, hairline rule) and
            <code className="mono"> Asset 18</code> (stacked). They are not in the package, and now there is a
            second reason: they are built on the <em>superseded</em> wordmark. Even setting that aside, a
            lockup fixes the relationship between two pieces of artwork, which is a brand decision rather than
            a mechanical one. Squaring the mark was arithmetic and is included; inventing a lockup is not.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
