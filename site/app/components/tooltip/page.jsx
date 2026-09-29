import '@/styles/doc-shell.css';
import { ToolbarDemo, TruncatedCellDemo, VersusNative, TooltipExample, WarehouseDemo } from '@/components/demos/TooltipDemo';

export const metadata = {
  title: 'Tooltip',
  description: 'Replaces the native title attribute, which is invisible on every touch screen we ship to.',
};

const API = [
  ['label', 'ReactNode', 'The label. Short, and never the only place the information exists.'],
  ['side', "'top' | 'bottom'", 'Preferred side. Flips only when the preferred one cannot hold it.'],
  ['gap', 'number', 'Distance from the control in px. Default 8.'],
  ['mono', 'boolean', 'Mono face, for a SKU, order id or barcode.'],
  ['disabled', 'boolean', 'Renders the child untouched — for a row that only sometimes needs one.'],
  ['children', 'ReactElement', 'Exactly one element, cloned in place. No wrapper, so flex rows and table cells are undisturbed.'],
];

export default function TooltipPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Component 08</div>
          <h1>Tooltip</h1>
          <div className="lede">A short label for a control that cannot show one: an icon button, a
          truncated cell, an abbreviation. It exists to retire the native
          <code className="mono"> title</code> attribute, which the two apps use in <strong>17</strong> places
          and which is <strong>invisible on the picker app entirely</strong>, because that app is touch-only
          and <code className="mono">title</code> needs a hover that will never happen.</div>
        </header>

        <section>
          <div className="sec-head"><h2>Why not <code className="mono">title</code></h2>
          <p className="sub">It looks free. It is not.</p></div>
          <div className="note">
            <span className="k">COSTS</span>
            <div>
              <p>It never appears on a touch screen. Every label on a handheld is simply gone.</p>
              <p>Roughly a one-second delay, drawn by the operating system, at a size chosen by the
              operating system — unreadable at warehouse distance.</p>
              <p>It cannot be styled, positioned, or kept open while you read it.</p>
              <p>Screen readers announce it inconsistently, and it is silently <em>ignored</em> when the
              element already has an accessible name — which every icon button here does.</p>
            </div>
          </div>
          <div style={{ marginTop: 'var(--ed-space-6)' }}><VersusNative /></div>
        </section>

        <section>
          <div className="sec-head"><h2>What a tooltip is not</h2></div>
          <div className="note">
            <span className="k">NOT FOR</span>
            <p>It is <strong>not a place to put information the user needs.</strong> It vanishes, it
            cannot be reached on a handheld, and it cannot hold a link or a button. If it matters, put
            it on the page. A tooltip only ever restates something the control already implies.</p>
          </div>
          <div className="note">
            <span className="k">NAMING</span>
            <p>And it never supplies a name. The component attaches with
            <code className="mono"> aria-describedby</code>, which <em>supplements</em> a name and cannot
            replace one. <strong>An icon-only button still needs its own
            <code className="mono"> aria-label</code></strong> — without one it is unnamed to a screen
            reader and unnamed on a touch screen, tooltip or no tooltip.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>The toolbar case</h2>
          <p className="sub">Hover one, then sweep across the row — the open delay stops the whole toolbar
          strobing. Then tab into them: keyboard focus shows the label at once, because by then the user has
          already committed.</p></div>
          <ToolbarDemo />
        </section>

        <section>
          <div className="sec-head"><h2>WCAG 1.4.13, built in</h2>
          <p className="sub">Content that appears on hover or focus has three obligations. All three are in the
          component rather than left to each caller — try them on the toolbar above.</p></div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Obligation</th><th>How</th></tr></thead>
              <tbody>
                <tr><td className="t">Dismissible</td><td className="p">Escape closes the tooltip without
                  closing the dialog or menu behind it. <code className="mono">popover=&quot;manual&quot;</code>{' '}
                  means the browser will not do this for us, so the component listens.</td></tr>
                <tr><td className="t">Hoverable</td><td className="p">The pointer can travel off the control and
                  into the bubble without it disappearing — a 120ms grace period, cancelled when the pointer
                  arrives. A long label can be read at leisure.</td></tr>
                <tr><td className="t">Persistent</td><td className="p">It never times out on its own. It closes
                  when the user leaves, presses Escape, or performs the action it was describing.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Truncated identifiers</h2>
          <p className="sub">A column too narrow for a full order id. The tooltip restores the whole value in
          the mono face, because it is still an identifier — that is a role in the colour foundation, not a font
          choice made per component.</p></div>
          <TruncatedCellDemo />
        </section>

        <section>
          <div className="sec-head"><h2>Live</h2>
          <p className="sub">Edit the code — it renders what you type.</p></div>
          <TooltipExample />
        </section>

        <section>
          <div className="sec-head"><h2>Warehouse mode</h2>
          <p className="sub">Flip the toggle above. The bubble grows to <code className="mono">--ed-text-md</code>{' '}
          at 15px with heavier padding and a deeper shadow, so it clears a gloved thumb. The tooltip is still a
          desktop affordance though — on a handheld the label must be on the screen.</p></div>
          <WarehouseDemo />
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
          <p>The bubble lives in the browser&apos;s top layer through the
          <code className="mono"> popover</code> attribute, so there is no z-index to choose and none to lose
          against — the same reason Modal uses <code className="mono">dialog</code> and Menu uses
          <code className="mono"> popover=&quot;auto&quot;</code>. Its colour is a real role,
          <code className="mono"> --ed-tooltip-surface</code>, which inverts with the theme: dark over the light
          product, light over the dark one. Both directions are measured.</p>
        </footer>
      </div>
    </div>
  );
}
