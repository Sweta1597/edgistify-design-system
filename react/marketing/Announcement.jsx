'use client';

import React, { useEffect, useState } from 'react';
import { Container } from './index.jsx';

const cx = (...a) => a.filter(Boolean).join(' ');

const Arrow = ({ external }) => external
  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
  : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

/**
 * The announcement bar: one line above the header, sitewide.
 *
 *   link:           <Announcement href="/newsletter">Join the newsletter</Announcement>
 *   text + link:    <Announcement message="…" href="/newsletter" linkLabel="Subscribe" />
 *   text + button:  <Announcement message="…" action={<Button size="xs">Register</Button>} />
 *
 * `tone`: ink (default) | brand | tint.  `external` draws the ↗ arrow and
 * opens a new tab.  `end` puts something small at the right edge — the
 * website uses a Login text button there. Every bar has a close button; the choice is kept in
 * localStorage under `id`, so a new id shows the bar again. Pass
 * `dismissible={false}` only for a notice people must not lose. It renders
 * on the server and hides after mount when dismissed, so the HTML — and a
 * crawler — always has the message.
 */
export function Announcement({
  id = 'default', tone = 'ink', href, external = false, message, linkLabel, action,
  dismissible = true, end, className = '', children,
}) {
  const key = `ed-announce:${id}`;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!dismissible) return;
    try { if (localStorage.getItem(key) === '1') setHidden(true); } catch { /* storage blocked */ }
  }, [dismissible, key]);

  const dismiss = () => {
    setHidden(true);
    try { localStorage.setItem(key, '1'); } catch { /* storage blocked */ }
  };

  if (hidden) return null;

  const linkProps = external ? { target: '_blank', rel: 'noopener' } : {};
  const link = (label) => (
    <a className={cx('ed-mk-announce__link', external && 'ed-mk-announce__link--external')} href={href} {...linkProps}>
      {label}<Arrow external={external} />
    </a>
  );

  return (
    <div className={cx('ed-mk-announce', tone === 'ink' && 'ed-mk-band', tone !== 'ink' && `ed-mk-announce--${tone}`,
                       end && 'ed-mk-announce--has-end', className)} role="region" aria-label="Announcement">
      <Container className="ed-mk-announce__in">
        {/* format 1: the whole line is the link */}
        {href && !message && link(children)}
        {/* format 2 and 3: a statement, then a link or a button */}
        {message && <p className="ed-mk-announce__msg">{message}</p>}
        {message && href && link(linkLabel || children || 'Learn more')}
        {action}
      </Container>
      {(end || dismissible) && (
        <div className="ed-mk-announce__end">
          {end}
          {dismissible && (
            <button type="button" className="ed-mk-announce__close" aria-label="Dismiss announcement" onClick={dismiss}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
