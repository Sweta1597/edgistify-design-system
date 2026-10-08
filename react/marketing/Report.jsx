'use client';
import { useId, useLayoutEffect, useRef } from 'react';
import { Modal } from '../Modal.jsx';

const cx = (...a) => a.filter(Boolean).join(' ');

const I = {
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>,
};

/**
 * A report in a dialog: white, whatever the page behind it. A header (the
 * title on the left; a tag, an edit button and close on the right), ruled
 * sections in a body that scrolls, and a thin footer (`helpful` on the
 * left, `actions` on the right). The system's Modal underneath: a native
 * dialog, so focus is trapped, Escape closes and the page is inert.
 * `origin` (a ref to what opened it) makes it rise out of that place.
 */
export function ReportDialog({
  open, onClose, title, tag, onEdit, editLabel = 'Edit your search',
  helpful, actions, origin, children, className = '',
}) {
  const id = useId();
  const ref = useRef(null);
  // Before the dialog shows: how far its centre is from the opener's.
  useLayoutEffect(() => {
    const el = ref.current, from = origin?.current;
    if (!open || !el || !from) return;
    const r = from.getBoundingClientRect();
    el.style.setProperty('--ed-mk-report-from', `${Math.round(r.top + r.height / 2 - window.innerHeight / 2)}px`);
  }, [open, origin]);
  return (
    <Modal ref={ref} open={open} onClose={onClose} size="xl" showClose={false}
      className={cx('ed-mk-report', className)} aria-labelledby={`${id}-title`}>
      <header className="ed-mk-report__head">
        <h2 className="ed-mk-report__title" id={`${id}-title`}>{title}</h2>
        <div className="ed-mk-report__side">
          {tag && <span className="ed-mk-report__tag">{tag}</span>}
          {onEdit && (
            <button type="button" className="ed-mk-report__iconbtn" aria-label={editLabel} title={editLabel} onClick={onEdit}>{I.edit}</button>
          )}
          <button type="button" className="ed-mk-report__iconbtn" aria-label="Close" title="Close" onClick={onClose}>{I.x}</button>
        </div>
      </header>
      <div className="ed-modal__body ed-mk-report__body">{children}</div>
      {(helpful || actions) && (
        <footer className="ed-mk-report__foot">
          <div className="ed-mk-report__helpful">{helpful}</div>
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
