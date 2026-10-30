import '@fontsource-variable/archivo/wdth.css';
import '@/styles/doc-shell.css';
import '@/styles/brand-board.css';
import { Board } from '@/components/demos/BrandBoards';

export const metadata = {
  title: 'Brand: three directions',
  description: 'Three identity directions for Edgistify, each drawn as the same pieces (website, LinkedIn post, graphic device, a physical thing) so one can be chosen.',
};

/* What each direction is made of. Colours that are not tokens yet are
   proposals: the chosen direction's become tokens; the others go. */
const DIRECTIONS = [
  {
    key: 'a',
    name: 'The shipping label',
    idea: 'Paper, ink and teal. Every parcel already carries a label; its ruled boxes, codes and stickers become the brand.',
    palette: [
      { name: 'Paper', hex: '#f3ede2', share: 55, role: 'ground' },
      { name: 'Ink', hex: '#0f1417', token: '--ed-ink', share: 25, role: 'type, rules' },
      { name: 'Teal', hex: '#00a699', token: '--ed-teal-500', share: 12, role: 'brand, actions' },
      { name: 'Kraft', hex: '#c8a97e', share: 6, role: 'cartons, quiet fills' },
      { name: 'Sticker', hex: '#f08a1c', share: 2, role: 'one sticker a page' },
    ],
    type: { sample: 'Packed. Weighed. Shipped.', faces: [['Display', 'Archivo, condensed, bold, capitals'], ['Text', 'Inter'], ['Codes', 'JetBrains Mono']] },
    device: 'The label grid and the sticker set',
    thing: 'Carton with tape and label; business card',
    says: 'We are the people who actually handle your parcels.',
    strong: ['Nobody else in Indian 3PL owns it', 'Works the same on screen, cartons, tape, trucks and decks', 'Light ground sets the site apart from dark templates at once'],
    watch: ['Can tip into pastiche if every block is a label; it needs restraint', 'Condensed capitals need care in long headings', 'Means rebuilding the site’s surfaces, not just recolouring'],
  },
  {
    key: 'b',
    name: 'Quiet ink',
    idea: 'Keep the dark site, take away every colour but teal, and let real photographs of Edgistify floors and people carry it.',
    palette: [
      { name: 'Ink', hex: '#0f1417', token: '--ed-ink', share: 70, role: 'ground' },
      { name: 'Graphite', hex: '#1e2528', share: 15, role: 'surfaces' },
      { name: 'Mist', hex: '#eef2f1', share: 10, role: 'type' },
      { name: 'Teal', hex: '#5ad1c3', token: '--ed-teal-300', share: 5, role: 'actions, key figure' },
    ],
    type: { sample: 'Our floors. Our people.', faces: [['Display', 'Inter, semibold, tight'], ['Text', 'Inter'], ['Codes', 'JetBrains Mono']] },
    device: 'The photo with a place and time',
    thing: 'Business card, front and back; staff ID badge',
    says: 'A serious operator: real places, real people, nothing staged.',
    strong: ['Closest to the site today, so the least work', 'Photos of your own floors are proof no rival can copy', 'Calm and premium'],
    watch: ['Only as good as the photography; it needs a proper shoot', 'Without photos it is the same dark template as now', 'Dark is weak on print and cartons'],
  },
  {
    key: 'c',
    name: 'Lanes',
    idea: 'All teal, from pale to deep, on white. The route line from a warehouse to a pincode is the mark and runs through every layout.',
    palette: [
      { name: 'White', hex: '#ffffff', token: '--ed-white', share: 60, role: 'ground' },
      { name: 'Deep teal', hex: '#103e39', token: '--ed-teal-900', share: 20, role: 'type' },
      { name: 'Teal wash', hex: '#c5f0e9', token: '--ed-teal-100', share: 12, role: 'bands, fills' },
      { name: 'Teal', hex: '#00a699', token: '--ed-teal-500', share: 8, role: 'lanes, actions' },
    ],
    type: { sample: 'Every lane in India.', faces: [['Display', 'Archivo, wide, medium'], ['Text', 'Inter'], ['Codes', 'JetBrains Mono']] },
    device: 'The lane: from, curve, to',
    thing: 'Truck livery',
    says: 'A network: wherever your customers are, there is a route.',
    strong: ['One colour, so it is unmistakably teal Edgistify', 'The lane already exists on the Shipping page', 'Easy to animate and to use in diagrams'],
    watch: ['Route lines are common in logistics; it is the least ownable', 'All one colour can feel flat without photography', 'Says network, says less about the warehouse floor'],
  },
];

const CRITERIA = [
  ['Only Edgistify could own it', 'Strong', 'Medium (with photos)', 'Weak'],
  ['Stands apart from AI templates', 'Strong', 'Weak without photos', 'Medium'],
  ['Works on cartons, tape, trucks, print', 'Strong', 'Weak', 'Medium'],
  ['Works for social posts and decks', 'Strong', 'Strong', 'Medium'],
  ['Needs a photo shoot', 'Helps, not needed', 'Needed', 'Helps, not needed'],
  ['Work on the website', 'Large: new surfaces', 'Small: strip colours', 'Medium: go light'],
  ['Teal stays the one brand colour', 'Yes, with a sticker', 'Yes, only colour', 'Yes, only colour'],
];

export default function BrandBoardPage() {
  return (
    <div className="doc bb-page">
      <div className="wrap">
        <header>
          <div className="eyebrow"><span className="dot" /> Edgistify Design System · Decision</div>
          <h1>Brand: three directions</h1>
          <div className="lede">The website today is assembled from defaults: a dark page, one accent, rounded cards, an
          italic serif word in every heading. This board draws three ways out of that. Each direction is shown as the
          same pieces, so they can be judged against each other, not against a mood. <strong>What stays in all
          three:</strong> the wordmark, the <em>E.</em> monogram and teal as the one brand colour.</div>
        </header>

        {DIRECTIONS.map((d) => (
          <section key={d.key} className="bb-sec">
            <Board d={d} />
            <div className="bb-notes">
              <div><h4>What it says</h4><p>{d.says}</p></div>
              <div><h4>Strong at</h4><ul>{d.strong.map((s) => <li key={s}>{s}</li>)}</ul></div>
              <div><h4>Watch out</h4><ul>{d.watch.map((s) => <li key={s}>{s}</li>)}</ul></div>
            </div>
          </section>
        ))}

        <section>
          <div className="sec-head"><h2>Side by side</h2>
          <p className="sub">The same questions asked of each.</p></div>
          <div className="tw">
            <table>
              <thead><tr><th /><th>A · Label</th><th>B · Quiet ink</th><th>C · Lanes</th></tr></thead>
              <tbody>{CRITERIA.map(([q, ...a]) => <tr key={q}><td className="p">{q}</td>{a.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
            </table>
          </div>

          <div className="note">
            <span className="k">RECOMMENDED</span>
            <div>
              <p><strong>A, the shipping label</strong>, with B’s photography rule inside it. It is the only direction
              built from something Edgistify physically makes, so it reaches past the website to the cartons, the
              tape, the trucks and the people’s badges. C’s lane line stays as the secondary graphic for maps and
              diagrams.</p>
              <p>Pick B if a proper photo shoot of the floors is possible soon and the site should change least.
              Pick C if the network, not the floor, is what Edgistify sells first.</p>
            </div>
          </div>

          <div className="note">
            <span className="k">ON COLOUR</span>
            <p>None of the three mixes a second colour with teal at equal strength. The saffron and indigo tried on
            the Shipping page are paused: in A, orange returns only as the sticker, a few percent of a page; in B and C
            it goes.</p>
          </div>

          <div className="note">
            <span className="k">AFTER A PICK</span>
            <p>The chosen direction’s colours and fonts become tokens here, its device becomes components (a label
            block, stickers, the lane), and a marketing kit follows: LinkedIn post and carousel, case-study cover,
            deck cover, email header, carton and tape artwork. Then the Shipping page is rebuilt in it before any
            other page.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
