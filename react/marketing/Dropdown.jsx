'use client';
import { useLayoutEffect, useRef } from 'react';
import { Popover, useDropdown } from '../Popover.jsx';

const cx = (...a) => a.filter(Boolean).join(' ');

/* A select-looking button that opens a panel of anything: here, a nested
   list of checkboxes (channels, and the platforms under each ticked one).
   The panel is the system's Popover, so it sits in the top layer, closes on
   an outside click or Escape, and the arrow keys walk its controls.
   `value` is what the closed button shows; `placeholder` until there is one.
   `onOpenChange(open)` hears it open and close; `matchWidth={false}` lets
   the panel be wider than a narrow trigger (at least 300px). */
export function Dropdown({ id, value, placeholder = 'Choose', label, footer, onOpenChange, matchWidth = true, children, className = '', panelClassName = '' }) {
  const dd = useDropdown({ onOpenChange });
  return (
    <div className={cx('ed-mk-dd', className)}>
      <button type="button" id={id} className="ed-mk-select ed-mk-dd__trigger" aria-label={label} {...dd.triggerProps}>
        {value || <span className="ed-mk-dd__placeholder">{placeholder}</span>}
      </button>
      <Popover {...dd.popoverProps} matchWidth={matchWidth} className={cx('ed-mk-dd__panel', !matchWidth && 'ed-mk-dd__panel--wide', panelClassName)} aria-label={label}>
        <div className="ed-mk-dd__body">{typeof children === 'function' ? children({ close: dd.close }) : children}</div>
        {footer !== false && (
          <div className="ed-mk-dd__foot">
            {footer}
            <button type="button" className="ed-mk-dd__done" onClick={dd.close}>Done</button>
          </div>
        )}
      </Popover>
    </div>
  );
}

/**
 * A second panel that opens beside a row of a Dropdown's panel — the
 * hierarchical dropdown's next level. It sits against the panel's right
 * edge, level with the row (`anchor`, a ref), or against its left edge when
 * there is no room on the right. It lives inside the Dropdown's panel, so
 * clicks in it keep that panel open; it is a manual popover in the top
 * layer, so the panel's scroll never clips it.
 */
export function Flyout({ anchor, open, label, children, className = '' }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const p = ref.current;
    if (!p) return undefined;
    const shown = p.matches(':popover-open');
    if (!open) { if (shown) p.hidePopover?.(); return undefined; }
    if (!shown) p.showPopover?.();
    const place = () => {
      const a = anchor?.current;
      if (!a) return;
      const row = a.getBoundingClientRect();
      const panel = (a.closest('.ed-pop') || a).getBoundingClientRect();
      const w = p.offsetWidth, h = p.offsetHeight, gap = 6;
      let left = panel.right + gap;
      if (left + w > window.innerWidth - 8) left = Math.max(8, panel.left - gap - w);
      const top = Math.max(8, Math.min(row.top - 6, window.innerHeight - h - 8));
      p.style.left = `${left}px`;
      p.style.top = `${top}px`;
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [open, anchor]);
  return (
    <div ref={ref} popover="manual" className={cx('ed-pop ed-mk-flyout', className)} role="group" aria-label={label}>
      {children}
    </div>
  );
}
