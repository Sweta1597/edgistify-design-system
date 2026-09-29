import Link from 'next/link';

export const metadata = {
  title: 'Marketing',
  description: 'The brand and marketing layer: the public website, landing pages and campaign pages, on the same system.',
};

export default function MarketingOverviewPage() {
  return (
    <article className="prose">
      <h1>Marketing</h1>
      <p className="lede">
        The brand and marketing layer of the design system: the public website, landing
        pages, campaign pages — everything the marketing team ships to people who are not
        logged in. Same tokens, same fonts, same rule about teal, tuned for a page read at
        arm's length on a phone rather than a dashboard read at a desk.
      </p>

      <div className="callout">
        <span className="callout__k">WHO</span>
        <p>
          <strong>This section is for the marketing team.</strong> Nothing in it needs a
          build step to understand: every component on the <Link href="/marketing/components">gallery</Link> is
          live, its code is beside it, and the <Link href="/marketing/landing-page">landing-page recipe</Link> says
          which one goes where. If a page needs something that is not here, that is a gap in
          the system — ask for the component rather than styling around it.
        </p>
      </div>

      <h2>A scope, not a mode</h2>
      <p>
        Wrap a page in <code>.ed-mk</code> and three things happen. The type scale steps up
        to reading sizes — 16px body, not 14. Controls grow to touch sizes — a 44px button,
        not 32. And a small set of marketing-only tokens becomes available: fluid display
        type, section rhythm, container widths and the dark band.
      </p>
      <p>
        Every product component still works inside the scope, because it reads the same
        tokens the scope re-tunes. One <code>Button.jsx</code> serves a warehouse scanner at
        56px and a landing page at 44px; there is no second button.
      </p>
      <table>
        <thead><tr><th>Token</th><th>Product</th><th>Inside <code>.ed-mk</code></th></tr></thead>
        <tbody>
          <tr><td><code>--ed-text-base</code></td><td>14px</td><td>16px</td></tr>
          <tr><td><code>--ed-control-md</code></td><td>32px</td><td>44px</td></tr>
          <tr><td><code>--ed-radius-control</code></td><td>6px</td><td>8px</td></tr>
          <tr><td><code>--ed-mk-text-display</code></td><td>—</td><td>36 → 56px, fluid</td></tr>
          <tr><td><code>--ed-mk-section</code></td><td>—</td><td>56 → 112px, fluid</td></tr>
          <tr><td><code>--ed-mk-band-surface</code></td><td>—</td><td>ink, in both themes</td></tr>
        </tbody>
      </table>

      <h2>Three rules for marketing pages</h2>
      <div className="callout">
        <span className="callout__k">RULE 01</span>
        <p><strong>Teal is the brand. Teal is not a status.</strong> On a marketing page it appears
        in exactly three places at rest: the wordmark's dot, one brand button, and the accent on
        the dark band. Everything else is ink and white — which is what makes the teal visible.</p>
      </div>
      <div className="callout">
        <span className="callout__k">RULE 04</span>
        <p><strong>One brand button per viewport.</strong> <code>variant="brand"</code> on the hero
        action only. Every other call to action is <code>primary</code> — ink. A page that scrolls
        is several screens, and each one gets at most one.</p>
      </div>
      <div className="callout">
        <span className="callout__k">RULE 05</span>
        <p><strong>No placeholder facts.</strong> A number, a logo or a city that is not verified
        renders through <code>&lt;Pending&gt;</code> — a dashed slot — never as an invented figure.
        The current site says 75+ warehouses in one place and 100+ in another, 50+ customers
        here and 80+ there. Buyers cross-check. So do AI engines. This is the mechanism that
        stops the next site doing the same: the website hides pending slots in production, the
        docs keep them visible so the gap is seen.</p>
      </div>

      <h2>Start here</h2>
      <pre className="example__code" style={{ borderRadius: 'var(--ed-radius-card)', border: '1px solid var(--ed-border)' }}>
        <code>{`@import "@edgistify/design-system/marketing.css";   /* after the four foundations */

import { Section, SectionHead, Tile } from '@edgistify/design-system/react/marketing';
import { SiteHeader } from '@edgistify/design-system/react/marketing/Header';

<div className="ed-mk">…</div>`}</code>
      </pre>
      <ul>
        <li><Link href="/marketing/brand">Brand</Link> — wordmark, colour, type, voice, claims.</li>
        <li><Link href="/marketing/components">Components</Link> — every block, live, with its code.</li>
        <li><Link href="/marketing/landing-page">Landing page recipe</Link> — the homepage, section by section, with what each one still needs.</li>
      </ul>

      <h2>What the system cannot supply</h2>
      <p>
        The components are done; the facts are not. Before the new homepage can launch, five
        things have to come from the business, not from the design system:
      </p>
      <table>
        <thead><tr><th>Gap</th><th>Where it lands</th><th>Owner</th></tr></thead>
        <tbody>
          <tr><td>One verified set of stats — brands, cities, warehouses, sq ft, orders/day, pin codes, integrations</td><td>Trust strip, FAQ, service cards</td><td>Ops + finance</td></tr>
          <tr><td>City list with a warehouse count per city</td><td>Network section</td><td>Ops</td></tr>
          <tr><td>Logo permissions, eight or more, in writing</td><td>Trust strip</td><td>Account managers</td></tr>
          <tr><td>Press links for ET, DataQuest, Express Computer</td><td>Trust strip</td><td>Marketing</td></tr>
          <tr><td>DPDP consent notice, privacy notice, grievance contact, WhatsApp opt-in copy</td><td>Every form, footer</td><td>Legal</td></tr>
        </tbody>
      </table>
    </article>
  );
}
