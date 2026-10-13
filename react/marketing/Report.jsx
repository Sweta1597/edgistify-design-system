'use client';
import { useEffect, useId, useLayoutEffect, useRef } from 'react';
import { Modal } from '../Modal.jsx';

const cx = (...a) => a.filter(Boolean).join(' ');

const I = {
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>,
};

/**
 * A report in a dialog: white, whatever the page behind it. A header (the
 * title on the left; a tag, an edit button and close on the right), ruled
 * sections in a body that scrolls, and a thin footer (`footStart` — or
 * `helpful` — on the left, `actions` on the right). The system's Modal
 * underneath: a native dialog, so focus is trapped, Escape closes and the
 * page is inert. `origin` (a ref to what opened it) makes it rise out of
 * that place.
 * `sheet`: a module the width of the window, from a small gap under its
 * top to the bottom edge, rising from below. Under the header `strip`;
 * then, with `aside`, a split — `aside` in the left quarter, the report in
 * the right three — each scrolling on its own; the footer on the bottom.
 * `titleAside`: beside the title, after a hairline (e.g. a small "Trusted
 * by" line), in place of a strip of its own.
 * `bar`: a row under the strip, before the split, for the questions asked
 * again (its first child, e.g. a FieldBar, then a note). With `origin`,
 * the sheet fades in where it stands and that first child starts exactly
 * over the opener — the search the visitor just used — and glides into
 * its place, widening as it goes: the same control, carried into the
 * module, so it reads as "carry on choosing here".
 */
export function ReportDialog({
  open, onClose, title, tag, onEdit, editLabel = 'Edit your search',
  helpful, footStart = helpful, actions, origin, sheet = false, strip, titleAside, bar, aside, children, className = '',
}) {
  const id = useId();
  const ref = useRef(null);
  const barRef = useRef(null);
  const carried = Boolean(sheet && bar && origin);
  // Before the dialog shows: how far its centre is from the opener's.
  useLayoutEffect(() => {
    const el = ref.current, from = origin?.current;
    if (!open || !el || !from) return;
    const r = from.getBoundingClientRect();
    el.style.setProperty('--ed-mk-report-from', `${Math.round(r.top + r.height / 2 - window.innerHeight / 2)}px`);
  }, [open, origin]);
  /* Once the dialog shows (the Modal's own effect has run): the bar's first
     child from over the opener to its place, widening as it goes. */
  useEffect(() => {
    const el = barRef.current?.firstElementChild, from = origin?.current;
    if (!open || !carried || !el || !from || !el.animate) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const a = from.getBoundingClientRect(), b = el.getBoundingClientRect();
    if (!a.width || !b.width) return;
    const cut = Math.max(0, b.width - a.width);
    const r = getComputedStyle(el).borderRadius || '16px';
    el.animate([
      { transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)`, clipPath: `inset(0 ${cut}px 0 0 round ${r})` },
      { transform: 'none', clipPath: `inset(0 0 0 0 round ${r})` },
    ], { duration: 640, easing: 'cubic-bezier(.2, .8, .2, 1)' });
  }, [open, carried, origin]);
  return (
    <Modal ref={ref} open={open} onClose={onClose} size="xl" showClose={false}
      className={cx('ed-mk-report', sheet && 'ed-mk-report--sheet', carried && 'ed-mk-report--carried', className)} aria-labelledby={`${id}-title`}>
      <header className="ed-mk-report__head">
        <h2 className="ed-mk-report__title" id={`${id}-title`}>{title}</h2>
        {titleAside && <div className="ed-mk-report__titleaside">{titleAside}</div>}
        <div className="ed-mk-report__side">
          {tag && <span className="ed-mk-report__tag">{tag}</span>}
          {onEdit && (
            <button type="button" className="ed-mk-report__iconbtn" aria-label={editLabel} title={editLabel} onClick={onEdit}>{I.edit}</button>
          )}
          <button type="button" className="ed-mk-report__iconbtn" aria-label="Close" title="Close" onClick={onClose}>{I.x}</button>
        </div>
      </header>
      {strip && <div className="ed-mk-report__strip">{strip}</div>}
      {bar && <div className="ed-mk-report__bar" ref={barRef}>{bar}</div>}
      {aside ? (
        <div className="ed-mk-report__split">
          <aside className="ed-mk-report__aside">{aside}</aside>
          <div className="ed-modal__body ed-mk-report__body">{children}</div>
        </div>
      ) : <div className="ed-modal__body ed-mk-report__body">{children}</div>}
      {(footStart || actions) && (
        <footer className="ed-mk-report__foot">
          <div className="ed-mk-report__helpful">{footStart}</div>
          <div className="ed-mk-report__actions">{actions}</div>
        </footer>
      )}
    </Modal>
  );
}

/** One ruled part of the report, under a small label. */
export function ReportSection({ label, children, className = '' }) {
  return (
    <section className={cx('ed-mk-report__sec', className)}>
      {label && <h3 className="ed-mk-report__label">{label}</h3>}
      {children}
    </section>
  );
}
