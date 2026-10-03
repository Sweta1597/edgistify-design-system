import '@/styles/marketing.css';
import { MarketingDemo } from '@/components/demos/MarketingDemo';

export const metadata = {
  title: 'Marketing components',
  description: 'Every marketing block, live, inside the .ed-mk scope, with its code.',
};

const H = ({ id, title, children }) => (
  <>
    <h2 id={id}>{title}</h2>
    {children && <p>{children}</p>}
  </>
);

export default function MarketingComponentsPage() {
  return (
    <article className="prose">
      <h1>Marketing components</h1>
      <p className="lede">
        Every block the website is built from, rendered inside the <code>.ed-mk</code> scope
        exactly as a page renders it. Edit the code; the preview follows. All of it imports
        from <code>@edgistify/design-system/react/marketing</code>.
      </p>

      <H id="announcement" title="Announcement bar">
        The one-line strip above the header, sitewide: a newsletter, a report, an event, an offer.
        Three formats in one component — the whole line is the link, a statement plus a link, or a
        statement plus a small button — and three tones: ink (default), brand, tint. It replaces the
        utility bar as the first thing on the page; Partners, Careers and Client login live in the
        footer and the three doors. One bar at a time, one message under about 90 characters, and
        the link says what happens: "Subscribe", "Read the report", never "Click here". Every bar has a
        close button, and the choice is remembered per <code>id</code>, so change the id to show a new
        message to people who dismissed the last one. The <code>end</code> slot puts a small text button at
        the right edge; the website uses it for Login, which is why Login is not in the header.
      </H>
      <MarketingDemo code={`
<div style={{ display: 'grid', gap: 16 }}>
  {/* 1 · link: the whole line is the link — what the website uses */}
  <Announcement id="demo-1" href="/newsletter">
    Stay ahead of what's changing in Indian supply chains. Join the Edgistify newsletter
  </Announcement>

  {/* 2 · text + link, with a Login text button at the right edge */}
  <Announcement id="demo-2" end={<Button variant="ghost" size="xs" as="a" href="#"><Icon icon={User} size="xs" />Login</Button>}
    message="Stay ahead of what's changing in Indian supply chains."
    href="/newsletter" linkLabel="Join the Edgistify newsletter" />

  {/* 3 · text + button, brand tone, for an event or an offer */}
  <Announcement id="demo-3" tone="brand"
    message="Open Floor day, Thane · Saturday 18 October. Walk a live warehouse with our ops leads."
    action={<Button size="xs">Register</Button>} />

  {/* tint tone, external link */}
  <Announcement id="demo-4" tone="tint" href="https://example.com/report" external>
    The Fulfilment Index Q3 is out: RTO, appointment adherence and delivery times by pin code
  </Announcement>
</div>
`} caption="Ink is the default and the one the site uses. Brand is for a moment worth the teal — an event, a launch. Tint is for a quiet notice." />

      <H id="section" title="Section and SectionHead">
        The unit of a page. <code>tone</code> is default, <code>tint</code> (canvas) or <code>band</code> (ink).
        Every section owns its container; a head is eyebrow, heading and lede, left-aligned unless it is the CTA.
      </H>
      <MarketingDemo code={`
<Section tone="tint" tight>
  <SectionHead
    eyebrow="Services"
    title="Everything we run, on one operating system."
    lede="Take one service or all six. They share one inventory pool and one live view, so nothing falls between vendors."
  />
  <Grid cols={3}>
    <Tile title="Fulfilment" body="Pick, pack and dispatch across every channel." foot={<More href="#">Explore Fulfilment</More>} />
    <Tile title="Warehousing" body="Space across our network, close to your buyers." foot={<More href="#">Explore Warehousing</More>} />
    <Tile title="Shipping" body="Courier and last-mile orchestration." foot={<More href="#">Explore Shipping</More>} />
  </Grid>
</Section>
`} />

      <H id="tile" title="Tile">
        The marketing card: one idea. Not <code>.ed-card</code> — a product card carries elevation and
        slots for a table; a tile holds a heading, three lines and a link. Flat, roomy, bordered.
      </H>
      <MarketingDemo code={`
<div style={{ padding: 24 }}>
  <Grid cols={3}>
    <Tile
      icon={<Icon icon={Package} size="md" />}
      title="The ops team hits its ceiling"
      body="What two people ran on spreadsheets turns into a daily pile of exceptions. More hiring doesn't fix a process problem."
      foot={<More href="#">See Fulfilment</More>}
      link
    />
    <Tile num="02" title="Design" body="A setup engineered for your channels, categories and growth plan." />
    <Tile tint title="Cost-per-order" body="One rate per order fulfilled, so your cost moves with your sales."
      list={['For variable demand', 'No minimums', 'Rate reviewed quarterly']} />
  </Grid>
</div>
`} />

      <H id="chip" title="Chip and Pending">
        A chip selects (a category, a channel) or links (an industry). Selected is ink, not teal — a row
        of teal chips would out-shout the one brand button. <code>Pending</code> is the honest placeholder.
      </H>
      <MarketingDemo code={`
<div style={{ padding: 24, display: 'grid', gap: 20 }}>
  <Chips>
    <Chip pressed>Marketplaces</Chip>
    <Chip pressed={false}>Quick commerce</Chip>
    <Chip pressed={false}>Own website & app</Chip>
    <Chip href="#">Beauty & Personal Care</Chip>
  </Chips>
  <p style={{ margin: 0 }}>
    Our network spans <Pending dots>Confirm</Pending> cities. Featured in The Economic Times <Pending>link</Pending>.
  </p>
</div>
`} />

      <H id="hero" title="Hero">
        Copy on the left, an aside on the right. The aside is the configurator or a still of the
        order flow; never a video. The one brand button lives here.
      </H>
      <MarketingDemo code={`
<Hero
  eyebrow="Warehousing · Fulfilment · Shipping · EdgeOS"
  title={<>Warehousing, fulfilment and shipping for Indian brands. <em>Run on our own technology.</em></>}
  lede="One partner runs your inventory, orders and deliveries across your website, marketplaces, quick commerce, retail stores and distributors. The software and the people answer to the same company."
  actions={<><Button variant="brand" size="lg">Design My Supply Chain</Button><Button variant="secondary" size="lg">WhatsApp us</Button></>}
  aside={
    <Flow events={[
      { src: 'Zepto', text: <>Order received · <b>2 SKUs</b> · 10-min slot · Mumbai</>, status: 'EdgeOMS' },
      { src: 'Amazon', text: <>Order received · routed to nearest facility</>, status: 'EdgeOMS' },
      { src: 'EdgeWMS', sys: true, text: <>Picked and packed · <b>one pool</b> for online orders and case packs</>, status: 'On SLA' },
      { src: 'EdgeAPEX', sys: true, text: <>Risk flagged · courier delay likely on one route</>, status: 'Task set' },
      { src: 'EdgeOS', sys: true, text: <>Carrier switched · dispatch confirmed</>, status: 'Resolved' },
    ]} note="Illustrative flow. Every capability shown is live in production." />
  }
/>
`} />

      <H id="hero-bento" title="Hero, bento variant">
        The landing hero. Headline, lede, one black call to action and a logo marquee
        on the left; four image tiles on the right. One phrase of the headline takes
        the serif italic through <code>.ed-mk-serif</code>. A tile without an image
        names what belongs in it.
      </H>
      <MarketingDemo code={`
<Hero
  variant="bento"
  title={<>AI-Native Supply Chain Partner for <em className="ed-mk-serif">India's Growth Stage Brands</em></>}
  lede="Edgistify offers AI-driven fulfilment solutions for B2B, B2C and D2C companies across multiple industries."
  aside={<Bento
    items={[{ label: 'Interface with cursor' }, {}, {}]}
    orbit={[{ name: 'Zepto' }, { name: 'Amazon' }, { name: 'Blinkit' }, { name: 'Myntra' }, { name: 'Shopify' }, { name: 'Swiggy' }]}
  />}
>
  <Actions>
    <Button as="a" href="#" variant="primary" size="lg" className="ed-btn--pill">
      Let's design the fulfilment setup your brand needs<Icon icon={ArrowRight} size="sm" />
    </Button>
  </Actions>
  <LogoMarquee label="Trusted by brands across India" logos={[{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'E' }, { name: 'F' }]} />
</Hero>
`} caption="Three blocks joined by moving rings centred on the mark. Hover the top or bottom block to grow it; the rings follow the hub. Channel tiles orbit through the bottom block. Logos below the call to action drift left; hover pauses them." />

      <H id="expand" title="Expand on scroll and showcase tabs">
        A light panel on a dark page that widens to full width as it scrolls in, its
        content rising into place. Inside, tabs over three parts: copy on the left, a
        product screen in the middle, one figure on the right. Switching tabs replays
        their entrances. Unverified figures go through Pending.
      </H>
      <MarketingDemo code={`
<div className="ed-mk-band" style={{ paddingBlock: 40 }}>
  <ExpandOnScroll>
    <Container>
      <SectionHead align="center" className="ed-mk-expand__head"
        title={<>Everything we run, on <em className="ed-mk-serif">one operating system.</em></>} />
      <ShowcaseTabs tabs={[
        { label: 'Fulfilment', icon: <Icon icon={Package} size="sm" />, title: 'Pick, pack and dispatch across every channel',
          body: 'Online orders and B2B POs from one inventory pool.', href: '#', linkLabel: 'Explore Fulfilment',
          media: <Screen label="EdgeOS · Fulfilment" />, stat: { value: <Pending dots>Confirm</Pending>, caption: 'Headline metric' } },
        { label: 'Warehousing', icon: <Icon icon={Warehouse} size="sm" />, title: 'Space across our network, close to your buyers',
          body: 'Multi-city, one inventory view.', href: '#', linkLabel: 'Explore Warehousing',
          media: <Screen label="EdgeOS · Warehousing" /> },
      ]} />
    </Container>
  </ExpandOnScroll>
</div>
`} caption="Scroll the page to see the panel open out. Tabs take arrow keys." />

      <H id="scroll-cards" title="Scroll cards and system card">
        A pinned stage: while the page scrolls, the cards move sideways from first to
        last and the copy on the left follows the card in front; then the page scrolls
        on. Cards that have passed fade out; the next one waits dimmed on the right. On a
        phone it is a row you swipe, each card with its own copy.
      </H>
      <MarketingDemo code={`
<ScrollCards
  head={<h2 className="ed-mk-h2">The <em className="ed-mk-serif">Operating System</em></h2>}
  items={[
    { eyebrow: 'OMS', title: 'Real-time tracking from purchase to delivery', body: 'One order queue across every channel.',
      card: <SystemCard icon={<Icon icon={ShoppingCart} size="sm" />} name="Order Management System"
        line="Real-time tracking from purchase to delivery" nodes={['One order queue', 'Allocation rules', 'Integrations']} /> },
    { eyebrow: 'WMS', title: 'Precise inventory control and stock optimisation', body: 'Scan-verified at every step.',
      card: <SystemCard icon={<Icon icon={Boxes} size="sm" />} name="Warehouse Management System"
        line="Precise inventory control" nodes={['Scan-verified', 'Cycle counts', 'Built for the floor']} /> },
  ]}
/>
`} caption="Scroll the page through it. Each card's tree shows three of the system's capabilities." />

      <H id="loop-halo" title="Halo">
        A black section: a short line, a large title, and below them a half circle as
        wide as the page, its rim glowing in teals and meeting both edges where the
        section ends. As it scrolls in, the title comes out of a blur and the glow
        sweeps the rim left to right, lighting the stages placed on it. Content can sit
        inside the dome. RuledColumns and LoopCompare carry the story on below.
      </H>
      <MarketingDemo code={`
<LoopHalo eyebrow="The only 3PL with" title="Closed-loop Fulfilment"
  nodes={['Decide', 'Execute', 'Measure', 'Learn']}
  inner={<p className="ed-mk-halo__text"><b>Closed-loop fulfilment</b> is fulfilment in which one company decides, executes, measures and learns from every order.</p>} />
`} caption="Scroll it into view to see the halo complete. Motion stops under reduced motion." />

      <H id="config" title="Configurator">
        "Two answers, no forms." A dressed native select and a row of chips. The logic — which services
        an answer maps to — lives in the website, not here; this is the surface.
      </H>
      <MarketingDemo code={`
<div style={{ padding: 24, maxWidth: 560 }}>
  <ConfigPanel title="Find your setup" hint="Two answers. No forms.">
    <ConfigQuestion label="What do you sell?" htmlFor="cat">
      <Select id="cat" defaultValue="">
        <option value="" disabled>Choose your category</option>
        <option>Beauty & Personal Care</option>
        <option>Packaged Food & Beverages</option>
        <option>Electronics & Telecom</option>
      </Select>
    </ConfigQuestion>
    <ConfigQuestion label="Where do you sell?" hint="Pick all that apply">
      <Chips>
        <Chip pressed>Marketplaces</Chip>
        <Chip pressed>Quick commerce</Chip>
        <Chip pressed={false}>Own website & app</Chip>
        <Chip pressed={false}>Offline retail & modern trade</Chip>
      </Chips>
    </ConfigQuestion>
    <Actions><Button>Design My Supply Chain</Button><Button variant="secondary">WhatsApp us</Button></Actions>
  </ConfigPanel>
</div>
`} />

      <H id="setup" title="Setup result">
        What the configurator returns. Shareable, copyable, and the hand-off into the booking flow
        with the answers pre-filled. The "similar brand" proof line stays pending until the case set is verified.
      </H>
      <MarketingDemo code={`
<div style={{ padding: 24, maxWidth: 560 }}>
  <SetupCard
    title="Beauty & Personal Care · Marketplaces, Quick commerce"
    services={[
      { name: 'Fulfilment', why: 'Online orders and marketplace POs from one inventory pool' },
      { name: 'Appointment Delivery', why: 'Slot-booked freight into Amazon and Flipkart FCs, quick commerce mother hubs' },
      { name: 'EdgeOS', why: 'Batch and expiry tracked at SKU level, one live view' },
    ]}
    notes={['Batch and expiry: FEFO allocation, no expired stock reaches a shelf', 'Sample and gift-with-purchase kitting at pack']}
    proof={<>Result from a similar brand appears here. <Pending>From verified case set</Pending></>}
    actions={<><Button>Book my diagnostic with this setup</Button><Button variant="secondary">Copy summary</Button></>}
    foot={<>Running your own warehouse instead? <a href="#">See Infrastructure Setup</a></>}
  />
</div>
`} />

      <H id="proof" title="Trust strip">
        Logos, three stats, press. A logo with no <code>src</code> is an empty slot; a stat that is not
        verified is a pending slot; a press item with no link says so.
      </H>
      <MarketingDemo code={`
<Section tight>
  <div className="ed-mk-proof">
    <LogoStrip logos={[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'},{name:'F'}]}
      note="Customer logos appear only with written permission." />
    <StatStrip stats={[
      { value: '80+', caption: 'brands running on Edgistify' },
      { value: '50+', caption: 'cities in the network' },
      { value: '1 lakh+', caption: 'orders a day, capacity' },
    ]} />
    <Press items={[{ name: 'The Economic Times' }, { name: 'DataQuest' }, { name: 'Express Computer' }]} />
  </div>
</Section>
`} />

      <H id="stack" title="Services stack">
        Five service cards on the EdgeOS band, EdgeAPEX along its top edge. The one-system claim made
        literal: the services sit on the platform. <code>recommended</code> and <code>dim</code> are what the
        configurator sets; a dimmed card is never hidden, because every card must stay crawlable.
      </H>
      <MarketingDemo code={`
<Section tight>
  <ServiceStack platform={
    <Platform
      badge={<Badge tone="brand">Operating system</Badge>}
      title="EdgeOS"
      body="The system under every service. Your team sees the same live screens ours does."
      modules={[
        { name: 'Inventory management', note: 'EdgeWMS' },
        { name: 'OMS', note: 'EdgeOMS' },
        { name: 'Courier', note: 'Allocation and tracking' },
      ]}
      link={<More href="#">Explore EdgeOS</More>}
      apex={{
        eyebrow: 'EdgeAPEX · AI',
        body: <>EdgeAPEX is our AI system. It <b>watches every order</b>, flags risks before they turn into failures, and turns operations data into decisions across every service.</>,
        link: <More href="#">How EdgeAPEX works</More>,
      }}
    />
  }>
    <ServiceCard icon={<Icon icon={Package} size="md" />} name="Fulfilment" recommended
      outcome="Pick, pack and dispatch for your website, marketplaces, quick commerce, retail and distributors."
      bullets={['Online orders and B2B POs from one pool', 'Kitting, batch and expiry at pack', 'Returns processed on the same floor']}
      href="#" cta={<Button size="sm" variant="secondary">Estimate my cost per order</Button>} />
    <ServiceCard icon={<Icon icon={Warehouse} size="md" />} name="Warehousing" dim
      outcome="Space across our network, close to where your orders come from."
      bullets={['Multi-city, one inventory view', 'No capital tied up in building it', 'Compliance handled per facility']}
      href="#" cta={<Button size="sm" variant="secondary">Find space near my buyers</Button>} />
    <ServiceCard icon={<Icon icon={Truck} size="md" />} name="Shipping"
      outcome="Courier and last-mile orchestration. Each parcel goes with the carrier performing best on that route."
      bullets={['20+ couriers, one contract', 'RTO reduction by route', 'NDR handled by our team']}
      href="#" cta={<Button size="sm" variant="secondary">Audit my courier mix and RTO</Button>} />
    <ServiceCard icon={<Icon icon={CalendarClock} size="md" />} name="Appointment Delivery (PTL/FTL)" recommended
      outcome="Slot-booked part and full truckloads into marketplace FCs, quick commerce warehouses, modern trade DCs and distributor godowns."
      bullets={['Slot booking into Amazon and Flipkart FCs', 'Quick commerce mother-hub POs', 'PTL and FTL with POD']}
      href="#" cta={<Button size="sm" variant="secondary">Plan my next FC or quick commerce PO</Button>} />
    <ServiceCard icon={<Icon icon={Building} size="md" />} name="Infrastructure Setup" dim
      outcome="Warehouse procurement, layout planning, fit-out and go-live, for a facility you want to own or run yourself."
      bullets={['Site selection and lease', 'Racking, MHE and layout', 'Go-live on EdgeOS']}
      href="#" cta={<Button size="sm" variant="secondary">Scope my facility</Button>} />
  </ServiceStack>
</Section>
`} caption="Fulfilment and Appointment Delivery are tagged 'Recommended'; Warehousing and Infrastructure Setup are dimmed. Nothing is hidden." />

      <H id="loop" title="Loop diagram and Definition">
        The argument, then the passage AI engines quote. The definition is plain HTML text, 50–80 words,
        one sentence beginning "Closed-loop fulfilment is…".
      </H>
      <MarketingDemo code={`
<Section tight>
  <Split top>
    <LoopDiagram
      open={{ who: 'Software-only vendor · open loop', chain: ['Detect', 'Alert', 'Wait'], stop: 'The alert is the end of their job.' }}
      closed={{ who: 'Edgistify · closed loop', chain: ['Decide', 'Execute', 'Measure', 'Learn'], back: 'every outcome feeds the next decision' }}
    />
    <Definition term="What is closed-loop fulfilment?" id="closed-loop">
      Closed-loop fulfilment is fulfilment in which one company decides, executes, measures and learns from every order.
      The software that routes an order and the team that ships it answer to the same owner, and each outcome feeds the
      next decision. Edgistify runs this model for Indian brands on its EdgeOS platform.
    </Definition>
  </Split>
</Section>
`} />

      <H id="results" title="Results">
        One metric, one line, one link. The number is pending until it comes from the verified case set;
        the video placeholder stays until the founder is filmed, with a transcript on the page.
      </H>
      <MarketingDemo code={`
<Section tight>
  <Grid cols={3}>
    <ResultCard who="Beauty brand · multi-channel" caption="Headline operational metric from the verified case set." href="#" />
    <ResultCard who="Omnichannel brand · pan-India" value="38%" verified caption="Fewer RTOs in the first quarter after the courier mix was re-routed." href="#" />
    <ResultCard who="Solar · project dispatch" caption="Headline operational metric from the verified case set." href="#" />
  </Grid>
  <div style={{ marginTop: 24, maxWidth: 640 }}>
    <VideoPlaceholder title="Founder testimonial, on video" note="Recorded with the founder's consent. Placeholder until filmed." />
  </div>
</Section>
`} caption="The middle card shows what a verified value looks like. The other two are pending." />

      <H id="network" title="Network">
        A map for people, a text list for crawlers. The list is what search and AI engines read.
      </H>
      <MarketingDemo code={`
<Section tight>
  <Network cities={[
    { name: 'Mumbai / Thane', count: '— warehouses' }, { name: 'Bengaluru', count: '— warehouses' },
    { name: 'Delhi NCR', count: '— warehouses' }, { name: 'Hyderabad', count: '— warehouses' },
    { name: 'Kolkata', count: '— warehouses' }, { name: 'Indore', count: '— warehouses' },
  ]} mapLabel="Map: pending the verified city list" />
</Section>
`} />

      <H id="steps" title="Steps and Pricing" />
      <MarketingDemo code={`
<Section tight>
  <Steps steps={[
    { title: 'Diagnose', body: 'A working session on your order flows, channels and costs. No pitch deck.', duration: '30 minutes' },
    { title: 'Design', body: 'A setup engineered for your channels, categories and growth plan.' },
    { title: 'Transition', body: 'Inventory, integrations and processes move over in a planned cutover, without stopping sales.' },
    { title: 'Operate and improve', body: 'Our teams run it on EdgeOS, and every outcome feeds the next decision.' },
  ]} />
  <div style={{ height: 40 }} />
  <Grid cols={3}>
    <PricingCard audience="For predictable volumes" title="Cost-plus" body="You see the full cost stack, with an agreed margin on top." />
    <PricingCard audience="For variable demand" title="Cost-per-order" body="One rate per order fulfilled, so your cost moves with your sales." />
    <PricingCard audience="For deep partnerships" title="Performance-linked" body="Part of our fee depends on agreed outcomes such as SLA and accuracy." />
  </Grid>
  <PricingRule>No hidden margins. No bundled costs that hide the economics.</PricingRule>
</Section>
`} />

      <H id="faq" title="FAQ">
        Native <code>&lt;details&gt;</code>. Every answer is in the HTML whether it is open or not, which is
        what a crawler needs; no JavaScript is involved.
      </H>
      <MarketingDemo code={`
<Section tight container="narrow">
  <Faq items={[
    { q: 'Is Edgistify a software platform or a logistics provider?', a: 'Both, by design. Edgistify runs warehousing, fulfilment and shipping on its own technology platform, EdgeOS, with its own teams, so the system that makes a decision and the people who carry it out answer to one company.', open: true },
    { q: 'How does pricing work?', a: 'There are three models: cost-plus, cost-per-order and performance-linked. None of them carries hidden margins.' },
  ]} />
</Section>
`} />

      <H id="cta" title="CTA band and Doors">
        The close, on the dark band, then the three doors that route everyone who is not a buyer.
      </H>
      <MarketingDemo code={`
<>
  <Section tone="band" tight>
    <CtaBand
      eyebrow="Get started"
      title="Stop buying warehousing. Start engineering your supply chain."
      lede="A 30-minute diagnostic with our solutions team. No rate card, no pitch deck."
      actions={<><Button variant="brand" size="lg">Design My Supply Chain</Button><Button variant="secondary" size="lg">WhatsApp us</Button></>}
      note={<>Prefer to see it first? <a href="#">Walk a live warehouse on an Open Floor day →</a></>}
    />
  </Section>
  <Section tone="tint" tight>
    <Doors doors={[
      { k: "I'm a brand", title: 'Design my supply chain', body: 'A 30-minute diagnostic of your order flows, channels and costs.', href: '#' },
      { k: 'I own a warehouse or run a fleet', title: 'Partner with Edgistify', body: 'List your warehouse, your lanes or your integration.', href: '#' },
      { k: 'I want to work here', title: 'See open roles', body: 'Corporate, tech and warehouse operations.', href: '#' },
    ]} />
  </Section>
</>
`} />

      <H id="prompt" title="Prompt: the requirement composer">
        The "describe it in your own words" first touch, for the Services page and any landing page that
        wants a brief rather than a form. A large text field, the website-URL field at the bottom left,
        attach and voice buttons at the bottom right, one submit. Enter sends, Shift+Enter makes a new line.
        The microphone uses the browser's speech recognition where it exists and is disabled, with a reason,
        where it does not. Pass <code>backdrop={'<WaveMesh />'}</code> for the wireframe wave surface, which renders behind the
        box only and spans the viewport's width; <code>.ed-mk-glow</code> is still there for a page that wants
        the lit backdrop across a whole section.
      </H>
      <MarketingDemo code={`
<Section tone="band" style={{ overflowX: 'clip' }}>
  <div style={{ maxWidth: 760, margin: '0 auto' }}>
    <div className="ed-mk-greet">
      <p className="ed-mk-greet__hi">Good evening,</p>
      <h2 className="ed-mk-greet__line">Let's design the fulfilment setup your brand needs.</h2>
    </div>
    <Prompt
      backdrop={<WaveMesh />}
      placeholder="Tell us what you sell, where you sell and what's getting in the way. We'll shortlist the services that fit."
      urlPlaceholder="Paste your website URL"
      submitLabel="Curate my services"
      suggestions={['Skincare on Amazon and Blinkit, RTO is killing margin', 'Solar modules, project dispatch to 40 sites', 'Snacks into modern trade DCs against POs']}
      onSubmit={(s) => alert(JSON.stringify({ text: s.text, url: s.url, files: s.files.length }))}
    />
  </div>
</Section>
`} caption="Type and press Enter, or click a suggestion. Attach opens the file picker; the files show as removable chips." />

      <H id="header" title="Header, utility bar and footer">
        The header is the only client component: disclosure mega-menus, one CTA, a drawer below 1024px.
        Every menu item is a real link in the HTML whether the menu is open or not. <code>tone="ink"</code> is
        the dark header the website uses; the panels are ink too and the wordmark stays teal, and it sits
        under the ink announcement bar with a single rule between them. Menus open on hover with a mouse and
        on click with touch or keyboard. A panel is full width: three quarters sub-menu (one column per
        group, an icon and a name per item), one quarter related content (a card and a short list), and
        a footer strip with the <code>lead</code> link (a waving hand, a sentence and an arrow that grows
        its tail on hover) and, optionally, a <code>footer</code> with a "View all" link and secondary links. Each item is an icon on the left with the name and
        one descriptive line to its right; a group with nothing in it yet can carry a <code>note</code>
        instead of items. On hover an item's name turns teal, its description steps up from grey to white and an arrow
        appears; the other items keep their colour. The top-level items work the other way, by subtraction: the
        open one stays white and its siblings dim. The one action is Contact Sales, a pill (<code>ed-btn--pill</code>) with a right arrow;
        Login lives in the announcement bar above. A top-level item without groups, like About, is a plain
        link with no caret.
      </H>
      <MarketingDemo code={`
<div>
  <Announcement id="demo-hdr" href="/newsletter" dismissible={false}
    end={<Button variant="ghost" size="xs" as="a" href="#"><Icon icon={User} size="xs" />Login</Button>}>
    Stay ahead of what's changing in Indian supply chains. Join the Edgistify newsletter
  </Announcement>
  <SiteHeader
    tone="ink"
    nav={[
      { label: 'Services',
        groups: [
          { label: 'Fulfilment', items: [
            { title: 'Warehousing', desc: 'Pan-India storage and efficient inventory management', href: '#', icon: <Icon icon={Warehouse} size="md" /> },
            { title: 'Last-Mile', desc: 'Speeding final deliveries directly to customers', href: '#', icon: <Icon icon={MapPin} size="md" /> },
            { title: 'Appointment-Based Delivery', desc: 'Slotted deliveries tailored to customer availability', href: '#', icon: <Icon icon={CalendarClock} size="md" /> },
          ] },
          { label: 'Technology', items: [
            { title: 'Order Management System', desc: 'Real-time order tracking from purchase to delivery', href: '#', icon: <Icon icon={ShoppingCart} size="md" /> },
            { title: 'Warehouse Management System', desc: 'Precision inventory control and stock optimisation', href: '#', icon: <Icon icon={Boxes} size="md" /> },
            { title: 'Transport Management System', desc: 'Smarter freight routing and cost-effective dispatch', href: '#', icon: <Icon icon={Navigation} size="md" /> },
          ] },
        ],
        aside: {
          card: { title: 'Watch one order move through EdgeOS', href: '#' },
          list: { label: 'Latest', items: [{ title: 'Open Floor day, Thane', href: '#' }, { title: 'Fulfilment Index', href: '#' }, { title: 'Case studies', href: '#' }] },
        },
        lead: { label: "Let's design the fulfilment setup your brand needs", href: '#' } },
      { label: 'Solutions', groups: [
        { label: 'By stage', items: [{ title: 'Growing Brands', href: '#' }, { title: 'SMEs', href: '#' }, { title: 'Enterprises', href: '#' }] },
        { label: 'By channel', items: [{ title: 'Marketplaces', href: '#' }, { title: 'Quick commerce', href: '#' }, { title: 'Retail & distributors', href: '#' }] },
      ] },
      { label: 'About', groups: [{ items: [{ title: 'Company', href: '#' }, { title: 'Careers', href: '#' }, { title: 'Press', href: '#' }] }] },
      { label: 'Resources', groups: [{ items: [{ title: 'Insights', href: '#' }, { title: 'Glossary', href: '#' }, { title: 'Support', href: '#' }] }] },
    ]}
    secondary={<Button variant="ghost" as="a" href="#">Login</Button>}
    cta={<Button as="a" href="#">Contact Sales<Icon icon={ArrowRight} size="sm" /></Button>}
  />
  <div style={{ height: 460 }} />
</div>
`} caption="Hover or click Services. The panel spans the header's width: three quarters sub-menu, one quarter related content, and a footer strip carrying the lead link." />

      <MarketingDemo code={`
<Footer
  description="Edgistify is a supply chain partner for Indian brands. It runs warehousing, fulfilment and shipping on its own technology platform, EdgeOS, with its own teams. Headquartered in Thane, Mumbai. Founded 2017."
  columns={[
    { title: 'Services', links: [{ label: 'Fulfilment', href: '#' }, { label: 'Warehousing', href: '#' }, { label: 'EdgeOS', href: '#' }] },
    { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Press', href: '#' }] },
    { title: 'Resources', links: [{ label: 'Insights', href: '#' }, { label: 'Fulfilment Index', href: '#', tag: 'Soon' }] },
  ]}
  legal={{ legalName: 'OptiSupply Chain Solution Pvt Ltd', address: 'Unit A-2/1, 8th Floor, A Wing, Ashar IT Park, Wagle Estate, Thane West, Maharashtra 400604', phone: '+91-8999365025' }}
  links={[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Cookie settings', href: '#' }]}
  copyright="© 2026 Edgistify"
/>
`} />
    </article>
  );
}
