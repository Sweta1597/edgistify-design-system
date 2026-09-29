import '@/styles/doc-shell.css';
import { Badge, BadgeGroup } from '@edgistify/design-system/react/Badge';
import { MigrationTable, FilterTags, BadgeExample } from '@/components/demos/BadgeDemo';

export const metadata = {
  title: 'Badge',
  description: 'Four statuses, a neutral and identity — replacing twelve hue families.',
};

const TONES = [
  ['neutral', 'No state at all: a count, a category, something switched off. Cancelled and Paused live here.'],
  ['info',    'In flight. Created, In Process, Picked, Packed — anything moving through the pipeline.'],
  ['success', 'Reached its destination. Dispatched, Delivered, Live, In stock.'],
  ['warning', 'Needs attention but nothing is broken yet. Pending, Assigned, Low stock.'],
  ['danger',  'Broken or reversed. Sync error, Returned, Failed.'],
  ['brand',   'Identity, never state. A plan name, an Edgistify-fulfilled order. See RULE 01.'],
];

const API = [
  ['tone', 'BadgeTone', 'neutral · info · success · warning · danger · brand. Default neutral.'],
  ['strong', 'boolean', 'Solid fill. Ranks one status above another of the same kind — not a second palette.'],
  ['outline', 'boolean', 'No fill, for a badge sitting on an already-tinted row.'],
  ['size', 'BadgeSize', 'sm · lg. Default inherits --ed-pad-chip-*, which warehouse mode already scales.'],
  ['dot', 'boolean', 'Leading dot for live/paused indicators. Always beside a label, never instead of one.'],
  ['count', 'boolean', 'Circular numeric badge for nav items and tabs.'],
  ['icon', 'ReactNode', 'Leading icon, sized by the badge.'],
  ['onRemove', '(e) => void', 'Turns the badge into a removable tag with a real <button> and a generated name.'],
  ['as', 'ElementType', 'Render as another element.'],
];

export default function BadgePage() {
  return (
    <div className="doc">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Component 07</div>
          <h1>Badge</h1>
          <div className="lede">A short label for a state: an order status, a sync state, a count.
          Replaces <strong>140 status-colour class strings across 30 files</strong>, which between
          them reach for <strong>twelve</strong> different hue families — slate, emerald, amber, rose,
          blue, violet, orange, purple, green, sky, indigo and brand — where this system defines four
          statuses and a neutral.</div>
        </header>

        <section>
          <div className="sec-head"><h2>Six tones</h2>
          <p className="sub">The space foundation reserved this component before it existed:
          <code className="mono">--ed-pad-chip-x</code> is commented <em>“badge, pill, status”</em>, and the
          contrast checker has been measuring <code className="mono">--ed-success-on-surface</code> against
          <code className="mono"> --ed-success-surface</code> under the name <em>“success chip”</em> all along.
          Badge is mostly packaging.</p></div>
          <div className="vgrid">
            {TONES.map(([tone, desc]) => (
              <div className="vcell" key={tone}>
                <div className="vn">{tone}</div>
                <div className="vd">{desc}</div>
                <Badge tone={tone}>{tone === 'brand' ? 'Edgistify fulfilled' : tone}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Rank, not more hues</h2>
          <p className="sub">Three of the four status maps in the dashboard invented extra hues, and they
          invented them for two reasons. <strong>Delivered</strong> needed to outrank <strong>Dispatched</strong>,
          so it took a darker emerald. <strong>Picked</strong>, <strong>Packed</strong> and <strong>Assembly</strong>{' '}
          are workflow stages rather than statuses, so they took indigo and violet.</p></div>

          <div className="note">
            <span className="k">WHY</span>
            <p>Neither needs a new colour. Rank is what <code className="mono">strong</code> is for.
            A stage is a different <em>word</em> — adding a hue per stage means a picker has to memorise
            a palette to read a pick list, under a sodium lamp, through a scanner screen.</p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--ed-gap-group)', flexWrap: 'wrap', margin: 'var(--ed-space-5) 0' }}>
            <BadgeGroup>
              <Badge tone="success">Dispatched</Badge>
              <Badge tone="success" strong>Delivered</Badge>
            </BadgeGroup>
            <BadgeGroup>
              <Badge tone="info">Picked</Badge>
              <Badge tone="info" strong>Packed</Badge>
            </BadgeGroup>
          </div>

          <MigrationTable />
        </section>

        <section>
          <div className="sec-head"><h2>Warehouse mode is free, twice</h2>
          <p className="sub">Flip the toggle above to <strong>Warehouse</strong>. The chip padding grows
          from 10/4 to 12/6 because it reads <code className="mono">--ed-pad-chip-*</code>, and every status
          tint turns into a solid block because <code className="mono">--ed-success-surface</code> and its
          siblings are redefined for that mode. Badge asks for neither.</p></div>
          <BadgeGroup>
            <Badge tone="neutral">Cancelled</Badge>
            <Badge tone="info">In process</Badge>
            <Badge tone="success">Dispatched</Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="danger">Returned</Badge>
          </BadgeGroup>

          <div className="note">
            <span className="k">EXCEPT</span>
            <p>Badge does carry <em>one</em> warehouse rule, and it exists because building this page
            exposed a hole. If the plain tint is already a solid block, then <code className="mono">strong</code>
            lands on the identical colour and rank silently disappears — the exact distinction
            Delivered/Dispatched and Packed/Picked depend on. In warehouse mode it steps to the deep end
            of the ramp instead. The contrast suite could not have caught this: both states passed, because
            nothing was comparing them to each other.</p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--ed-gap-group)', flexWrap: 'wrap', marginTop: 'var(--ed-space-5)' }}>
            <BadgeGroup>
              <Badge tone="success">Dispatched</Badge>
              <Badge tone="success" strong>Delivered</Badge>
            </BadgeGroup>
            <BadgeGroup>
              <Badge tone="info">Picked</Badge>
              <Badge tone="info" strong>Packed</Badge>
            </BadgeGroup>
          </div>
        </section>

        <section>
          <div className="sec-head"><h2>Dots, counts and outlines</h2>
          <p className="sub">A dot reads faster than the word does — but colour is never the message on its
          own, so the dot always travels with a label. Use <code className="mono">outline</code> for a badge
          sitting on a row that is already tinted, where a second tint stacks into mud.</p></div>
          <BadgeExample />
        </section>

        <section>
          <div className="sec-head"><h2>Removable, when it is a filter</h2>
          <p className="sub">The only interactive badge. Supplying <code className="mono">onRemove</code> adds a
          real <code className="mono">button</code> carrying its own name — <em>“Remove Pending”</em> — so it is
          reachable by keyboard, and its hit area expands to <code className="mono">--ed-target-min</code> without
          moving a visible pixel. In warehouse mode that is 44px around a 14px glyph. Tab into these and press
          Enter.</p></div>
          <FilterTags />
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
          <p><strong>RULE 01 applies here.</strong> There is a <code className="mono">brand</code> tone and it is
          never a status. It marks something as ours — a plan name, an Edgistify-fulfilled order. It must never
          mean “done”, “ok” or “in stock”. Success green sits 39° away in hue, which is close enough to confuse
          under a sodium lamp.</p>
        </footer>
      </div>
    </div>
  );
}
