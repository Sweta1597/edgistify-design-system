import Link from 'next/link';

export const metadata = {
  title: 'Edgistify Design System',
};

export default function OverviewPage() {
  return (
    <article className="prose">
      <h1>Edgistify Design System</h1>
      <p className="lede">
        One visual language across the seller dashboard, the warehouse picker and the
        support docs. Every colour pairing here is measured rather than eyeballed, and
        every example on this site renders the component the products actually ship.
      </p>

      <div className="callout">
        <span className="callout__k">RULE 01</span>
        <p>
          <strong>Teal is the brand. Teal is not a status.</strong> It never means
          “success”, “done” or “in stock”. Success green sits just 39° away in hue —
          close enough to confuse when someone is scanning a pick list under a sodium
          lamp. Teal means <em>this is Edgistify</em>, and <em>this is the thing to click</em>.
        </p>
      </div>

      <h2>Start here</h2>
      <p>
        Install the package from its repo at a pinned tag, so an app upgrades when
        someone decides to rather than whenever <code>main</code> moves:
      </p>
      <pre className="example__code" style={{ borderRadius: 'var(--ed-radius-card)', border: '1px solid var(--ed-border)' }}>
        <code>{`"@edgistify/design-system": "github:Sweta1597/edgistify-design-system#v0.1.0"`}</code>
      </pre>
      <p>
        <Link href="/components/button">Button</Link> is the first component, and the one
        that proves the foundations work — it takes its colour, its type and its size from
        tokens, so warehouse mode costs it nothing.
      </p>

      <h2>Three modes, four states</h2>
      <p>
        Light is the product. Dark and warehouse are <strong>added</strong> modes, reached
        only by an attribute the app sets — never inherited from the operating system.
        They compose, so a night shift in a warehouse is a real fourth state.
      </p>
      <table>
        <thead>
          <tr><th>Attribute on <code>&lt;html&gt;</code></th><th>What you get</th></tr>
        </thead>
        <tbody>
          <tr><td><em>none</em></td><td>light — the default everywhere</td></tr>
          <tr><td><code>data-theme="dark"</code></td><td>dark</td></tr>
          <tr><td><code>data-mode="warehouse"</code></td><td>bigger targets, solid status blocks</td></tr>
          <tr><td>both</td><td>they compose</td></tr>
        </tbody>
      </table>
      <p>
        Use the controls at the top of any page to switch. They set exactly those
        attributes on this document — the same mechanism the apps use.
      </p>
    </article>
  );
}
