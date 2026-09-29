import '@/styles/doc-shell.css';
import '@/styles/compare.css';
import { IconGrid, OpticalProof, InContext } from '@/components/demos/IconCompare';

export const metadata = {
  title: 'Icons: lucide vs Material Symbols',
  description: 'A side-by-side against the real components, to judge a change rather than argue it.',
};

const TRADEOFFS = [
  ['Construction', 'Stroked, 2px, round caps', 'Filled — the property that defines Strava’s icon language'],
  ['Optical sizing', 'One 24px drawing, scaled to every size', 'Redrawn per size \u2014 weight and counters tuned, not detail dropped. All 12 tested differ'],
  ['Count', '1,854', '4,254'],
  ['Logistics vocabulary', 'forklift, warehouse, barcode, truck, route, weight — misses pallet, conveyor-belt, shelf, trolley', 'All of those present'],
  ['Licence', 'ISC', 'Apache 2.0'],
  ['Character', 'Light, neutral, unobtrusive', 'Heavier; recognisably Google unless restyled'],
  ['Migration', '—', '99 icons across 33 files, plus a 99-row name map'],
];

export default function ComparePage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Comparison</div>
          <h1>Icons: lucide vs Material Symbols</h1>
          <div className="lede">Strava&rsquo;s icon language is defined by two properties: every icon is
          <strong> filled</strong>, and each is <strong>redrawn for its size</strong> rather than scaled.
          lucide can do neither. This page renders both sets through the real Button, Badge and table so the
          change can be judged rather than argued.</div>
        </header>

        <div className="note">
          <span className="k">SOURCES</span>
          <p>Artwork fetched from <code className="mono">lucide-static@1.48.0</code> (ISC) and
          <code className="mono"> google/material-design-icons</code> (Apache 2.0), not redrawn. Nothing here is
          traced from Strava — their guidelines permit none of their marks, and only the two properties above
          are being compared. The mode toggle at the top works on this page: try <strong>Warehouse</strong>.</p>
        </div>

        <section>
          <div className="sec-head"><h2>The sets, at the sizes you actually use</h2>
          <p className="sub">212 of your icon uses are at 14px and 56 at 16px. That is where a 2px stroke on a
          24px grid has the least to work with — switch between the sizes below and watch which set survives
          the smallest one.</p></div>
          <IconGrid />
        </section>

        <section>
          <div className="sec-head"><h2>Optical sizing</h2>
          <p className="sub">Each icon below is shown twice at 64px — once from the drawing authored for
          20px, once from the one authored for 48px — and then both together at the 14px where they have to
          work. <strong>All twelve icons tested differ between the two drawings.</strong></p></div>

          <div className="note">
            <span className="k">MEASURED</span>
            <p>It is not a simplification, which is what I expected before counting. Across the twelve icons the
            20px drawings carry <strong>585 path nodes</strong> against the 48px drawings&rsquo; <strong>531</strong> —
            the small artwork is slightly <em>more</em> complex, not less. The optical-size axis adjusts stroke
            weight and the size of counters so the shape holds at its intended size. lucide has one drawing and
            no axis, so its column is the same artwork however small it gets.</p>
          </div>
          <OpticalProof />
        </section>

        <section>
          <div className="sec-head"><h2>In the real components</h2>
          <p className="sub">Not mockups — this is <code className="mono">.ed-btn</code>,
          <code className="mono"> .ed-badge</code> and a table row, taking their colour and size from the same
          tokens as the products.</p></div>
          <InContext />
        </section>

        <section>
          <div className="sec-head"><h2>Trade-offs</h2></div>
          <div className="table-scroll">
            <table>
              <thead><tr><th></th><th>lucide (current)</th><th>Material Symbols</th></tr></thead>
              <tbody>
                {TRADEOFFS.map(([k, a, b]) => (
                  <tr key={k}>
                    <td className="t">{k}</td>
                    <td className="p">{a}</td>
                    <td className="p">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <p><strong>Whichever set wins, the sizing bug is the thing to fix.</strong> Today there are
          280 hardcoded <code className="mono">size={'{N}'}</code> props and zero uses of
          <code className="mono"> --ed-icon-*</code>, so icons do not grow in warehouse mode while targets,
          type and chip padding all do. Switching icon libraries without fixing that buys nothing.</p>
        </footer>
      </div>
    </div>
  );
}
