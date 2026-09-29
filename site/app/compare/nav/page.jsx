import '@/styles/doc-shell.css';
import '@/styles/compare.css';
import { NavDemo, NavToday } from '@/components/demos/NavDemo';
import { PanelCompare, DuoSizes } from '@/components/demos/DuoDemo';

export const metadata = {
  title: 'Nav: white filled on a neutral panel',
  description: "Selection is a white filled icon on a neutral panel; the icon's teal accent carries the brand."
};

const MEASURED = [
  ['Unselected item', 'white on neutral-950', '15.02:1', 'white @ 70% → 3.12:1'],
  ['Group label, sub-item', 'neutral-200', '9.80:1', 'white @ 70% → 3.12:1'],
  ['Selected item', 'white on the neutral-800 panel', '9.24:1', 'teal-500 → 1.55:1'],
  ['Item hovered', 'white on neutral-900', '12.20:1', '—'],
  ['Focus ring', 'teal-300', '8.11:1', 'inherited teal-600 → 2.52:1'],
  ['Panel against the ground', 'neutral-800 on neutral-950', '1.55:1', 'supporting signal only'],
  ['Icon accent, selected', 'teal-400 on neutral-800', '3.89:1', '—'],
];

export default function NavComparePage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Decision</div>
          <h1>Nav: white filled, neutral panel</h1>
          <div className="lede">Selection is a <strong>white filled icon on a neutral panel</strong>, with the
          icon&rsquo;s <strong>teal accent</strong> carrying the brand. The panel is neutral on purpose: a
          brand-coloured panel cannot host a brand-coloured accent, so making the panel teal would have cost
          the accent its saturation.</div>
        </header>

        <section>
          <div className="sec-head"><h2>Both, side by side</h2>
          <p className="sub">Click through either one. Left is what the dashboard ships today; right is the
          same nine items on <code className="mono">--ed-nav-surface</code>. The mode toggle above works on
          both.</p></div>

          <div className="nav-pair">
            <figure>
              <NavToday />
              <figcaption>today — teal-600 ground, white @ 70%</figcaption>
            </figure>
            <figure>
              <NavDemo />
              <figcaption>proposed — white filled on a neutral panel, teal accent</figcaption>
            </figure>
          </div>

          <div className="note">
            <span className="k">GROUND</span>
            <p>Both the ground and the selected panel are <strong>neutral</strong>. That is what lets the
            brand live in the icon accent, where it reads at <strong>3.89:1</strong> — on a teal panel the same
            accent drops to 2.93:1 and has to step back to a pale tint. Neutral also buys contrast: white sits
            at <strong>15.02:1</strong> against 11.86:1 on teal-900.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>A light variant</h2>
          <p className="sub">The same component with light chrome, for a product that does not want a dark
          rail. Only the palette changes — every rule reads the roles, so nothing is restated.</p></div>

          <div className="nav-pair">
            <figure>
              <NavDemo minHeight={480} />
              <figcaption>dark — neutral-950 ground</figcaption>
            </figure>
            <figure>
              <NavDemo light minHeight={480} />
              <figcaption>light — white ground, neutral-200 panel</figcaption>
            </figure>
          </div>

          <div className="note">
            <span className="k">THE PANEL LIFTS</span>
            
            <div><p>The two variants move the panel in <strong>opposite directions</strong>. On dark the panel
            lifts — neutral-800 on neutral-950. On light it <strong>darkens</strong> — neutral-200 on white.
            That is not symmetry for its own sake: on light chrome a lift barely registers, and white on
            neutral-100 separates at only <strong>1.26:1</strong>. Going the other way reaches
            <strong>1.53:1</strong>, which is where the dark variant sits (1.63:1).</p>
            <p>Hover sits <em>between</em> the ground and the panel, so hovering a selected row deepens it
            rather than erasing it.</p></div>
          </div>

          <div className="table-scroll">
            <table>
              <thead><tr><th>Role</th><th>Dark variant</th><th>Light variant</th></tr></thead>
              <tbody>
                <tr><td className="t">Ground</td><td className="p">neutral-950</td><td className="p">white</td></tr>
                <tr><td className="t">Unselected</td><td className="p">white — 15.02:1</td><td className="p">neutral-950 — 15.02:1</td></tr>
                <tr><td className="t">Group label</td><td className="p">neutral-200 — 9.80:1</td><td className="p">neutral-700 — 6.80:1</td></tr>
                <tr><td className="t">Hover</td><td className="p">neutral-900 — 12.20:1</td><td className="p">neutral-50 — 13.42:1</td></tr>
                <tr><td className="t">Selected panel</td><td className="p">neutral-800 — 9.24:1</td><td className="p">neutral-200 — 9.80:1</td></tr>
                <tr><td className="t">Icon accent, selected</td><td className="p">teal-400 — 3.89:1</td><td className="p">teal-600 — 3.07:1</td></tr>
                <tr><td className="t">Focus ring</td><td className="p">white — 15.02:1</td><td className="p">ink — 18.54:1</td></tr>
              </tbody>
            </table>
          </div>

          <div className="nav-pair" style={{ marginTop: 'var(--ed-space-6)' }}>
            <figure>
              <NavDemo soft minHeight={520} />
              <figcaption>soft — grey rail, white pill, 20px icons</figcaption>
            </figure>
            <figure style={{ gridColumn: 'span 2' }}>
              <div className="note" style={{ marginTop: 0 }}>
                <span className="k">THE PILL</span>
                <p>White on neutral-100 is <strong>1.26:1</strong> — far too little to read as a state on
                contrast alone. The pill carries <code className="mono">elevation-1</code> instead, and the
                shadow supplies the edge the value cannot. This is the one place in the system where a state
                leans on a shadow, and it is deliberate: the alternative is a darker pill, which this variant
                exists not to have.</p>
              </div>
              <div className="note">
                <span className="k">STRUCTURE</span>
                <p>Items lose their caret and the <strong>group</strong> gains one — but the group&rsquo;s caret is
                <strong>not a control</strong>. It is the affordance for a popup that has not been built:
                <code className="mono">aria-hidden</code>, no handler, and it does not rotate, because rotation
                would imply an open/closed state there is none of. Only one parent is expanded at a time. Rows are packed tight inside a group and
                separated by a large gap between groups — that contrast is the grouping, which is why there
                are no dividers.</p>
              </div>
            </figure>
          </div>

          <div className="note">
            <span className="k">THE RING IS NEUTRAL</span>
            
            <div><p>Both variants had the same collision and neither showed it until the two were measured against
            each other: a teal focus ring around a teal icon accent. On dark, teal-300 against teal-400
            separated at <strong>1.28:1</strong>; on light, the ring and the accent were the
            <em>same value</em>. A focused selected item lost its accent into its own outline.</p>
            <p>So the ring is neutral in both — <strong>white</strong> on dark, <strong>ink</strong> on light.
            Two brand colours from one ramp will never separate well; one of them had to stop being teal, and
            the accent is the one carrying meaning. Two new pairings guard it, and they measure separation
            rather than legibility — the only pairs in the suite that do.</p></div>
          </div>
          <div className="note">
            <span className="k">IN DARK MODE</span>
            <p>The light variant does not stay light. A bright rail beside a dark page is glare, not contrast,
            so under <code className="mono">[data-theme=&quot;dark&quot;]</code> it steps back to dark chrome
            — a lighter one than the default, so the two variants stay distinguishable. Flip the toggle
            above to see it.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Spacing and structure</h2>
          <p className="sub">Rows are 48px — a 24px icon, which is what the space foundation already nominates
          for nav, plus 12px of block padding. Separation is space, not rules: a divider every 48px turns a nav
          into a table. Children indent to sit under the parent&rsquo;s <em>label</em> rather than its icon,
          because that alignment is what says they belong to it, and they carry no icons of their own — a
          second column of icons at that depth reads as a second nav.</p></div>

          <div className="nav-pair">
            <figure style={{ maxWidth: 108 }}>
              <NavDemo soft collapsed minHeight={460} />
              <figcaption>collapsed — a labelled rail</figcaption>
            </figure>
            <figure style={{ gridColumn: 'span 2' }}>
              <div className="note" style={{ marginTop: 0 }}>
                <span className="k">COUNTS</span>
                <p>Removed. A number beside every other item turns the nav into a dashboard, and the counts
                were competing with the one thing the nav has to say — which section you are in. If a count
                genuinely has to live here, it belongs on one item, not six, and it should be a dot rather
                than a number: at a glance nobody reads &ldquo;42&rdquo;, they read &ldquo;something.&rdquo;</p>
              </div>
            </figure>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Why the ground had to move</h2>
          <p className="sub">The sidebar ships <code className="mono">bg-edg-primary</code>, which is teal-600.
          Teal cannot mark anything on a teal ground — and the unselected state is already failing.</p></div>

          <div className="table-scroll">
            <table>
              <thead><tr><th>Role</th><th>Token</th><th>Now</th><th>Today</th></tr></thead>
              <tbody>
                {MEASURED.map(([role, tok, now, was]) => (
                  <tr key={role}>
                    <td className="t">{role}</td>
                    <td className="p"><code className="mono">{tok}</code></td>
                    <td className="p">{now}</td>
                    <td className="p">{was}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="note">
            <span className="k">LIVE BUG</span>
            <p>The unselected state in the shipped dashboard is <code className="mono">text-white/70</code>,
            which measures <strong>3.12:1</strong> — below the 4.5:1 a label needs, though it does clear the 3:1
            for an icon. Six further uses at 60% opacity and below fail both. It is on the primary navigation of the product today. On a teal-600 ground there is
            no fix available through opacity — white at full strength is only 4.71:1, so every reduction from
            there fails. <strong>State cannot be an alpha on that surface.</strong></p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Which signal is doing the work</h2></div>
          <div className="note">
            <span className="k">THE PANEL</span>
            <p>At <strong>1.55:1</strong> against the ground, the highlight is far below the 3:1 that a state
            indicator needs to stand on its own — and that is not a defect to fix, it is what &ldquo;slight&rdquo;
            means. A panel loud enough to pass would be a block of colour, and the nav would shout. So the panel
            is the <em>findability</em> signal and the <strong>filled icon plus the heavier label</strong> are
            the accessible ones.</p>
          </div>
          <div className="note">
            <span className="k">FILL</span>
            
            <div><p>Unselected rows are <strong>stroked and monochrome</strong>; the teal appears only on the
            filled, selected one. So the accent means <em>this is where you are</em> rather than being
            decoration every row carries at once. Both states draw the same two paths, so the roof and the
            awning are still there when outlined — only the treatment changes.</p>
            <p>Fill is not always available, though. In Material Symbols
            <code className="mono"> apartment</code> and <code className="mono">bar_chart</code> are
            <strong> byte-identical</strong> across the FILL axis — already solid geometry, so the axis does
            nothing. On icons like those the weight and the panel are all there is, which is the argument for
            keeping the label weight change rather than treating it as decoration.</p></div>
          </div>
          <div className="note">
            <span className="k">THE TRAIL</span>
            <p>A parent holding the current page stays selected too, so the path from section to page is
            unbroken — and still visible when the group is collapsed. It carries
            <code className="mono"> data-within</code> rather than a second
            <code className="mono"> aria-current</code>: that attribute names <em>one</em> thing, the page you
            are actually on, and a screen reader announcing two current items is worse than announcing none.</p>
          </div>
          <div className="note">
            <span className="k">SUB-ITEMS</span>
            <p>A sub-item has no icon to fill, so the dot is its filled state — in the accent teal, because it stands in for the fill the item cannot have. It sits in the gutter the
            parent&rsquo;s icon occupies, so the left column still lines up and the indent still reads as
            &ldquo;these belong to that&rdquo;.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Two-colour icons, and which panel they need</h2>
          <p className="sub">Four icons drawn to <code className="mono">docs/icon-brief.md</code> — 960 grid,
          80-unit stroke, a white body and one teal accent on a separate path. Click through both panels.
          Same icons, same accent role; only the surface underneath changes.</p></div>

          <PanelCompare />

          <div className="note">
            <span className="k">THE TRADE</span>
            <p>Full-strength brand teal measures <strong>2.93:1</strong> on the teal-800 panel and
            <strong> 3.04:1</strong> on neutral-800 — either side of the 3:1 a meaningful graphic part needs.
            So on a teal panel the accent has to step back to a pale tint and stops reading as brand; on a
            neutral panel it stays brand teal. That is the whole decision, and it is why the reference uses a
            slate panel with a saturated accent rather than a brand-coloured one.</p>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>The accent has to survive 14px</h2>
          <p className="sub">Light and dark, at every size the products use. The accent role changes value
          between the two rows; the artwork does not.</p></div>
          <DuoSizes />
          <div className="note">
            <span className="k">RULE</span>
            <p>The accent is never load-bearing. Convert any of these to one colour and it still reads —
            a roof is still a roof. That is the test the brief asks for, and it is why the accent is allowed
            to be quiet.</p>
          </div>
        </section>

        <footer>
          <p>Every nav role and the icon accent are in the contrast suite, measured in all four modes —
          <strong> 364 pairings, up from 324</strong>. The tightest is selected-and-hovered at 4.80:1 in Desk
          and Warehouse, which passes with little room; if the hover ever darkens further, that pair is the one
          that will catch it.</p>
        </footer>
      </div>
    </div>
  );
}
