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

      <H id="header" title="Header, utility bar and footer">
        The header is the only client component: disclosure mega-menus, one CTA, a drawer below 1024px.
        Every menu item is a real link in the HTML whether the menu is open or not.
      </H>
      <MarketingDemo code={`
<div>
  <UtilityBar links={[{ label: 'Partners', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Client login', href: '#' }]} />
  <SiteHeader
    nav={[
      { label: 'Services', groups: [{ items: [
        { title: 'Fulfilment', desc: 'Pick, pack and dispatch across every channel', href: '#' },
        { title: 'Warehousing', desc: 'Space across our network, close to your buyers', href: '#' },
        { title: 'EdgeOS', desc: 'Inventory management, OMS and courier in one system', href: '#', tag: 'OS' },
      ] }] },
      { label: 'Solutions', groups: [
        { label: 'By stage', items: [{ title: 'Growing Brands', href: '#' }, { title: 'SMEs', href: '#' }, { title: 'Enterprises', href: '#' }] },
        { label: 'By channel', items: [{ title: 'Marketplaces', href: '#' }, { title: 'Quick commerce', href: '#' }, { title: 'Retail & distributors', href: '#' }] },
      ] },
      { label: 'About', href: '#' },
      { label: 'Resources', href: '#' },
    ]}
    secondary={<Button variant="ghost" as="a" href="#">Client login</Button>}
    cta={<Button as="a" href="#">Design My Supply Chain</Button>}
  />
  <div style={{ height: 120 }} />
</div>
`} caption="Click Services or Solutions. The panel is positioned, so it needs the empty space below to show." />

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
