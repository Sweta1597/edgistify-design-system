import '@/styles/doc-shell.css';
import '@/styles/compare.css';
import '@/styles/icon.css';
import { ContactSheet, NearPairs, FillIdentical, OpticalProof, Counts } from '@/components/demos/IconDemo';

export const metadata = {
  title: 'Icon',
  description: 'A two-colour icon library: body plus one teal accent, outline and filled, drawn to the brief.',
};

const API = [
  ['icon', 'IconDef', 'An export of @edgistify/design-system/icons — Package, ChevronDown, Truck. Required.'],
  ['filled', 'boolean', 'The selected state. Same silhouette, counter filled, accent in teal. Default outline, which is monochrome.'],
  ['size', "number | 'xs'…'xl'", 'A space token (14 · 16 · 20 · 24 · 32, scaled by warehouse mode) or a pixel number. Default sm. The optical drawing — 20, 24 or 48 — is chosen from the size.'],
  ['label', 'string', 'Accessible name, for an icon that is the only thing naming a control. Without it the icon is aria-hidden.'],
  ['…rest', 'SVGAttributes', 'className, style, onClick and the rest go to the <svg>.'],
];

/* The brief’s acceptance checklist, and which half of it the lint can
   enforce. The other half is why the contact sheet exists. */
const RULES = [
  ['lint', 'viewBox 0 -960 960 960, no width or height; artwork inside the 800-unit live area'],
  ['lint', 'Exactly two paths, body then accent, with the two fills; no strokes, groups, masks, effects'],
  ['lint', 'Every coordinate on the 40-unit grid'],
  ['lint', 'Both fill states at 24, with the same outer silhouette; accent path present only where hasAccent'],
  ['lint', 'Accent between 10% and 25% of the drawn area, touching the outer silhouette (heuristic, warns)'],
  ['sheet', '80-unit stroke, 80-unit counters, 80-unit outer radius, rounded terminals'],
  ['sheet', 'Optically centred'],
  ['sheet', 'Legible at 14px at 60cm, and at 24px at arm’s length under glare'],
  ['sheet', 'No two icons confusable at 14px — the near pairs below'],
];

export default function IconPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Component 09</div>
          <h1>Icon</h1>
          <div className="lede">Every icon the seller dashboard and the picker app use, in one library with
          two fill states. Each has a <strong>body</strong>, which takes the text colour, and <strong>one teal
          accent</strong>, which only appears in the filled state — so teal means <em>this one is current</em>,
          not decoration every row carries at once. <Counts /></div>
        </header>

        <section>
          <div className="sec-head"><h2>Use</h2>
          <p className="sub">Import the icon, not a name: the module is one file and Vite drops the exports
          you do not use. <code className="mono">filled</code> is the selected state — a nav item, a pinned
          star, the current tab. Sizes are the space foundation’s five tokens, so warehouse mode scales them
          without the component knowing.</p></div>
          <pre className="code"><code>{`import { Icon } from '@edgistify/design-system/react/Icon';
import { Package, ChevronDown } from '@edgistify/design-system/icons';

<Icon icon={Package} />                       // outline, 16px
<Icon icon={Package} filled size="lg" />      // selected: filled, teal accent, 24px
<Icon icon={ChevronDown} size={14} />         // pixel size
<Icon icon={Package} label="Package" />       // named — an icon-only button`}</code></pre>

          <div className="note">
            <span className="k">ACCENT</span>
            <p>The accent is <code className="mono">--ed-icon-accent</code>, a role the surface sets: teal-600 on
            a light page, teal-400 in dark mode, teal-300 on the nav ground, teal-400 on a selected nav row. On a
            primary or brand button it collapses to the body colour, because nothing teal reads on teal. That
            rule ships in <code className="mono">icon.css</code>; import it after <code className="mono">button.css</code>.
            A raw file from <code className="mono">icons/svg</code> used without the component keeps the teal on
            its accent in both states — the files stay literal to the brief; the component is what makes outline
            monochrome.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Status and versions</h2>
          <p className="sub">Every icon carries a status. <strong>seed</strong> is Material Symbols Rounded
          artwork on the brief’s grid, used under Apache-2.0 until it is redrawn: body only, no accent.{' '}
          <strong>drawn</strong> is ours, to the brief. <strong>approved</strong> has been reviewed on this
          sheet. The build flips seed to drawn on its own when a file changes, and bumps the icon’s version;
          the package version follows, and <code className="mono">icons/CHANGELOG.md</code> says what moved.</p></div>
          <div className="note">
            <span className="k">REPLACE</span>
            <p>To replace an icon: drop <code className="mono">{'{name}-{outline|filled}-{20|24|48}.svg'}</code> into{' '}
            <code className="mono">icons/svg</code>, run <code className="mono">npm run build</code>, then{' '}
            <code className="mono">npm test</code>. The lint reads the brief back at you — grid, live area, two
            paths, accent share — as errors once the icon is drawn, as warnings while it is a seed.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Contact sheet</h2>
          <p className="sub">Outline then filled, at 14 / 16 / 20 / 24 / 32px, on white and on near-black. The
          seed tiles show what the apps get today; a tile marked <em>fill = outline</em> has no counter to
          punch, so selection there comes from the panel and the label alone.</p></div>
          <ContactSheet />
        </section>

        <section>
          <div className="sec-head"><h2>Where the fill does nothing</h2></div>
          <FillIdentical />
        </section>

        <section>
          <div className="sec-head"><h2>Near pairs, at 14px</h2>
          <p className="sub">The pairs the brief names as confusable, at the one size where it happens. If two
          read the same here, one of them needs redrawing, not a tooltip.</p></div>
          <NearPairs />
        </section>

        <section>
          <div className="sec-head"><h2>Three drawings, not one scaled</h2>
          <p className="sub">The 20, 24 and 48 drawings of one icon rendered at the same size. The stroke gets
          heavier and the counters more open as the target gets smaller; that is a redraw, not a scale, and it
          is what keeps a 14px icon from closing up.</p></div>
          <OpticalProof name="package" />
        </section>

        <section>
          <div className="sec-head"><h2>Acceptance</h2>
          <p className="sub">The brief’s checklist. <em>lint</em> is enforced by <code className="mono">npm test</code>;{' '}
          <em>sheet</em> is judged on this page.</p></div>
          <ul className="ico-rules">
            {RULES.map(([who, text]) => <li key={text}><span className="k">{who}</span><span>{text}</span></li>)}
          </ul>
        </section>

        <section>
          <div className="sec-head"><h2>API</h2></div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
              <tbody>
                {API.map(([prop, type, note]) => (
                  <tr key={prop}>
                    <td className="t"><code className="mono">{prop}</code></td>
                    <td className="p"><code className="mono">{type}</code></td>
                    <td className="p">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <p><strong>RULE 01 applies to the accent.</strong> Teal means “this is Edgistify, and this is the thing
          to click”. It never means success, done or in stock — success green sits 39° away in hue, close enough
          to confuse when someone is scanning a pick list under a sodium lamp.</p>
        </footer>
      </div>
    </div>
  );
}
