import Link from 'next/link';

export const metadata = {
  title: 'Landing page recipe',
  description: 'The homepage, section by section: which component, which content, and what is still pending.',
};

const SECTIONS = [
  ['0', 'Announcement bar', 'Announcement', 'One line, one link: the newsletter for now; a report, an event or an offer later. Partners, Careers and Client login moved to the footer and the three doors.', 'built'],
  ['1', 'Header', 'SiteHeader', 'Services and Solutions mega-menus (by stage, by industry, by channel), About, Resources, Support, one CTA.', 'built'],
  ['2', 'Hero', 'Hero + ConfigPanel + Flow', 'Headline, lede, the two-question configurator, primary and WhatsApp actions; a still of the EdgeOS flow on the right.', 'built'],
  ['3', 'Trust strip', 'LogoStrip + StatStrip + Press', 'Up to 8 logos, 3 verified stats, "Featured in" with real links.', 'pending: logos, stats, press links'],
  ['4', 'Services — the stack', 'ServiceStack + ServiceCard + Platform', 'Five cards, 3+2, on the EdgeOS band with the EdgeAPEX strip. Configurator answers tag the matching cards.', 'built; metric slots pending'],
  ['5', 'Watch one order move', 'Flow (animate)', 'The full sequence, stepped in by CSS. Out of the hero to protect LCP.', 'built'],
  ['6', 'Why brands switch', 'Grid + Tile', 'Three pain points, each linking to the service that fixes it.', 'built'],
  ['7', 'Why Edgistify', 'LoopDiagram + Definition', '"Software detects. Operators prevent. We are both." Open loop vs closed loop, then the definition block AI engines quote.', 'built'],
  ['8', 'Solutions router', 'Grid + Tile + Chips', 'Three stage cards and eight industry chips. Missing from the earlier draft even though it was in the nav.', 'built'],
  ['9', 'Results', 'ResultCard + VideoPlaceholder', 'Three anonymised case studies with before/after numbers; founder video with transcript.', 'pending: numbers, video'],
  ['10', 'Network', 'Network', 'A map for people and a text list of cities for crawlers.', 'pending: city list'],
  ['11', 'Getting started', 'Steps + PricingCard + PricingRule', 'Diagnose → Design → Transition → Operate; three pricing models; "no hidden margins".', 'built; durations pending'],
  ['12', 'FAQ', 'Faq', 'Five buyer questions, visible in the HTML, native <details>.', 'built'],
  ['13', 'Final CTA', 'Section tone="band" + CtaBand', '"Stop buying warehousing. Start engineering your supply chain." Diagnostic, WhatsApp, Open Floor.', 'built'],
  ['14', 'Three doors', 'Doors', "I'm a brand / I own a warehouse or run a fleet / I want to work here.", 'built'],
  ['15', 'Footer', 'Footer', 'Columns, legal name, Thane West address, phone, privacy, grievance contact, cookie settings.', 'built; grievance contact pending'],
];

export default function LandingRecipePage() {
  return (
    <article className="prose">
      <h1>Landing page recipe</h1>
      <p className="lede">
        The homepage of the new website, section by section. The order comes from the
        content brief; the components come from the <Link href="/marketing/components">gallery</Link>.
        The site itself lives in <code>edgistify-website</code> and runs at <code>localhost:5195</code>.
      </p>

      <div className="callout">
        <span className="callout__k">GRID</span>
        <p><strong>Services are a grid, not tabs.</strong> A grid shows all six offers at once, gives
        each a crawlable link to its own page, and keeps every service name in the HTML. Tabs and
        carousels hide five-sixths of the offer at any moment. The configurator already does the
        "choose your path" job; the Services section does not repeat it.</p>
      </div>

      <table>
        <thead><tr><th>#</th><th>Section</th><th>Component</th><th>Content</th><th>Status</th></tr></thead>
        <tbody>
          {SECTIONS.map(([n, name, comp, content, status]) => (
            <tr key={n}>
              <td>{n}</td><td><strong>{name}</strong></td><td><code>{comp}</code></td><td>{content}</td>
              <td>{status.startsWith('pending') ? <em>{status}</em> : status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Pending slots</h2>
      <p>
        Every "pending" above is a <code>&lt;Pending&gt;</code> slot in the page. In development
        they render as dashed amber markers so nobody forgets them. In a production build they
        are hidden — the site sets <code>NEXT_PUBLIC_SHOW_PENDING</code> to decide — so an
        unverified number can never ship by accident. The facts live in one file,
        <code>content/facts.js</code>, each with a <code>verified</code> flag. Flip the flag,
        the number appears everywhere it is used.
      </p>

      <h2>Load budget</h2>
      <ul>
        <li>No video, no GIF, no animation library. The order flow is CSS-stepped HTML.</li>
        <li>Fonts self-hosted through fontsource, Inter and JetBrains Mono only.</li>
        <li>Two client components on the whole page: the header (menus, drawer) and the configurator. Everything else is static HTML.</li>
        <li>Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. The current hero autoplays an MP4 from S3 and uses GIF maps; that is what this replaces.</li>
      </ul>

      <h2>Not built yet</h2>
      <ul>
        <li>The six service pages (<code>/services/[service]</code>) the cards link to, on the template in the brief.</li>
        <li>The diagnostic booking page with its four-field form, embedded calendar and DPDP notice.</li>
        <li>Pre-rendered <code>/setup/[category]-[channel]</code> pages so the configurator's answers are crawlable.</li>
        <li>Partners hub, careers, insights, glossary.</li>
      </ul>
    </article>
  );
}
