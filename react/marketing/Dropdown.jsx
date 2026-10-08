'use client';
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
        <div className="ed-mk-dd__body">{children}</div>
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
