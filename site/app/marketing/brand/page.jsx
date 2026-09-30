import '@/styles/marketing.css';
import Link from 'next/link';
import { MarketingDemo } from '@/components/demos/MarketingDemo';
import { Logo } from '@edgistify/design-system/react/Logo';

export const metadata = {
  title: 'Brand',
  description: 'Wordmark, colour on a marketing page, the display type scale, voice, and what a claim needs before it ships.',
};

const SCALE = [
  ['ed-mk-display', '--ed-mk-text-display', '36 → 56px · bold · 1.06', 'Warehousing, fulfilment and shipping for Indian brands.'],
  ['ed-mk-h1', '--ed-mk-text-h1', '32 → 44px · bold · 1.15', 'Appointment delivery into Amazon, Flipkart and quick commerce'],
  ['ed-mk-h2', '--ed-mk-text-h2', '26 → 36px · semibold · 1.15', 'Everything we run, on one operating system.'],
  ['ed-mk-h3', '--ed-mk-text-h3', '20 → 24px · semibold · 1.2', 'Software detects. Operators prevent.'],
  ['ed-mk-lede', '--ed-mk-text-lede', '17 → 20px · regular · 1.65', 'One partner runs your inventory, orders and deliveries across every channel.'],
  ['ed-mk-body', '--ed-text-base', '16px · regular · 1.65', 'Every fulfilment decision runs through our own platform and is carried out by our own teams.'],
  ['ed-mk-eyebrow', '--ed-text-xs', '13px · semibold · uppercase · wide', 'Services'],
];

export default function BrandPage() {
  return (
    <article className="prose">
      <h1>Brand</h1>
      <p className="lede">
        What Edgistify looks and sounds like when nobody is logged in. The wordmark, where
        teal goes on a page, the display type scale, the voice, and what a claim has to have
        before it can be published.
      </p>

      <h2>Wordmark</h2>
      <div className="note">
        <span className="k">CORRECTED</span>
        <p>This page used to describe the wordmark as lowercase <em>edgistify</em> set in Inter
        Bold with a teal full stop appended in CSS. That was a stand-in written before the brand
        files were available, and it was wrong on all three counts. The real wordmark is drawn
        letterforms, capitalised <em>Edgistify</em>, and carries no dot — the dot belongs to the
        <em> E.</em> monogram, which is a separate asset. <code className="mono">Wordmark</code> now
        renders the real artwork. See <a href="/foundations/logo">Logo</a>.</p>
      </div>
      <p>
        The drawn wordmark, in <code className="mono">currentColor</code>. Never letter-space it,
        never redraw it in a font, never add the dot back. It ships as one SVG rather than one
        file per colour, so it takes the colour of whatever it sits in.
      </p>
      <MarketingDemo code={`
<div style={{ display: 'flex', gap: 40, alignItems: 'baseline', padding: 32, flexWrap: 'wrap' }}>
  <Wordmark size="lg" />
  <Wordmark />
  <Wordmark size="sm" />
</div>
`} caption="Three sizes. font-size drives it, because .ed-logo is height: 1em." />

      <h2>Where teal goes</h2>
      <p>
        Three places at rest. The wordmark's dot, one brand button per viewport, and the
        accent on the dark band. Everywhere else the page is ink and white — and that
        restraint is what makes the teal read as <em>the</em> thing rather than <em>a</em> thing.
        The one exception is a single emphasised word in a headline (<code>&lt;em&gt;</code> inside
        a display heading), used at most once on a page.
      </p>
      <div className="mk-three">
        <div><span className="k">01 · The monogram</span><div className="ed-mk"><span className="ed-mk-wordmark" style={{ color: 'var(--ed-brand)' }}><Logo /></span></div><p>The E. mark, in the header and the footer. The wordmark beside it stays ink.</p></div>
        <div><span className="k">02 · One brand button</span><div className="ed-mk"><button className="ed-btn ed-btn--brand">Design My Supply Chain</button></div><p>The hero action. Every other CTA is ink. Rule 04.</p></div>
        <div><span className="k">03 · The band accent</span><div className="ed-mk ed-mk-band" style={{ padding: 16, borderRadius: 8 }}><span className="ed-mk-eyebrow">EdgeAPEX · AI</span></div><p>Eyebrows, links and the EdgeAPEX strip on the dark band, at 10.3:1.</p></div>
      </div>

      <h2>Type</h2>
      <p>
        Inter, as everywhere. Two additions for marketing: a fluid display scale that caps at
        56px so a headline is never three words a line on a phone, and a reading body of 16px
        at 1.65 leading, measured at 62 characters. Headings are balanced (<code>text-wrap: balance</code>),
        paragraphs are pretty-wrapped. The product's size tokens are re-tuned inside the scope,
        so a Badge or a Button inside a marketing page grows with the text around it.
      </p>
      <div className="ed-mk mk-scale">
        {SCALE.map(([cls, token, spec, sample]) => (
          <div className="mk-scale__row" key={cls}>
            <div className="mk-scale__meta"><b>.{cls}</b>{token}<br />{spec}</div>
            <div className={cls} style={{ maxWidth: 'none' }}>{sample}</div>
          </div>
        ))}
      </div>

      <h2>Buttons on a marketing page</h2>
      <p>
        The same five variants, at touch sizes. Hierarchy on any screen: one <code>brand</code> (hero only),
        <code>primary</code> for every other commitment, <code>secondary</code> for WhatsApp and the quieter
        route, <code>link</code> for "walk a live warehouse". Never two filled buttons of the same weight
        side by side.
      </p>
      <MarketingDemo code={`
<div style={{ padding: 24, display: 'grid', gap: 24 }}>
  <Actions>
    <Button variant="brand" size="lg">Design My Supply Chain</Button>
    <Button variant="secondary" size="lg">WhatsApp us</Button>
  </Actions>
  <Actions>
    <Button>Book my diagnostic</Button>
    <Button variant="secondary">Copy summary</Button>
    <Button variant="link">Walk a live warehouse →</Button>
  </Actions>
</div>
`} caption="Row one is the hero. Row two is every other section." />

      <h2>Voice</h2>
      <table>
        <thead><tr><th>Do</th><th>Not</th></tr></thead>
        <tbody>
          <tr><td>Plain sentences with a verb. "One partner runs your inventory, orders and deliveries."</td><td>Category jargon as a headline. "End-to-end omnichannel supply chain solutions."</td></tr>
          <tr><td>The literal market term: Fulfilment, Warehousing, Appointment Delivery (PTL/FTL).</td><td>Invented names for ordinary services.</td></tr>
          <tr><td>Name the channels: Amazon, Flipkart, Blinkit, Zepto, Swiggy Instamart, modern trade.</td><td>"Leading marketplaces and q-commerce platforms."</td></tr>
          <tr><td>Say what is excluded. Buyers trust stated exclusions.</td><td>"Everything you need."</td></tr>
          <tr><td>"Software detects. Operators prevent. We are both."</td><td>"India's #1", "Top 3PL", "trusted by thousands".</td></tr>
        </tbody>
      </table>
      <p>
        Superlatives that cannot be proven weaken trust with buyers, and with AI engines that
        cross-check claims. The current title tag — "Top 3PL India" — is the first thing to
        replace.
      </p>

      <h2>Claims and facts</h2>
      <p>
        A number ships only when it is in the master fact sheet and marked verified. Until
        then it is a <code>&lt;Pending&gt;</code> slot: visible in development, hidden in production.
        The fact sheet is one file; the same figure is never typed twice. Every number on
        LinkedIn, Crunchbase, the press boilerplate and the site must match it, because
        consistency across sources is what AI engines reward.
      </p>
      <MarketingDemo code={`
<div style={{ padding: 24 }}>
  <StatStrip stats={[
    { value: '80+', caption: 'brands running on Edgistify', verified: false },
    { value: '50+', caption: 'cities in the network', verified: false },
    { value: '1 lakh+', caption: 'orders a day, capacity', verified: false },
  ]} />
</div>
`} caption="Three unverified stats. None of these values can reach the page until verified is true." />

      <h2>Imagery</h2>
      <ul>
        <li><strong>No autoplaying video, no GIF.</strong> The current hero streams an MP4 from S3 and animates three GIF maps. That is the LCP budget gone before a word is read. The live order flow is HTML, stepped by CSS.</li>
        <li><strong>Photograph the floor.</strong> Real warehouses, real people, real racking. An Open Floor day is a shoot. Stock photography of a generic warehouse says nothing a competitor cannot also say.</li>
        <li><strong>Product screens are proof.</strong> An EdgeOS screenshot, at reading size, beats an illustration of one.</li>
        <li><strong>WebP or AVIF, sized, lazy below the fold, width and height set</strong> — so nothing shifts.</li>
      </ul>

      <h2>The dark band</h2>
      <p>
        Ink, in both themes. Used for the EdgeOS platform under the service cards, the order
        flow window and the final call to action — the three moments where the page changes
        register. Never two bands in a row, never a status badge on a band. Inside it, the
        colour roles are re-mapped, so a <Link href="/components/button">Button</Link> or a
        <Link href="/components/badge">Badge</Link> comes out right without a prop.
      </p>
      <MarketingDemo code={`
<Section tone="band" tight>
  <CtaBand
    eyebrow="Get started"
    title="Stop buying warehousing. Start engineering your supply chain."
    lede="A 30-minute diagnostic with our solutions team. No rate card, no pitch deck."
    actions={<><Button variant="brand" size="lg">Design My Supply Chain</Button><Button variant="secondary" size="lg">WhatsApp us</Button></>}
    note="Prefer to see it first? Walk a live warehouse on an Open Floor day."
  />
</Section>
`} />
    </article>
  );
}
