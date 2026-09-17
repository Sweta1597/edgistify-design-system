import '@/styles/button.css';
import { Button, ButtonGroup } from '@edgistify/design-system/react/Button';
import { Icon } from '@/components/demos/ArtifactIcon';
import { ButtonStates } from '@/components/demos/ButtonStates';
import { ButtonDemo } from '@/components/demos/ButtonDemo';

export const metadata = {
  title: 'Button',
  description: 'Seven variants, five sizes, and the one that proves the foundations work.',
};

const VARIANTS = [
  ['primary', 'The one main action on a view. #008277 — passes AA under white text.',
    <Button key="v"><Icon name="check" />Confirm pick</Button>],
  ['brand', 'Full-strength #00a699 with dark ink. At most one per screen.',
    <Button key="v" variant="brand"><Icon name="scan" />Start pick</Button>],
  ['secondary', 'Everything alongside the main action. Carries a border, not a fill.',
    <Button key="v" variant="secondary">Cancel</Button>],
  ['ghost', 'Low-emphasis, repeated actions — toolbars, table rows, filters.',
    <Button key="v" variant="ghost"><Icon name="filter" />Filter</Button>],
  ['danger', 'Destructive and standing alone, in a confirmation dialog.',
    <Button key="v" variant="danger"><Icon name="trash" />Delete wave</Button>],
  ['danger-quiet', 'Destructive inside a row of ordinary actions. A red block on every row trains people to ignore red.',
    <Button key="v" variant="danger-quiet">Remove</Button>],
  ['link', 'Inline in a sentence, where a box would be too loud.',
    <span key="v" style={{ fontSize: '13.5px', color: 'var(--ed-text-muted)' }}>
      Synced 4 min ago · <Button variant="link">Refresh now</Button>
    </span>],
];

const ICON_BTNS = [
  ['xs', 'ghost', 'Filter rows', 'filter'],
  ['sm', 'secondary', 'More actions', 'more'],
  ['md', 'secondary', 'Export CSV', 'down'],
  ['lg', 'primary', 'Add order', 'plus'],
  ['xl', 'brand', 'Scan barcode', 'scan'],
];

const API = [
  ['variant', 'ButtonVariant', 'primary · brand · secondary · ghost · danger · danger-quiet · link. Default primary.'],
  ['size', 'ButtonSize', 'xs · sm · md · lg · xl. Maps to --ed-control-*, so warehouse mode is automatic.'],
  ['icon', 'boolean', 'Square, icon-only. Warns in dev without an aria-label.'],
  ['loading', 'boolean', 'Spinner, blocks pointer events, sets aria-busy, holds the width steady.'],
  ['block', 'boolean', 'Full width.'],
  ['as', 'ElementType', 'Render as another element — as="a" for a link styled as a button.'],
  ['disabled', 'boolean', 'Inert appearance, not a faded one.'],
];

export default function ButtonPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Component 01</div>
          <h1>Button</h1>
          <p className="lede">The first component, and the one that proves the foundations work: it takes its
          colour, its type and its size from tokens, so warehouse mode costs it nothing. Replaces
          <strong> 368 hand-styled buttons</strong> in the dashboard, no two of which agreed.</p>
        </header>

        <section>
          <div className="sec-head"><h2>Seven variants</h2>
          <p className="sub">Every one of them darkens on hover. The dashboard currently uses
          <code className="mono">hover:opacity-90</code>, which fades the label along with the fill and turns
          muddy over a tinted row. Hover, press, and tab through these — they are live.</p></div>
          <div className="vgrid" id="variants">
            {VARIANTS.map(([name, desc, demo]) => (
              <div className="vcard" key={name}>
                <div className="vdemo">{demo}</div>
                <div className="vname">{name}</div>
                <div className="vdesc">{desc}</div>
              </div>
            ))}
          </div>
          <div className="note">
            <span className="k">RULE 04</span>
            <p><strong>One <code className="mono">brand</code> button per screen, at most.</strong>{' '}
            <code className="mono">primary</code> is #008277 and does the everyday work.{' '}
            <code className="mono">brand</code> is full-strength #00a699 with dark ink on it — reserve it for
            the single moment that matters most on a screen: <em>Start pick</em>, <em>Scan</em>,{' '}
            <em>Confirm dispatch</em>.</p>
            <p>Teal used everywhere stops meaning anything. That is what “use it smartly” has to cash out
            to in code.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Five sizes, and the glove</h2>
          <p className="sub">Sizes map straight onto the control tokens, so every one of them grows in
          warehouse mode without a single extra rule. Flip it with the controls at the top of the page —
          and note that the icon buttons keep their visual size in the dense row while their hit area
          grows underneath.</p></div>
          <div className="stage" id="stage-sizes">
            <div className="lbl">Sizes · xs → xl</div>
            <div className="ed-btn-group" id="sizes">
              {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
                <Button key={s} size={s}>{s}</Button>
              ))}
            </div>
          </div>
          <div className="stage" id="stage-icons">
            <div className="lbl">Icon only · aria-label required</div>
            <div className="ed-btn-group" id="iconbtns">
              {ICON_BTNS.map(([s, v, label, ic]) => (
                <Button key={label} size={s} variant={v} icon aria-label={label} title={label}>
                  <Icon name={ic} />
                </Button>
              ))}
            </div>
          </div>
          <div className="stage">
            <div className="lbl">Handheld · group stacks and fills below 56px targets</div>
            <ButtonGroup stack>
              <Button variant="secondary" size="xl">Report short</Button>
              <Button size="xl">Confirm pick</Button>
            </ButtonGroup>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>States</h2>
          <p className="sub">Disabled reads as inert rather than as a faded copy of itself — opacity on a
          filled button washes the label into the fill. Loading keeps the button’s width so nothing
          beside it jumps. Click a loading button to watch it work.</p></div>
          <div className="stage">
            <div className="lbl">Rest · Hover · Focus · Disabled · Loading</div>
            <ButtonStates />
          </div>
          <div className="note">
            <span className="k">RULE 05</span>
            <p><strong>Anything that hits an API gets <code className="mono">loading</code>.</strong> There is
            no loading state anywhere in the dashboard today. A picker who taps <em>Confirm pick</em>
            twice because the first tap showed nothing has created a duplicate — and a duplicate in a
            pick confirmation is an inventory discrepancy somebody reconciles by hand later.</p>
            <p>The spinner also blocks pointer events, so the second tap cannot land even if they are fast.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>API</h2>
          <p className="sub">Ships as <code className="mono">.jsx</code> with a <code className="mono">.d.ts</code>
          beside it, so the two JSX apps and the two TSX apps consume the same file without a build step
          in between. Edit the example — it compiles as you type.</p></div>

          <ButtonDemo code={`
<ButtonGroup>
  <Button variant="primary">Confirm pick</Button>
  <Button variant="secondary">Cancel</Button>
  <Button as="a" href="/orders" variant="ghost">All orders</Button>
</ButtonGroup>
`} />

          <div className="tw" style={{ marginTop: 20 }}>
            <table>
              <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
              <tbody id="api">
                {API.map(([p, t, n]) => (
                  <tr key={p}>
                    <td className="mono">{p}</td>
                    <td className="mono">{t}</td>
                    <td>{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <p>Component CSS at <code className="mono">dist/button.css</code>, wrapper at
          <code className="mono">react/Button.jsx</code>. Contrast now covers 296 pairings — the check caught
          the ghost button failing against its own hover tint at 4.24:1, which is why its label darkens
          too. Next: <strong>Cards</strong>.</p>
        </footer>
      </div>
    </div>
  );
}
