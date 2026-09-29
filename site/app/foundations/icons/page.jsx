import '@/styles/doc-shell.css';
import '@/styles/compare.css';
import { ScalingProof, SizeRamp } from '@/components/demos/IconFoundation';

export const metadata = {
  title: 'Icons',
  description: 'Icon size is a class, never a prop — so warehouse mode costs the icon nothing.',
};

const API = [
  ['size', 'IconSize', 'xs · sm · md · lg · xl. Maps to --ed-icon-* and its stroke step.'],
  ['label', 'string', 'Supply when the icon is the only thing carrying the meaning. Sets role="img".'],
  ['decorative', 'boolean', 'Explicitly scenery. Already the default; this documents intent.'],
  ['children', 'ReactNode', 'Any icon element. It is wrapped, not modified.'],
];

export default function IconsPage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Foundation 04</div>
          <h1>Icons</h1>
          <div className="lede"><strong>Icon size is a class, never a prop.</strong> A library&rsquo;s
          <code className="mono"> size</code> prop writes width and height at render time, so the icon cannot
          follow <code className="mono">[data-mode=&quot;warehouse&quot;]</code>. The apps have
          <strong> 280 hardcoded size props and zero uses of <code className="mono">--ed-icon-*</code></strong>,
          which is a live defect on every handheld.</div>
        </header>

        <section>
          <div className="sec-head"><h2>The defect, measured live</h2>
          <p className="sub">Two identical icons. The left is sized by a prop, the right by a class. Switch to
          Warehouse and watch which one moves — the numbers below are read from the rendered elements, not
          written into the page.</p></div>
          <ScalingProof />
        </section>

        <section>
          <div className="sec-head"><h2>The ramp</h2>
          <p className="sub">Five steps, each with a stroke weight that drops as the icon grows so the optical
          weight holds. Stay on these; a sixth size is a decision nobody will remember making.</p></div>
          <SizeRamp />
        </section>

        <section>
          <div className="sec-head"><h2>Usage</h2></div>
          <pre><code>{`import { Icon } from '@edgistify/design-system/react/Icon';
import { Package } from 'lucide-react';

// decorative — the label beside it carries the name
<Icon size="sm"><Package /></Icon>

// the icon IS the name
<Icon size="lg" label="Scan barcode"><ScanLine /></Icon>`}</code></pre>

          <div className="note">
            <span className="k">WHY IT WORKS</span>
            <p>The class beats the library&rsquo;s own <code className="mono">width</code> and
            <code className="mono"> height</code> because those are <em>presentation attributes</em>, which sit
            below author CSS in the cascade. So the icon inside does not need changing — only wrapping. A
            codemod can add the wrapper without touching a single icon import.</p>
          </div>

          <div className="note">
            <span className="k">NAMING</span>
            <p>An icon is decorative by default, because it almost always sits beside a label that already
            carries the name. Supply <code className="mono">label</code> only when the icon is alone — and then
            it becomes <code className="mono">role=&quot;img&quot;</code> rather than being hidden. An icon-only
            button needs its own <code className="mono">aria-label</code> either way; see Tooltip.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>API</h2></div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
              <tbody>
                {API.map(([p, t, n]) => (
                  <tr key={p}>
                    <td className="t"><code className="mono">{p}</code></td>
                    <td className="p"><code className="mono">{t}</code></td>
                    <td className="p">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <p>The set is <strong>lucide</strong>, 98 icons in use across 33 files — a decision already made in
          practice, written down here so a second library does not arrive beside it. Custom icons follow
          <code className="mono"> docs/icon-brief.md</code>: a 960 grid, an 800 live area, an 80-unit stroke,
          and two fill states sharing one silhouette.</p>
        </footer>
      </div>
    </div>
  );
}
