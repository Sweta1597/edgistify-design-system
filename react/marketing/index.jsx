import React from 'react';
import { Logo } from '../Logo.jsx';

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
   Logo is aria-hidden inside it, so the link is announced once. */
export const Wordmark = ({ size, as: Tag = 'a', href = '/', className = '', ...rest }) => (
  <Tag className={cx('ed-mk-wordmark', size && `ed-mk-wordmark--${size}`, className)}
       href={Tag === 'a' ? href : undefined} aria-label="Edgistify home" {...rest}>
    <Logo variant="wordmark" />
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

export function Hero({ eyebrow, title, lede, actions, aside, note, children }) {
  return (
    <section className="ed-mk-hero">
      <Container>
        <Split top ratio="minmax(0, 1.05fr) minmax(0, 1fr)">
          <div className="ed-mk-hero__copy">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Display>{title}</Display>
            {lede && <Lede>{lede}</Lede>}
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

/* ----------------------------------------------------------------- proof */

/** logos: [{ name, src?, href? }]. A logo with no `src` is a pending slot. */
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
export function Footer({ description, columns = [], legal, links = [], copyright }) {
  return (
    <footer className="ed-mk-footer">
      <Container>
        <div className="ed-mk-footer__grid" style={{ '--cols': columns.length }}>
          <div className="ed-mk-footer__brand">
            <Wordmark />
            {description && <p>{description}</p>}
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
