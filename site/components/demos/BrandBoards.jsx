import { Logo } from '@edgistify/design-system/react/Logo';

/* The brand board's three directions, each drawn as the same set of
   pieces so they can be judged side by side: the website's first screen,
   a LinkedIn post, the graphic device on its own, and a physical thing
   (a carton, a card, a truck). Copy and figures are samples. */

/* A barcode from a string: bar and gap widths come from its characters,
   so the same AWB always draws the same bars. */
export function Barcode({ code = '4471029318', className = '' }) {
  const bars = [];
  let x = 0;
  [...code.repeat(Math.ceil(48 / code.length)).slice(0, 48)].forEach((ch, i) => {
    const c = ch.charCodeAt(0) + i;
    const w = (c % 3) * 0.8 + 0.6;
    bars.push(<rect key={i} x={x.toFixed(1)} width={w.toFixed(1)} height="20" />);
    x += w + (c % 2) * 0.8 + 0.7;
  });
  return (
    <svg className={`bb-code ${className}`} viewBox={`0 0 ${x.toFixed(1)} 20`} preserveAspectRatio="none" aria-hidden="true">
      <g fill="currentColor">{bars}</g>
    </svg>
  );
}

/* A photo that has not been taken yet: the frame, what it should show,
   and the timestamp caption that direction B puts on every photo. */
const Photo = ({ shows, stamp, className = '' }) => (
  <div className={`bb-photo ${className}`}>
    <span className="bb-photo__shows">Photo: {shows}</span>
    {stamp && <span className="bb-photo__stamp">{stamp}</span>}
  </div>
);

/* A lane: origin dot, a shallow curve, a ring at the far end. */
const Lanes = ({ className = '', ends = [[100, 12], [158, 24], [194, 54], [176, 92]] }) => (
  <svg className={`bb-lanes ${className}`} viewBox="0 0 200 100" aria-hidden="true">
    {ends.map(([x, y]) => {
      const cx = (24 + x) / 2 - (y - 80) * 0.2, cy = (80 + y) / 2 + (x - 24) * 0.12;
      return <path key={`${x},${y}`} className="bb-lanes__lane" d={`M24 80Q${cx} ${cy} ${x} ${y}`} />;
    })}
    {ends.map(([x, y]) => <circle key={`r${x},${y}`} className="bb-lanes__to" cx={x} cy={y} r="3.2" />)}
    <circle className="bb-lanes__from" cx="24" cy="80" r="5.5" />
  </svg>
);

/* ── A. The shipping label ───────────────────────────────────────── */

const A = {
  hero: (
    <div className="mk mk--hero a-hero">
      <div className="a-hero__bar">
        <Logo variant="wordmark" tone="teal" className="a-hero__logo" />
        <span className="a-mono">Services&nbsp;&nbsp;Network&nbsp;&nbsp;Pricing</span>
        <span className="a-btn">Get rates →</span>
      </div>
      <div className="a-hero__grid">
        <div className="a-box a-box--title">
          <span className="a-k">Service</span>
          <h3 className="a-disp">Warehousing, fulfilment and shipping for Indian brands.</h3>
        </div>
        <div className="a-box"><span className="a-k">Pincodes</span><b className="a-disp">27,000+</b></div>
        <div className="a-box"><span className="a-k">Parcels a day</span><b className="a-disp">1 lakh+</b></div>
        <div className="a-box a-box--code"><Barcode /><span className="a-mono">AWB 4471 0293 18</span></div>
      </div>
      <span className="a-sticker">Priority</span>
    </div>
  ),
  post: (
    <div className="mk mk--post a-post">
      <div className="a-post__row"><Logo variant="wordmark" tone="black" className="a-post__logo" /><span className="a-mono">Case study 04</span></div>
      <div className="a-post__row a-post__row--to">
        <div><span className="a-k">From</span><b>D2C skincare brand</b></div>
        <div><span className="a-k">To</span><b>Every pincode we serve</b></div>
      </div>
      <h3 className="a-disp a-post__big">Fewer returns. Same couriers.</h3>
      <div className="a-post__row a-post__foot"><Barcode code="0402" /><span className="a-zone"><span className="a-k">Zone</span>C</span></div>
      <span className="a-sticker a-sticker--post">Read →</span>
    </div>
  ),
  device: (
    <div className="mk a-device">
      <div className="a-stickers">
        <span className="a-sticker a-sticker--flat">Priority</span>
        <span className="a-tag a-tag--teal">Zone C</span>
        <span className="a-tag a-tag--ink">Packed by Edgistify</span>
        <span className="a-tag">COD</span>
        <span className="a-tag">Weight checked</span>
      </div>
      <div className="a-anatomy">
        <div className="a-anatomy__row"><span>Brand</span><span>Reference</span></div>
        <div className="a-anatomy__row a-anatomy__row--big"><span>Message</span><span>Figure</span></div>
        <div className="a-anatomy__row"><span>Proof (code, pincode, date)</span></div>
      </div>
    </div>
  ),
  thing: (
    <div className="mk mk--wide a-thing">
      <div className="a-carton">
        <div className="a-tape" aria-hidden="true"><span>Packed by Edgistify · Weighed at pack · Packed by Edgistify · Weighed at pack · Packed by Edgistify ·</span></div>
        <div className="a-carton__label">
          <div className="a-carton__top"><Logo variant="wordmark" tone="black" /><span className="a-mono">MUM → BLR</span></div>
          <Barcode code="77120" />
        </div>
        <span className="a-sticker a-sticker--carton">Priority</span>
      </div>
      <div className="a-card">
        <Logo variant="wordmark" tone="teal" className="a-card__logo" />
        <div><b>Shift lead, Inbound</b><span className="a-mono">+91 00000 00000</span></div>
        <Barcode code="91" />
      </div>
    </div>
  ),
};

/* ── B. Quiet ink ────────────────────────────────────────────────── */

const B = {
  hero: (
    <div className="mk mk--hero b-hero">
      <div className="b-hero__bar">
        <Logo variant="wordmark" tone="white" className="b-hero__logo" />
        <span>Services&nbsp;&nbsp;&nbsp;Network&nbsp;&nbsp;&nbsp;Pricing</span>
        <span className="b-btn">Get rates</span>
      </div>
      <div className="b-hero__body">
        <div className="b-hero__copy">
          <h3 className="b-disp">Warehousing, fulfilment and shipping for Indian brands.</h3>
          <p>Our floors, our people, our software.</p>
          <div className="b-hero__figs"><span><b>27,000+</b>pincodes</span><span><b>1 lakh+</b>parcels a day</span></div>
        </div>
        <Photo className="b-hero__photo" shows="the packing line at shift change" stamp="MUMBAI · OUTBOUND · 06:12" />
      </div>
    </div>
  ),
  post: (
    <div className="mk mk--post b-post">
      <Photo className="b-post__photo" shows="a packer's hands, close" stamp="BENGALURU · PACKING · 14:40" />
      <div className="b-post__cap">
        <h3 className="b-disp">Every parcel is weighed before it leaves.</h3>
        <Logo variant="wordmark" tone="white" className="b-post__logo" />
      </div>
    </div>
  ),
  device: (
    <div className="mk b-device">
      <Photo className="b-device__photo" shows="any real moment on the floor" stamp="DELHI NCR · INBOUND · 09:05" />
      <ul className="b-rules">
        <li>Our own floors and people only, no stock photos</li>
        <li>Every photo carries a place and time</li>
        <li>Teal only for the action and the key figure</li>
      </ul>
    </div>
  ),
  thing: (
    <div className="mk mk--wide b-thing">
      <div className="b-card">
        <Logo className="b-card__mark" />
        <div><b>Shift lead, Inbound</b><span>+91 00000 00000</span></div>
      </div>
      <div className="b-card b-card--back"><Logo variant="wordmark" tone="white" className="b-card__word" /></div>
      <div className="b-badge">
        <span className="b-badge__hole" />
        <Photo className="b-badge__photo" shows="staff portrait" />
        <b>Operations</b>
        <span>MUMBAI · ID 0042</span>
      </div>
    </div>
  ),
};

/* ── C. Lanes ────────────────────────────────────────────────────── */

const C = {
  hero: (
    <div className="mk mk--hero c-hero">
      <div className="c-hero__bar">
        <Logo variant="wordmark" tone="teal" className="c-hero__logo" />
        <span>Services&nbsp;&nbsp;&nbsp;Network&nbsp;&nbsp;&nbsp;Pricing</span>
        <span className="c-btn">Get rates</span>
      </div>
      <div className="c-hero__body">
        <h3 className="c-disp">One floor.<br />Every lane in India.</h3>
        <Lanes className="c-hero__lanes" />
      </div>
      <div className="c-hero__figs"><span><b>27,000+</b> pincodes</span><span><b>1 lakh+</b> parcels a day</span></div>
    </div>
  ),
  post: (
    <div className="mk mk--post c-post">
      <span className="c-k">From Mumbai / Thane</span>
      <Lanes className="c-post__lanes" ends={[[150, 30], [186, 64], [110, 12], [176, 90], [130, 88]]} />
      <h3 className="c-disp">New lanes from Mumbai this month.</h3>
      <Logo variant="wordmark" tone="white" className="c-post__logo" />
    </div>
  ),
  device: (
    <div className="mk c-device">
      <Lanes className="c-device__lanes" ends={[[180, 30]]} />
      <dl className="c-anatomy">
        <div><dt><i className="c-dot c-dot--from" /></dt><dd>Where it leaves: always solid</dd></div>
        <div><dt><i className="c-line" /></dt><dd>The lane: one weight, one curve</dd></div>
        <div><dt><i className="c-dot" /></dt><dd>Where it lands: an open ring</dd></div>
      </dl>
    </div>
  ),
  thing: (
    <div className="mk mk--wide c-thing">
      <div className="c-truck">
        <div className="c-truck__box">
          <Lanes className="c-truck__lanes" ends={[[196, 34], [150, 14]]} />
          <Logo variant="wordmark" tone="teal" className="c-truck__logo" />
        </div>
        <div className="c-truck__cab" />
        <i className="c-truck__wheel" style={{ left: '14%' }} /><i className="c-truck__wheel" style={{ left: '62%' }} /><i className="c-truck__wheel" style={{ left: '86%' }} />
      </div>
    </div>
  ),
};

export const DIRECTIONS = { a: A, b: B, c: C };

/** A board: the direction's pieces, its palette and its type, in its world. */
export function Board({ d }) {
  const art = DIRECTIONS[d.key];
  return (
    <div className={`bb bb--${d.key}`}>
      <div className="bb__head">
        <span className="bb__letter">{d.key.toUpperCase()}</span>
        <div><h2>{d.name}</h2><p>{d.idea}</p></div>
      </div>
      <div className="bb__grid">
        <figure className="bb__cell bb__cell--hero">{art.hero}<figcaption>Website, first screen</figcaption></figure>
        <figure className="bb__cell">{art.post}<figcaption>LinkedIn post</figcaption></figure>
        <figure className="bb__cell">
          <div className="bb-pal">
            <div className="bb-pal__bar">{d.palette.map((c) => <i key={c.name} style={{ flex: c.share, background: c.hex }} title={`${c.name} ${c.share}%`} />)}</div>
            <ul>{d.palette.map((c) => (
              <li key={c.name}><i style={{ background: c.hex }} /><b>{c.name}</b><span className="bb-mono">{c.token || c.hex}</span><small>{c.share}% · {c.role}</small></li>
            ))}</ul>
          </div>
          <figcaption>Colour, by share of a page</figcaption>
        </figure>
        <figure className="bb__cell">
          <div className="bb-type">
            <p className="bb-type__disp">{d.type.sample}</p>
            <p className="bb-type__body">We pick, pack and ship from our own floors, and run every order on EdgeOS.</p>
            <p className="bb-type__mono">AWB 4471 0293 18 · 400 601</p>
            <ul>{d.type.faces.map(([role, face]) => <li key={role}><span>{role}</span>{face}</li>)}</ul>
          </div>
          <figcaption>Type</figcaption>
        </figure>
        <figure className="bb__cell">{art.device}<figcaption>{d.device}</figcaption></figure>
        <figure className="bb__cell bb__cell--wide">{art.thing}<figcaption>{d.thing}</figcaption></figure>
      </div>
    </div>
  );
}
