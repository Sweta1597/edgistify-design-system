import '@/styles/modal.css';
import { ModalGallery } from '@/components/demos/ModalGallery';
import { ModalDemo } from '@/components/demos/ModalDemo';

export const metadata = {
  title: 'Modal',
  description: 'A native <dialog>, so the focus trap and the top layer come from the browser.',
};

const PLAT = [
  ['platform', 'Focus trap', 'Tab cycles inside the dialog. Everything behind is inert, not merely covered.'],
  ['platform', 'Escape closes', 'Free. One handler exists in the whole dashboard today.'],
  ['platform', 'Top layer', 'Renders above everything, so no z-index can fight it.'],
  ['platform', 'Focus return', 'Goes back to the control that opened the dialog.'],
  ['platform', 'aria-modal', 'Implicit. Screen readers stop reading the page behind.'],
  ['us', 'Scroll lock', 'The one thing the platform does not do. Compensates for the scrollbar so nothing shifts.'],
  ['us', 'Nesting-safe', 'A shared counter, so closing an inner dialog does not unlock the page.'],
  ['us', 'Warehouse shape', 'A centred dialog becomes a bottom sheet with stacked actions.'],
];

export default function ModalPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Component 05</div>
          <h1>Modal</h1>
          <p className="lede">The dashboard has nine modals built from <code className="mono">fixed inset-0</code>.
          Between them: <strong>zero <code className="mono">role="dialog"</code>, zero
          <code className="mono"> aria-modal</code>, one Escape handler, no focus management and no scroll
          lock.</strong> A keyboard user who opens one is stranded.</p>
        </header>

        <section>
          <div className="sec-head"><h2>Built on the platform</h2>
          <p className="sub">This is a native <code className="mono">&lt;dialog&gt;</code> opened with
          <code className="mono"> showModal()</code>. Most of what was missing is not something we implement —
          it is something the browser already does correctly once you ask for a dialog instead of a
          positioned div.</p></div>
          <div className="plat" id="plat">
            {PLAT.map(([who, n, d]) => (
              <div className="pl" key={n}>
                <span className={`b ${who === 'us' ? 'us' : ''}`}>
                  {who === 'us' ? 'this component' : 'the browser'}
                </span>
                <div className="n">{n}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
          <div className="note">
            <span className="k">RULE 10</span>
            
            <div><p><strong>Open one and press Tab repeatedly.</strong> Focus cycles inside the dialog and
            cannot reach the page behind — not because it is hidden, but because the browser makes
            everything outside the top layer genuinely inert. Escape closes. Focus returns to the button
            that opened it.</p>
            <p>None of that is our code. Hand-rolling a focus trap is a well-known way to get it subtly
            wrong; the correct move is to stop hand-rolling it.</p></div>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Try them</h2>
          <p className="sub">Switch to Warehouse at the top of the page and open any of the first four — a
          centred dialog is the wrong shape on a handheld, so it becomes a bottom sheet with stacked
          full-width actions within thumb reach. The markup does not change.</p></div>

          <ModalGallery />

          <div className="note">
            <span className="k">RULE 11</span>
            <p><strong>A destructive confirmation ignores the backdrop and Escape.</strong> Every other
            dialog closes on both. An <code className="mono">alert</code> dialog does not, because a misplaced
            click or a stray keystroke should never be able to resolve a decision about deleting
            something. It also takes <code className="mono">role="alertdialog"</code>, which tells a screen
            reader this is a decision rather than a panel.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>API</h2>
          <p className="sub">Live and editable — this is the component the package ships.</p></div>
          <ModalDemo code={`
function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Split order</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="lg" ruled
             title="Split order" subtitle="ORD-880241 · 4 lines">
        <ModalBody>
          <Field label="Warehouse">
            <Select>
              <option>BLR-01 Bommanahalli</option>
              <option>DEL-02 Bhiwandi</option>
            </Select>
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Split into 2 shipments</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
render(<Demo />);
`} />
        </section>

        <footer>
          <p>Contrast now covers <strong>296 pairings</strong>. Two failed on the first run, both in dark
          and both against <code className="mono">--ed-surface-raised</code> — which is <em>lighter</em> than
          the base surface in dark, so muted text and strong borders tuned against the darker one fell
          short on a modal. Dark <code className="mono">--ed-text-muted</code> and
          <code className="mono"> --ed-border-strong</code> each moved one step.</p>
          <p style={{ marginTop: 10 }}>Next: the dropdown family — menu, single select, multi select and
          nested select.</p>
        </footer>
      </div>
    </div>
  );
}
