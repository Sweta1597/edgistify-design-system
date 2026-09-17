import { type } from '@/lib/tokens';

export const metadata = {
  title: 'Type',
  description: 'Inter for the interface, JetBrains Mono for anything you might read aloud.',
};

const SAMPLE = {
  '5xl': 'Seller Command Centre',
  '4xl': 'Seller Command Centre',
  '3xl': 'Orders awaiting dispatch',
  '2xl': 'Orders awaiting dispatch',
  xl:    'Batch allocation rules',
  lg:    'Minimum shelf life at dispatch',
  base:  'Each split becomes a separate sub-order with its own picking wave.',
  md:    'Each split becomes a separate sub-order with its own picking wave.',
  sm:    'Updated 4 minutes ago by Divya K',
  xs:    'Updated 4 minutes ago by Divya K',
  '2xs': 'IN SCOPE · NOT READY FOR DISPATCH',
};

export default function TypePage() {
  const sizes = Object.entries(type.size).reverse();

  return (
    <article className="prose">
      <h1>Type</h1>
      <div className="lede">
        Two faces doing two jobs. Inter carries the interface. JetBrains Mono carries
        anything somebody might read aloud, type into a scanner, or check against a label
        on a carton.
      </div>

      <dl className="meta">
        <div><dt>Interface</dt><dd>Inter Variable</dd></div>
        <div><dt>Identifiers</dt><dd>JetBrains Mono</dd></div>
        <div><dt>Steps</dt><dd>{Object.keys(type.size).length}</dd></div>
        <div><dt>Warehouse floor</dt><dd>{type.sizeWarehouse['2xs']}px</dd></div>
      </dl>

      <h2>Why identifiers get their own face</h2>
      <p>
        A SKU is not prose. <code>SKU-4417-BLK-M</code> gets read character by character,
        often out loud, often by someone holding a scanner in the other hand. In a
        proportional face, <strong>0 and O</strong> and <strong>1 and l</strong> are a
        genuine hazard; in a mono face they are drawn to be told apart, and the fixed
        advance makes a column of them scannable.
      </p>
      <p>
        So the rule is not decorative. <strong>If a human might have to repeat it, set it
        in the identifier face:</strong> SKUs, order IDs, AWBs, bin locations, pincodes,
        batch codes. Everything else is Inter.
      </p>

      <div className="example">
        <div className="example__preview" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--ed-space-3)' }}>
          <span className="ed-id-lg">SKU-4417-BLK-M</span>
          <span className="ed-id-strong">ORD-880241</span>
          <span className="ed-id">BIN A-12-03 · 560068</span>
        </div>
      </div>

      <h2>The scale</h2>
      <p>
        Eleven steps. <code>base</code> is body copy and the one to reach for;{' '}
        <code>md</code> and <code>sm</code> carry dense table and form text.
        Warehouse mode raises every step — the floor goes from{' '}
        {type.size['2xs']}px to {type.sizeWarehouse['2xs']}px — because the smallest
        readable size at a desk is not the smallest readable size at arm's length under
        a moving forklift.
      </p>

      {sizes.map(([name, px]) => (
        <div className="scale-row" key={name}>
          <span className="scale-row__name">--ed-text-{name}</span>
          <span className="scale-row__size">
            {px}<span style={{ color: 'var(--ed-text-disabled)' }}> / {type.sizeWarehouse[name]}</span>
          </span>
          <span className="scale-row__sample"
                style={{ fontSize: `${px}px`, lineHeight: 1.3,
                         fontWeight: px >= 24 ? 700 : px >= 18 ? 600 : 400,
                         letterSpacing: px >= 24 ? '-0.02em' : undefined }}>
            {SAMPLE[name] ?? 'The quick brown fox'}
          </span>
        </div>
      ))}
      <p style={{ marginTop: 'var(--ed-space-3)' }}>
        The second figure in each row is the warehouse size. Nothing in the markup
        changes between them — switch <strong>Warehouse</strong> above and the whole page
        moves up a step.
      </p>

      <h2>Weights</h2>
      <p>
        Four weights, and warehouse mode shifts regular from{' '}
        {type.weight?.regular ?? 400} to {type.weight?.medium ?? 500}: thin strokes are
        the first thing to disappear under glare.
      </p>
      <table>
        <thead><tr><th>Token</th><th>Value</th><th>Use it for</th></tr></thead>
        <tbody>
          <tr><td><code>--ed-weight-regular</code></td><td>{type.weight?.regular ?? 400}</td><td>Body copy, table cells</td></tr>
          <tr><td><code>--ed-weight-medium</code></td><td>{type.weight?.medium ?? 500}</td><td>Labels, buttons, emphasis in a row</td></tr>
          <tr><td><code>--ed-weight-semibold</code></td><td>{type.weight?.semibold ?? 600}</td><td>Headings, the number in a stat</td></tr>
          <tr><td><code>--ed-weight-bold</code></td><td>{type.weight?.bold ?? 700}</td><td>Page titles, the identifier just scanned</td></tr>
        </tbody>
      </table>

      <h2>Self-host the fonts</h2>
      <p>
        Both faces ship as npm packages and are imported in the app entry, never from a
        CDN. Warehouse wifi is not a good place to discover a third-party dependency, and
        a picker staring at a fallback face is a picker misreading a SKU.
      </p>
    </article>
  );
}
