import React from 'react';
import { Logo } from '../Logo.jsx';
import { BentoMotion } from './BentoMotion.jsx';

/**
 * Edgistify marketing kit — the brand and marketing layer.
 *
 * Presentational, server-safe (no hooks), and built on the same tokens as
 * the product components. Everything here expects to sit inside an element
 * carrying `.ed-mk`, which switches the type scale to reading sizes and the
 * controls to touch sizes. `SiteHeader` lives in ./Header.jsx because it
 * needs state and therefore the client.
 *
 *   import '@edgistify/design-system/marketing.css';
 *   import { Section, SectionHead, Tile } from '@edgistify/design-system/react/marketing';
 *
 * Two rules that are not in the product kit:
 *   - ONE brand button per viewport. `variant="brand"` on the hero action,
 *     `primary` (ink) everywhere else.
 *   - NO placeholder facts. A number, logo or city that is not verified is
 *     rendered through <Pending>, which the website hides in production.
 */

const cx = (...a) => a.filter(Boolean).join(' ');

/* ---------------------------------------------------------------- layout */

export function Container({ narrow = false, as: Tag = 'div', className = '', ...rest }) {
  return <Tag className={cx('ed-mk-container', narrow && 'ed-mk-container--narrow', className)} {...rest} />;
}

/** A page section. `tone`: default | tint | band. `container`: true | 'narrow' | false. */
export function Section({
  tone = 'default', tight = false, ruled = false, flushTop = false,
  container = true, as: Tag = 'section', className = '', children, ...rest
}) {
  const body = container
    ? <Container narrow={container === 'narrow'}>{children}</Container>
    : children;
  return (
    <Tag className={cx('ed-mk-section',
      tone === 'tint' && 'ed-mk-section--tint',
      tone === 'band' && 'ed-mk-section--band',
      tight && 'ed-mk-section--tight',
      ruled && 'ed-mk-section--ruled',
      flushTop && 'ed-mk-section--flush-top',
      className)} {...rest}>
      {body}
    </Tag>
  );
}

/** Eyebrow, heading, lede. `align`: left | center | row (actions on the right). */
export function SectionHead({ eyebrow, title, lede, align = 'left', level = 2, children, className = '', ...rest }) {
  const H = `h${level}`;
  const head = (
    <>
      {eyebrow && <p className="ed-mk-eyebrow">{eyebrow}</p>}
      {title && <H className="ed-mk-h2">{title}</H>}
      {lede && <p className="ed-mk-lede">{lede}</p>}
    </>
  );
  return (
    <div className={cx('ed-mk-section__head',
      align === 'center' && 'ed-mk-section__head--center',
      align === 'row' && 'ed-mk-section__head--row', className)} {...rest}>
      {align === 'row' ? <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ed-space-3)' }}>{head}</div> : head}
      {children}
    </div>
  );
}

export const Grid = ({ cols = 3, className = '', ...rest }) => (
  <div className={cx('ed-mk-grid', `ed-mk-grid--${cols}`, className)} {...rest} />
);
export const Split = ({ top = false, ratio, className = '', style, ...rest }) => (
  <div className={cx('ed-mk-split', top && 'ed-mk-split--top', className)}
       style={ratio ? { '--split': ratio, ...style } : style} {...rest} />
);
export const Actions = ({ center = false, className = '', ...rest }) => (
  <div className={cx('ed-mk-actions', center && 'ed-mk-actions--center', className)} {...rest} />
);

/* ------------------------------------------------------------------ type */

export const Display = ({ as: Tag = 'h1', className = '', ...rest }) => <Tag className={cx('ed-mk-display', className)} {...rest} />;
export const Lede    = ({ as: Tag = 'p',  className = '', ...rest }) => <Tag className={cx('ed-mk-lede', className)} {...rest} />;
export const Eyebrow = ({ as: Tag = 'p',  plain = false, className = '', ...rest }) => <Tag className={cx('ed-mk-eyebrow', plain && 'ed-mk-eyebrow--plain', className)} {...rest} />;
export const Prose   = ({ as: Tag = 'div', className = '', ...rest }) => <Tag className={cx('ed-mk-prose', className)} {...rest} />;

/* ------------------------------------------------------------- honesty */

/** The honest placeholder. Renders a dashed slot, never an invented figure. */
export function Pending({ children = 'Confirm', dots = false, className = '', ...rest }) {
  return (
    <span className={cx('ed-mk-pending', className)} {...rest}>
      {dots && <span className="ed-mk-pending__dots" aria-hidden="true">···</span>}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ tile */

/** The marketing card: one idea. */
export function Tile({
  icon, num, title, body, list, foot, tint = false, link = false,
  as: Tag = 'div', titleAs: TitleTag = 'h3', className = '', children, ...rest
}) {
  return (
    <Tag className={cx('ed-mk-tile', tint && 'ed-mk-tile--tint', link && 'ed-mk-tile--link', className)} {...rest}>
      {num && <span className="ed-mk-tile__num">{num}</span>}
      {icon && <span className="ed-mk-tile__icon" aria-hidden="true">{icon}</span>}
      {title && <TitleTag className="ed-mk-tile__title">{title}</TitleTag>}
      {body && <p className="ed-mk-tile__body">{body}</p>}
      {list && <ul className="ed-mk-tile__list">{list.map((li, i) => <li key={i}>{li}</li>)}</ul>}
      {children}
      {foot && <div className="ed-mk-tile__foot">{foot}</div>}
    </Tag>
  );
}

/** "Explore Fulfilment →". `cover` stretches the hit area over the parent tile. */
export const More = ({ cover = false, as: Tag = 'a', className = '', ...rest }) => (
  <Tag className={cx('ed-mk-more', cover && 'ed-mk-more--cover', className)} {...rest} />
);

/* ------------------------------------------------------------------ chip */

export function Chip({ pressed, current, href, as, className = '', ...rest }) {
  const Tag = as || (href ? 'a' : 'button');
  return (
    <Tag className={cx('ed-mk-chip', className)}
         href={href}
         type={Tag === 'button' ? 'button' : undefined}
         aria-pressed={Tag === 'button' && pressed !== undefined ? pressed : undefined}
         aria-current={current ? 'true' : undefined}
         {...rest} />
  );
}
export const Chips = ({ className = '', ...rest }) => <div className={cx('ed-mk-chips', className)} {...rest} />;

/* -------------------------------------------------------------- wordmark */

/* This used to set the word in Inter Bold, lowercase, with a teal period
   appended by CSS. That was a stand-in built before the brand files were
   to hand, and it was wrong in three ways: the real wordmark is drawn
   letterforms rather than Inter, it is capitalised "Edgistify", and it
   carries no trailing dot at all — the dot belongs to the E. monogram,
   which is a separate piece of artwork.

   It now renders the real wordmark. The aria-label stays on the link, and
   Logo carries alt="" inside it, so the link is announced once.

   `tone` exists because the current wordmark is a raster and cannot follow
   currentColor. Use tone="white" on the dark band. */
export const Wordmark = ({ size, tone = 'teal', as: Tag = 'a', href = '/', className = '', ...rest }) => (
  <Tag className={cx('ed-mk-wordmark', size && `ed-mk-wordmark--${size}`, className)}
       href={Tag === 'a' ? href : undefined} aria-label="Edgistify home" {...rest}>
    <Logo variant="wordmark" tone={tone} />
  </Tag>
);

/* ----------------------------------------------------------- utility bar */

export function UtilityBar({ links = [] }) {
  return (
    <div className="ed-mk-utility">
      <Container className="ed-mk-utility__in">
        {links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

export function Hero({ eyebrow, title, lede, ledeAs, actions, aside, note, variant, align, children }) {
  return (
    <section className={cx('ed-mk-hero', variant && `ed-mk-hero--${variant}`, !aside && 'ed-mk-hero--solo', align === 'center' && 'ed-mk-hero--center')}>
      <Container>
        <Split top ratio="minmax(0, 1.05fr) minmax(0, 1fr)">
          <div className="ed-mk-hero__copy">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Display>{title}</Display>
            {lede && <Lede as={ledeAs}>{lede}</Lede>}
            {children}
            {actions && <Actions>{actions}</Actions>}
            {note && <p className="ed-mk-hero__note">{note}</p>}
          </div>
          {aside && <div className="ed-mk-hero__aside">{aside}</div>}
        </Split>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------- configurator */

export function ConfigPanel({ title, hint, className = '', children, ...rest }) {
  return (
    <div className={cx('ed-mk-config', className)} {...rest}>
      {(title || hint) && (
        <div className="ed-mk-config__head">
          {title && <h2 className="ed-mk-config__title">{title}</h2>}
          {hint && <span className="ed-mk-config__hint">{hint}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
export function ConfigQuestion({ label, hint, htmlFor, children }) {
  const L = htmlFor ? 'label' : 'div';
  return (
    <div className="ed-mk-config__q">
      <L className="ed-mk-config__label" htmlFor={htmlFor}>{label}{hint && <small>{hint}</small>}</L>
      {children}
    </div>
  );
}
export const Select = ({ className = '', ...rest }) => <select className={cx('ed-mk-select', className)} {...rest} />;

/* ------------------------------------------------------------- live flow */

/**
 * events: [{ src: 'Zepto', sys?: true, text: <>Order received · <b>2 SKUs</b></>, status: 'EdgeOMS' }]
 * `animate` steps the rows in; the hero uses a still.
 */
export function Flow({ title = 'EdgeOS · Live operations', live = 'Live', events = [], note, animate = false, className = '', ...rest }) {
  return (
    <div className={cx('ed-mk-flow', animate && 'ed-mk-flow--animate', className)} role="figure" aria-label={title} {...rest}>
      <div className="ed-mk-flow__bar"><b>{title}</b>{live && <span className="ed-mk-flow__live">{live}</span>}</div>
      <div className="ed-mk-flow__body">
        {events.map((e, i) => (
          <div className="ed-mk-flow__ev" key={i} style={{ '--i': i }}>
            <span className={cx('ed-mk-flow__src', e.sys && 'ed-mk-flow__src--sys')}>{e.src}</span>
            <span className="ed-mk-flow__tx">{e.text}</span>
            {e.status && <span className="ed-mk-flow__st">{e.status}</span>}
          </div>
        ))}
      </div>
      {note && <div className="ed-mk-flow__note">{note}</div>}
    </div>
  );
}

/* ---------------------------------------------------------- setup result */

export function SetupCard({ k = 'EdgeOS · Your setup', title, services = [], notes = [], proof, actions, foot, className = '', ...rest }) {
  return (
    <div className={cx('ed-mk-setup', className)} {...rest}>
      <div>
        <p className="ed-mk-setup__k">{k}</p>
        {title && <h3 className="ed-mk-setup__title">{title}</h3>}
      </div>
      {services.length > 0 && (
        <div>
          <p className="ed-mk-setup__k">Services you'd use</p>
          <ul className="ed-mk-setup__svc">
            {services.map((s) => <li key={s.name}><b>{s.name}</b><span>{s.why}</span></li>)}
          </ul>
        </div>
      )}
      {notes.length > 0 && (
        <div>
          <p className="ed-mk-setup__k">What matters in your category</p>
          <ul className="ed-mk-setup__notes">{notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
        </div>
      )}
      {proof && <div className="ed-mk-setup__proof">{proof}</div>}
      {actions && <Actions>{actions}</Actions>}
      {foot && <div className="ed-mk-setup__foot">{foot}</div>}
    </div>
  );
}

/* --------------------------------------------------------- setup builder */

/**
 * The configurator as a section: the questions in a narrow column on the
 * left (`ask`), the live answer filling the rest (`children`).
 */
export function Builder({ ask, children, className = '', ...rest }) {
  return (
    <div className={cx('ed-mk-builder', className)} {...rest}>
      <div className="ed-mk-builder__ask">{ask}</div>
      <div className="ed-mk-builder__out">{children}</div>
    </div>
  );
}

/** Option boxes, three a row. Label the group with `label` or `labelledBy`. */
export function Ticks({ label, labelledBy, className = '', children }) {
  return <div role="group" aria-label={label} aria-labelledby={labelledBy} className={cx('ed-mk-ticks', className)}>{children}</div>;
}

/** One option box: a real checkbox inside a label that draws the box.
 *  `row` lays it out as a line (mark, label, tick); `size="sm"` tightens it. */
export function Tick({ icon, checked, onChange, row = false, size, children, className = '', ...rest }) {
  return (
    <label className={cx('ed-mk-tick', row && 'ed-mk-tick--row', size === 'sm' && 'ed-mk-tick--sm', className)}>
      <input type="checkbox" className="ed-mk-tick__input" checked={!!checked} onChange={onChange} {...rest} />
      {icon && <span className="ed-mk-tick__icon" aria-hidden="true">{icon}</span>}
      <span className="ed-mk-tick__box" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg></span>
      <span className="ed-mk-tick__label">{children}</span>
    </label>
  );
}

/** A platform's mark: its logo (`src`) or, until that arrives, its initial on `color`. */
export function Mark({ name, src, color, ink, size, className = '' }) {
  return (
    <span className={cx('ed-mk-mark', size === 'sm' && 'ed-mk-mark--sm', className)} aria-hidden="true"
      style={color ? { '--ed-mk-mark-bg': color, '--ed-mk-mark-ink': ink } : undefined}>
      {src ? <img src={src} alt="" /> : String(name || '').charAt(0)}
    </span>
  );
}

/**
 * The live answer. Every service is listed from the start: `on: true`
 * lights it, `on: false` dims it, undefined leaves it neutral. `base` is
 * the system under them all, the full width under the grid.
 */
export function SetupBoard({
  k = 'Your setup', title, chips = [], empty = false, live = 'Live', servicesLabel = "Services you'd use",
  services = [], base, noteLabel = 'What matters in your category', note, noteEmpty = false,
  proof, actions, foot, className = '', ...rest
}) {
  return (
    <section className={cx('ed-mk-board', className)} {...rest}>
      <header className="ed-mk-board__head">
        <div className="ed-mk-board__titles">
          <p className="ed-mk-board__k">{k}</p>
          <h3 className={cx('ed-mk-board__title', empty && 'is-empty')} aria-live="polite">{title}</h3>
          {chips.length > 0 && (
            <ul className="ed-mk-board__chips" aria-label="Where you sell">
              {chips.map((c) => (
                <li key={c.id || c.name} className={cx('ed-mk-board__chip', !c.mark && 'ed-mk-board__chip--plain')}>{c.mark}{c.name}</li>
              ))}
            </ul>
          )}
        </div>
        {live && <span className="ed-mk-board__live">{live}</span>}
      </header>
      <div className="ed-mk-board__block">
        <p className="ed-mk-board__k">{servicesLabel}</p>
        <ul className="ed-mk-board__svcs">
          {services.map((s) => (
            <li key={s.id || s.name} className={cx('ed-mk-board__svc', s.on === true && 'is-on', s.on === false && 'is-off')}>
              {s.icon && <span className="ed-mk-board__icon" aria-hidden="true">{s.icon}</span>}
              <span className="ed-mk-board__name">{s.name}</span>
              <span className="ed-mk-board__why" key={String(s.why)}>{s.why}</span>
            </li>
          ))}
          {base && (
            <li className="ed-mk-board__svc ed-mk-board__svc--base">
              {base.icon && <span className="ed-mk-board__icon" aria-hidden="true">{base.icon}</span>}
              <span className="ed-mk-board__name">{base.name}{base.tag && <span className="ed-mk-board__tag">{base.tag}</span>}</span>
              <span className="ed-mk-board__why">{base.why}</span>
            </li>
          )}
        </ul>
      </div>
      {note && (
        <div className="ed-mk-board__block">
          <p className="ed-mk-board__k">{noteLabel}</p>
          <p className={cx('ed-mk-board__note', noteEmpty && 'is-empty')} key={String(note)}>{note}</p>
        </div>
      )}
      {proof && <div className="ed-mk-board__proof">{proof}</div>}
      {(actions || foot) && (
        <footer className="ed-mk-board__foot">
          {actions && <Actions>{actions}</Actions>}
          {foot && <p className="ed-mk-board__aside">{foot}</p>}
        </footer>
      )}
    </section>
  );
}

/* ----------------------------------------------------------------- proof */

/** logos: [{ name, src?, href? }]. A logo with no `src` is a pending slot. */
/* ---------------------------------------------------------- bento + marquee */

const ImageGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.75" /><path d="m21 16-5-5-9 9" />
  </svg>
);

/* Ring radii (viewBox units, -500…500), the arcs that travel round them
   ([radius, % of the circle, seconds per turn, start angle, reverse]) and
   the pulse that ripples out from the hub. */
const RINGS = [70, 120, 180, 250, 330, 420, 500];
const ARCS = [[120, 16, 18, -40, false], [250, 10, 30, 140, true], [420, 7, 46, 60, false]];

/** The shared ring drawing. Every block carries one, shifted to its own
 *  place in the bento by CSS, so together they read as one set of rings. */
function BentoRings() {
  return (
    <span className="ed-mk-bento__rings" aria-hidden="true">
      <span className="ed-mk-bento__track" />
      <svg viewBox="-500 -500 1000 1000">
        {RINGS.map((r) => <circle key={r} r={r} />)}
        {ARCS.map(([r, pct, t, a0, rev]) => (
          <circle key={`a${r}`} r={r} pathLength="100" strokeDasharray={`${pct} ${100 - pct}`}
            className={rev ? 'is-hi is-rev' : 'is-hi'} style={{ '--t': `${t}s`, '--a0': `${a0}deg` }} />
        ))}
        <circle r="500" className="is-pulse" />
      </svg>
    </span>
  );
}

/** One bento block. With `image` it shows the image; without, a slot naming
 *  what belongs there (`label`). `children` replaces both. */
export function BentoTile({ image, alt = '', label, rings = true, className, children, ...rest }) {
  return (
    <figure className={cx('ed-mk-bento__tile', className)} {...rest}>
      {rings && <BentoRings />}
      {children ?? (image
        ? <img src={image} alt={alt} loading="lazy" />
        : label ? <span className="ed-mk-bento__slot"><ImageGlyph /><span>{label}</span><small>Block</small></span> : null)}
    </figure>
  );
}

/** The mark at the centre of the rings. */
export function BentoHub({ children }) {
  return <span className="ed-mk-bento__hub">{children ?? <Logo variant="mark" tone="teal" title="Edgistify" />}</span>;
}

/** Channel tiles orbiting the hub along one ring, seen through the block
 *  that holds them. items: [{ name, src? }]; they are spread evenly round
 *  the ring, repeated to fill `slots`. `duration` is seconds per turn. */
export function BentoOrbit({ items = [], slots = 12, duration = 60, label = 'Sales channels' }) {
  if (!items.length) return null;
  const n = Math.max(items.length, slots);
  return (
    <>
      <span className="ed-mk-orbit" style={{ '--ed-mk-orbit-dur': `${duration}s` }} aria-hidden="true">
        {Array.from({ length: n }, (_, i) => {
          const it = items[i % items.length];
          return (
            <span key={i} className="ed-mk-orbit__item" style={{ '--a': `${(360 / n) * i}deg` }}>
              <span className="ed-mk-orbit__chip">{it.src ? <img src={it.src} alt="" /> : it.name}</span>
            </span>
          );
        })}
      </span>
      <span className="ed-mk-sr">{label}: {items.map((it) => it.name).join(', ')}</span>
    </>
  );
}

/** Three blocks stacked vertically, joined by rings centred on the middle
 *  one (the hub). One block is open at a time (twice the height); the
 *  others give way and the rings follow the hub. items: [top, hub, bottom], each
 *  { image?, alt?, label?, children? }. The hub shows the mark unless given
 *  children. `orbit`: [{ name, src? }] channel tiles circling through the
 *  bottom block. tone: 'dark' (default) or 'light'. `cycle`: ms each block
 *  stays open in the automatic loop (false to stop it); hover holds a block
 *  open. */
export function Bento({ items = [], orbit, orbitSlots, tone = 'dark', cycle = 2000, className, ...rest }) {
  const [top = {}, hub = {}, bottom = {}] = items;
  return (
    <div className={cx('ed-mk-bento', tone === 'light' && 'ed-mk-bento--light', className)} data-open="2" {...rest}>
      {cycle ? <BentoMotion interval={cycle} /> : null}
      <div className="ed-mk-bento__grid">
        <BentoTile {...top} />
        {hub.children || hub.image ? <BentoTile {...hub} /> : <BentoTile {...hub}><BentoHub /></BentoTile>}
        <BentoTile {...bottom}>
          {bottom.children}
          {orbit && <BentoOrbit items={orbit} slots={orbitSlots} />}
          {!bottom.children && !orbit && bottom.label && <span className="ed-mk-bento__slot"><ImageGlyph /><span>{bottom.label}</span><small>Block</small></span>}
        </BentoTile>
      </div>
    </div>
  );
}

/** A product-screen frame. With `image` it shows the screenshot; without,
 *  a dashed slot naming what belongs there. */
export function Screen({ image, alt = '', label, className, ...rest }) {
  return (
    <div className={cx('ed-mk-screen', className)} {...rest}>
      {image ? <img src={image} alt={alt} loading="lazy" /> : (<>
        <div className="ed-mk-screen__bar" aria-hidden="true"><i /><i /><i /></div>
        <div className="ed-mk-screen__body"><span>{label}<small>Screenshot</small></span></div>
      </>)}
    </div>
  );
}

/** A system at a glance, drawn as a small product card: icon and name, a
 *  line, and up to three capabilities as a tree — one on top, two below. */
export function SystemCard({ icon, name, line, nodes = [], className, ...rest }) {
  const [root, ...leaves] = nodes;
  return (
    <div className={cx('ed-mk-syscard', className)} {...rest}>
      <div className="ed-mk-syscard__head">{icon && <span className="ed-mk-syscard__icon" aria-hidden="true">{icon}</span>}<b>{name}</b></div>
      {line && <p className="ed-mk-syscard__line">{line}</p>}
      <span className="ed-mk-syscard__bars" aria-hidden="true"><i /><i /></span>
      {root && (
        <div className="ed-mk-syscard__tree">
          <div className="ed-mk-syscard__node ed-mk-syscard__node--root"><b>{root}</b><span aria-hidden="true"><i /><i /></span></div>
          {leaves.length > 0 && (
            <div className="ed-mk-syscard__leaves">
              {leaves.slice(0, 2).map((l, i) => <div key={i} className="ed-mk-syscard__node"><b>{l}</b><span aria-hidden="true"><i /></span></div>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Columns under a small label, each with a hairline on top: a title and
 *  a line or two. items: [{ title, body, href?, linkLabel? }]. */
export function RuledColumns({ label, items = [], className, ...rest }) {
  return (
    <div className={cx('ed-mk-ruled', className)} {...rest}>
      {label && <p className="ed-mk-ruled__label">{label}</p>}
      <div className="ed-mk-ruled__grid">
        {items.map((it, i) => (
          <div key={i} className="ed-mk-ruled__item">
            <h3 className="ed-mk-ruled__title">{it.title}</h3>
            {it.body && <p className="ed-mk-ruled__body">{it.body}</p>}
            {it.href && <a className="ed-mk-ruled__link" href={it.href}>{it.linkLabel || 'Learn more'} <span aria-hidden="true">→</span></a>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Open loop against closed loop. open: { label, steps, end }, closed:
 *  { label, steps, back }. The closed row draws its return path from the
 *  last step back to the first. */
export function LoopCompare({ open, closed, className, ...rest }) {
  const chain = (steps) => steps.map((st, i) => (
    <React.Fragment key={i}>
      {i > 0 && <span className="ed-mk-cmp__arrow" aria-hidden="true">→</span>}
      <span className="ed-mk-cmp__step">{st}</span>
    </React.Fragment>
  ));
  return (
    <div className={cx('ed-mk-cmp', className)} role="figure" aria-label="Open loop against closed loop" {...rest}>
      {open && (
        <div className="ed-mk-cmp__row ed-mk-cmp__row--open">
          <p className="ed-mk-cmp__label">{open.label}</p>
          <div className="ed-mk-cmp__chain">{chain(open.steps)}<span className="ed-mk-cmp__stop" aria-hidden="true" /></div>
          {open.end && <p className="ed-mk-cmp__note">{open.end}</p>}
        </div>
      )}
      {closed && (
        <div className="ed-mk-cmp__row ed-mk-cmp__row--closed">
          <p className="ed-mk-cmp__label">{closed.label}</p>
          <div className="ed-mk-cmp__chain ed-mk-cmp__chain--loop">{chain(closed.steps)}</div>
          {closed.back && <p className="ed-mk-cmp__note"><span aria-hidden="true">↺</span> {closed.back}</p>}
        </div>
      )}
    </div>
  );
}

/** Monochrome logos drifting left. logos: [{ name, src? }]. A logo with no
 *  `src` shows its name in plain type until the file arrives; with neither,
 *  a dashed slot. `speed` is seconds per loop. */
export function LogoMarquee({ label, logos = [], speed = 40, variant, className, ...rest }) {
  if (!logos.length) return null;
  const row = (hidden) => (
    <ul className="ed-mk-marquee__row" aria-hidden={hidden || undefined}>
      {logos.map((l, i) => (
        <li key={i} className={cx('ed-mk-marquee__logo', !l.src && (l.name ? 'ed-mk-marquee__logo--text' : 'ed-mk-marquee__logo--empty'))}>
          {l.src ? <img src={l.src} alt={hidden ? '' : l.name} loading="lazy" height="28" /> : (l.name || 'Logo')}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cx('ed-mk-marquee', variant && `ed-mk-marquee--${variant}`, className)} style={{ '--ed-mk-marquee-dur': `${speed}s` }} {...rest}>
      {label && <p className="ed-mk-marquee__label">{label}</p>}
      <div className="ed-mk-marquee__viewport">
        <div className="ed-mk-marquee__track">{row(false)}{row(true)}</div>
      </div>
    </div>
  );
}

export function LogoStrip({ logos = [], note }) {
  return (
    <div>
      <div className="ed-mk-logos">
        {logos.map((l, i) => l.src
          ? <div className="ed-mk-logo" key={i}><img src={l.src} alt={l.name} loading="lazy" width="120" height="28" /></div>
          : <div className="ed-mk-logo ed-mk-logo--empty" key={i} aria-hidden="true">Logo</div>)}
      </div>
      {note && <p className="ed-mk-caption" style={{ marginTop: 'var(--ed-space-3)' }}>{note}</p>}
    </div>
  );
}

/** stats: [{ value, caption, verified }]. Unverified values render as <Pending>. */
export function StatStrip({ stats = [] }) {
  return (
    <div className="ed-mk-stats">
      {stats.map((s, i) => (
        <div className="ed-mk-stat" key={i}>
          <span className="ed-mk-stat__num">
            {s.verified ? s.value : <Pending dots>Confirm</Pending>}
          </span>
          <span className="ed-mk-stat__cap">{s.caption}</span>
        </div>
      ))}
    </div>
  );
}

export function Press({ label = 'Featured in', items = [] }) {
  return (
    <div className="ed-mk-press">
      <span className="ed-mk-press__l">{label}</span>
      {items.map((p) => p.href
        ? <a key={p.name} href={p.href} rel="noopener">{p.name}</a>
        : <span key={p.name}>{p.name} <Pending>link</Pending></span>)}
    </div>
  );
}

/* -------------------------------------------------------- services stack */

export function ServiceStack({ children, platform }) {
  return (
    <div className="ed-mk-stack">
      <div className="ed-mk-stack__services">{children}</div>
      {platform}
    </div>
  );
}

export function ServiceCard({ icon, name, outcome, bullets = [], metric, href, exploreLabel, cta, recommended, dim, ...rest }) {
  return (
    <Tile as="article" link icon={icon} title={name} body={outcome} list={bullets}
          className="ed-mk-service" data-recommended={recommended || undefined} data-dim={dim || undefined}
          foot={<>
            {href && <More href={href}>{exploreLabel || `Explore ${name}`}</More>}
            {cta}
          </>} {...rest}>
      {recommended && <span className="ed-mk-service__tag ed-badge ed-badge--brand">Recommended for you</span>}
      {metric && <p className="ed-mk-caption"><strong style={{ color: 'var(--ed-text)' }}>{metric.value}</strong> {metric.caption}</p>}
    </Tile>
  );
}

/** The EdgeOS band the cards sit on. modules: [{ name, note }]; apex: { eyebrow, body, link }. */
export function Platform({ badge, title, body, modules = [], apex, link }) {
  return (
    <div className="ed-mk-platform ed-mk-band">
      <div className="ed-mk-platform__apex" aria-hidden="true" />
      <div className="ed-mk-platform__in">
        <div>
          <div className="ed-mk-platform__title">
            <h3 className="ed-mk-h3">{title}</h3>
            {badge}
          </div>
          <p className="ed-mk-body" style={{ color: 'var(--ed-mk-band-text-muted)' }}>{body}</p>
          <div className="ed-mk-platform__mods">
            {modules.map((m) => <div className="ed-mk-platform__mod" key={m.name}><b>{m.name}</b><span>{m.note}</span></div>)}
          </div>
          {link && <p style={{ marginTop: 'var(--ed-space-5)' }}>{link}</p>}
        </div>
        {apex && (
          <div className="ed-mk-platform__apexcard">
            <Eyebrow>{apex.eyebrow}</Eyebrow>
            <p>{apex.body}</p>
            {apex.link}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- loop diagram */

export function LoopDiagram({ open, closed }) {
  const chain = (steps) => steps.flatMap((s, i) => i ? [<i key={'a' + i}>→</i>, <span key={i}>{s}</span>] : [<span key={i}>{s}</span>]);
  return (
    <div className="ed-mk-loop" role="figure" aria-label="Open loop versus closed loop">
      <div className="ed-mk-loop__row">
        <span className="ed-mk-loop__who">{open.who}</span>
        <div className="ed-mk-loop__chain">{chain(open.chain)}</div>
        {open.stop && <span className="ed-mk-loop__stop">{open.stop}</span>}
      </div>
      <div className="ed-mk-loop__row ed-mk-loop__row--closed">
        <span className="ed-mk-loop__who">{closed.who}</span>
        <div className="ed-mk-loop__chain">{chain(closed.chain)}</div>
        {closed.back && <span className="ed-mk-loop__back"><span aria-hidden="true">↺</span>{closed.back}</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ definition */

export function Definition({ term, children, id }) {
  return (
    <div className="ed-mk-definition" id={id}>
      <h3>{term}</h3>
      <p>{children}</p>
    </div>
  );
}

/* --------------------------------------------------------------- results */

export function ResultCard({ who, value, verified = false, caption, href, linkLabel = 'Read the case study' }) {
  return (
    <Tile as="article" link className="ed-mk-result"
          foot={href && <More href={href}>{linkLabel}</More>}>
      <span className="ed-mk-result__who">{who}</span>
      <span className="ed-mk-result__num">{verified ? value : <><span aria-hidden="true">xx%</span><Pending>Confirm</Pending></>}</span>
      {caption && <p className="ed-mk-tile__body">{caption}</p>}
    </Tile>
  );
}

export function VideoPlaceholder({ title, note }) {
  return (
    <div className="ed-mk-video" role="figure" aria-label={title}>
      <div>
        <div className="ed-mk-video__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div style={{ color: 'var(--ed-mk-band-text)', fontWeight: 600 }}>{title}</div>
        {note && <div className="ed-mk-caption" style={{ color: 'var(--ed-mk-band-text-muted)', marginTop: 4 }}>{note}</div>}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- network */

/** cities: [{ name, count, verified }]. The list is the crawlable truth; the map is for people. */
export function Network({ cities = [], mapLabel = 'Network map', children }) {
  return (
    <Split top>
      <div className="ed-mk-network__map" role="img" aria-label={mapLabel}>{children || mapLabel}</div>
      <ul className="ed-mk-network__list">
        {cities.map((c) => (
          <li key={c.name}><span>{c.name}</span><span>{c.verified ? c.count : <Pending>Confirm</Pending>}</span></li>
        ))}
      </ul>
    </Split>
  );
}

/* ----------------------------------------------------------------- steps */

export function Steps({ steps = [] }) {
  return (
    <ol className="ed-mk-steps">
      {steps.map((s) => (
        <li className="ed-mk-step" key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
          {s.duration && <small>{s.duration}</small>}
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------- pricing */

export function PricingCard({ audience, title, body }) {
  return (
    <Tile as="article" tint className="ed-mk-price" title={title} body={body}>
      <span className="ed-mk-price__for" style={{ order: -1 }}>{audience}</span>
    </Tile>
  );
}
export const PricingRule = ({ children }) => <div className="ed-mk-price__rule">{children}</div>;

/* ------------------------------------------------------------------- faq */

/** items: [{ q, a }] — `a` may be a string or nodes. Native <details>; open by default is a prop per item. */
export function Faq({ items = [] }) {
  return (
    <div className="ed-mk-faq">
      {items.map((it, i) => (
        <details className="ed-mk-faq__item" key={i} open={it.open || undefined}>
          <summary className="ed-mk-faq__q"><h3 style={{ font: 'inherit', margin: 0 }}>{it.q}</h3></summary>
          <div className="ed-mk-faq__a">{typeof it.a === 'string' ? <p>{it.a}</p> : it.a}</div>
        </details>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- cta band */

export function CtaBand({ eyebrow, title, lede, actions, note }) {
  return (
    <div className="ed-mk-cta">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="ed-mk-h2">{title}</h2>
      {lede && <Lede>{lede}</Lede>}
      {actions && <Actions center>{actions}</Actions>}
      {note && <p className="ed-mk-caption">{note}</p>}
    </div>
  );
}

/** doors: [{ k, title, body, href }] */
export function Doors({ doors = [] }) {
  return (
    <div className="ed-mk-doors">
      {doors.map((d, i) => (
        <a className="ed-mk-door" href={d.href} key={i}>
          <span className="ed-mk-door__k">{d.k}</span>
          <b>{d.title}</b>
          <span>{d.body}</span>
        </a>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- footer */

/**
 * columns: [{ title, links: [{ label, href, tag? }] }]
 * legal: { legalName, address, phone, email, grievance }
 */
/** `tone`: light (default) | ink — ink for a page that is dark to the bottom. */
export function Footer({ description, columns = [], legal, links = [], copyright, art, tone = 'light' }) {
  return (
    <footer className={cx('ed-mk-footer', tone === 'ink' && 'ed-mk-band ed-mk-footer--ink')}>
      <Container>
        <div className="ed-mk-footer__grid" style={{ '--cols': columns.length }}>
          <div className="ed-mk-footer__brand">
            <Wordmark />
            {description && <p>{description}</p>}
            {art && <div className="ed-mk-footer__art">{art}</div>}
          </div>
          {columns.map((c) => (
            <div className="ed-mk-footer__col" key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l, i) => (
                  <li key={i}>
                    <a href={l.href}>{l.label}</a>
                    {l.tag && <span className="ed-badge ed-badge--neutral ed-badge--sm">{l.tag}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ed-mk-footer__legal">
          {legal && (
            <address>
              <b>{legal.legalName}</b><br />
              {legal.address}<br />
              {legal.phone && <a href={`tel:${legal.phone.replace(/[^+\d]/g, '')}`}>{legal.phone}</a>}
              {legal.phone && legal.email && ' · '}
              {legal.email && <a href={`mailto:${legal.email}`}>{legal.email}</a>}
              {legal.grievance && <><br />Grievance officer: <a href={`mailto:${legal.grievance}`}>{legal.grievance}</a></>}
            </address>
          )}
          <div>
            <div className="ed-mk-footer__links">{links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}</div>
            <div style={{ marginTop: 'var(--ed-space-2)' }}>{copyright}</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ------------------------------------------------------------- wave mesh */

/**
 * A wireframe wave surface for the dark, lit backdrop: stacked lines
 * displaced by the same wave field, so they read as one rippling sheet.
 * Generated here deterministically (no randomness, so server and client
 * draw the same thing) and stroked in teal, fading towards the edges.
 * Drop it as the first child of a `.ed-mk-glow` section.
 *
 *   <Section tone="band" className="ed-mk-glow"><WaveMesh />…</Section>
 */
export function WaveMesh({ lines = 44, width = 1600, height = 640, className = '', ...rest }) {
  const step = 32;
  const paths = [];
  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const base = 90 + t * 440;
    const d = [];
    for (let x = -step; x <= width + step; x += step) {
      const rise = 150 * Math.exp(-(((x - 1180) / 260) ** 2)) * (1 - t * 0.45)
                 + 95 * Math.exp(-(((x - 260) / 300) ** 2)) * (1 - t * 0.3);
      const y = base
        + 46 * Math.sin(x / 300 + i * 0.13)
        + 22 * Math.sin(x / 120 - i * 0.07 + 1.3)
        - rise;
      d.push(`${x === -step ? 'M' : 'L'}${x} ${y.toFixed(1)}`);
    }
    paths.push(<path key={i} d={d.join(' ')} style={{ opacity: 0.35 + 0.6 * (1 - Math.abs(t - 0.45) * 1.6) }} />);
  }
  return (
    <svg className={cx('ed-mk-wave', className)} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id="ed-mk-wave-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--ed-teal-700)" />
          <stop offset=".5" stopColor="var(--ed-teal-300)" />
          <stop offset="1" stopColor="var(--ed-teal-700)" />
        </linearGradient>
        <linearGradient id="ed-mk-wave-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset=".12" stopColor="#fff" stopOpacity="1" />
          <stop offset=".88" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <mask id="ed-mk-wave-mask"><rect width={width} height={height} fill="url(#ed-mk-wave-fade)" /></mask>
      </defs>
      <g fill="none" stroke="url(#ed-mk-wave-stroke)" strokeWidth="1.1" mask="url(#ed-mk-wave-mask)">{paths}</g>
    </svg>
  );
}

/* -------------------------------------------------------------- explorer */

/**
 * A side list and a panel: one quarter areas, three quarters the chosen
 * area's content. Selection state belongs to the page; these are the
 * surfaces.
 *
 *   <Explorer>
 *     <ExplorerNav groups={[{ label, items: [{ id, title }] }]} current={id} onSelect={setId} />
 *     <ExplorerPanel title lede>
 *       <FeatureCard title body figure? />
 *     </ExplorerPanel>
 *   </Explorer>
 */
export const Explorer = ({ className = '', ...rest }) => <div className={cx('ed-mk-explorer', className)} {...rest} />;

export function ExplorerNav({ label, groups = [], current, onSelect, hrefFor }) {
  return (
    <nav className="ed-mk-explorer__nav" aria-label={label || 'Areas'}>
      {groups.map((g, gi) => (
        <div className="ed-mk-explorer__group" key={gi}>
          {g.label && <p className="ed-mk-explorer__label">{g.label}</p>}
          {g.items.map((it) => {
            const sel = it.id === current;
            return hrefFor
              ? <a key={it.id} className="ed-mk-explorer__item" href={hrefFor(it)} aria-current={sel ? 'true' : undefined}
                   onClick={onSelect ? (e) => { e.preventDefault(); onSelect(it.id); } : undefined}>{it.title}</a>
              : <button key={it.id} type="button" className="ed-mk-explorer__item" aria-current={sel ? 'true' : undefined}
                        onClick={() => onSelect?.(it.id)}>{it.title}</button>;
          })}
        </div>
      ))}
    </nav>
  );
}

/** `eyebrow` is the area's name; `title` the line that describes it. `cols`: 2 (default) or 3. */
export function ExplorerPanel({ eyebrow, title, lede, cols = 2, children, className = '', ...rest }) {
  return (
    <div className={cx('ed-mk-explorer__panel', className)} {...rest}>
      {(eyebrow || title || lede) && (
        <div className="ed-mk-explorer__head">
          {eyebrow && <p className="ed-mk-eyebrow">{eyebrow}</p>}
          {title && <h2 className="ed-mk-explorer__title">{title}</h2>}
          {lede && <p className="ed-mk-lede">{lede}</p>}
        </div>
      )}
      <div className={cx('ed-mk-explorer__grid', cols === 3 && 'ed-mk-explorer__grid--3')}>{children}</div>
    </div>
  );
}

export function FeatureCard({ title, body, figure, className = '', children, ...rest }) {
  return (
    <article className={cx('ed-mk-feature', className)} {...rest}>
      <div className="ed-mk-feature__body">
        {title && <h3 className="ed-mk-feature__title">{title}</h3>}
        {body && <p className="ed-mk-feature__text">{body}</p>}
        {children}
      </div>
      {figure && <div className="ed-mk-feature__figure">{figure}</div>}
    </article>
  );
}

/* ------------------------------------------------------------- showcase */

/**
 * Image on top (two thirds), title and one line below (one third). A link
 * when `href` is given: on hover the card lifts, a teal light runs round
 * its edge and an arrow appears beside the title.
 */
export function ShowcaseCard({ title, body, image, alt = '', media, href, as, className = '', children, ...rest }) {
  const Tag = as || (href ? 'a' : 'article');
  return (
    <Tag className={cx('ed-mk-showcase', className)} href={href} {...rest}>
      {/* `media` replaces the image with anything — an illustration, a live
          figure — on a dark ground. */}
      <div className={cx('ed-mk-showcase__media', media && 'ed-mk-showcase__media--dark')} aria-hidden={image || media ? undefined : 'true'}>
        {media ?? (image && <img src={image} alt={alt} loading="lazy" />)}
      </div>
      <div className="ed-mk-showcase__body">
        <h3 className="ed-mk-showcase__title">
          {title}
          {href && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>}
        </h3>
        {body && <p className="ed-mk-showcase__text">{body}</p>}
        {children}
      </div>
    </Tag>
  );
}

/**
 * Pointer handler for the showcase card's edge light. Writes the cursor's
 * position into --mx/--my on the card, which the ring's gradient reads.
 * Pass it from a client component: <ShowcaseCard onPointerMove={spotlight} />
 */
export function spotlight(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
