import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* Opening is delayed so that sweeping the pointer across a toolbar does
   not strobe. Closing is delayed too, and for a different reason: the
   pointer needs time to travel from the control INTO the bubble, which
   WCAG 1.4.13 requires to be possible. */
const OPEN_DELAY = 350;
const CLOSE_DELAY = 120;

/**
 * Replaces the native `title` attribute.
 *
 *   <Tooltip label="Reprint shipping label">
 *     <button className="ed-btn ed-btn--icon" aria-label="Reprint shipping label">
 *       <Printer />
 *     </button>
 *   </Tooltip>
 *
 * Takes exactly one child and clones it — no wrapper element, so it does
 * not disturb a flex row or a table cell.
 *
 * THE CHILD STILL NEEDS ITS OWN ACCESSIBLE NAME. The tooltip is attached
 * with aria-describedby, which supplements a name and never supplies one.
 * An icon-only button with no aria-label is unnamed on a screen reader
 * whether or not it has a tooltip, and unnamed on a touch screen, where
 * hover does not exist at all.
 */
export const Tooltip = React.forwardRef(function Tooltip(
  { label, side = 'top', gap = 8, id: idProp, mono = false,
    disabled = false, className = '', children, ...rest },
  ref
) {
  const bubble = React.useRef(null);
  const anchor = React.useRef(null);
  const timer = React.useRef(0);
  const [open, setOpen] = React.useState(false);
  const [side_, setSide] = React.useState(side);

  // useId, not a module counter: a counter increments once during the
  // server render and again during hydration, so the two disagree and
  // React throws away the markup it was given.
  const auto = React.useId();
  const id = idProp || auto;
  React.useImperativeHandle(ref, () => bubble.current);

  const schedule = React.useCallback((want, delay) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(want), delay);
  }, []);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  const place = React.useCallback(() => {
    const t = anchor.current, b = bubble.current;
    if (!t || !b) return;
    const r = t.getBoundingClientRect();
    b.style.left = '0px'; b.style.top = '0px';
    const br = b.getBoundingClientRect();

    // Flip to the other side only when the preferred one genuinely
    // cannot hold the bubble — not merely because it is tight.
    const fitsAbove = r.top >= br.height + gap;
    const fitsBelow = window.innerHeight - r.bottom >= br.height + gap;
    const use = side === 'top' ? (fitsAbove || !fitsBelow ? 'top' : 'bottom')
                               : (fitsBelow || !fitsAbove ? 'bottom' : 'top');
    setSide(use);

    const top = use === 'top' ? r.top - br.height - gap : r.bottom + gap;
    const wanted = r.left + r.width / 2 - br.width / 2;
    const left = Math.max(8, Math.min(wanted, window.innerWidth - br.width - 8));
    b.style.left = `${left + window.scrollX}px`;
    b.style.top = `${top + window.scrollY}px`;
    // Keep the arrow on the control even after the bubble was nudged.
    b.style.setProperty('--ed-tt-arrow-x',
      `${Math.max(10, Math.min(r.left + r.width / 2 - left, br.width - 10))}px`);
  }, [side, gap]);

  React.useEffect(() => {
    const b = bubble.current;
    if (!b) return;
    const isOpen = b.matches(':popover-open');
    if (open && !isOpen) { b.showPopover?.(); requestAnimationFrame(place); }
    else if (!open && isOpen) { b.hidePopover?.(); }
  }, [open, place]);

  React.useEffect(() => {
    if (!open) return undefined;
    const on = () => place();
    // Escape must dismiss it without dismissing anything behind it —
    // WCAG 1.4.13. popover="manual" means the browser will not do this.
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); } };
    window.addEventListener('resize', on);
    window.addEventListener('scroll', on, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('resize', on);
      window.removeEventListener('scroll', on, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [open, place]);

  const child = React.Children.only(children);
  if (disabled || !label) return child;

  const merge = (theirs, ours) => (e) => { theirs?.(e); ours(e); };

  const trigger = React.cloneElement(child, {
    ref: (node) => {
      anchor.current = node;
      const r = child.ref;
      if (typeof r === 'function') r(node);
      else if (r && typeof r === 'object') r.current = node;
    },
    // Describes, never names. See the note above.
    'aria-describedby': open ? cx(child.props['aria-describedby'], id) : child.props['aria-describedby'],
    onPointerEnter: merge(child.props.onPointerEnter, (e) => {
      // Touch reports pointerenter on tap, which would open a bubble the
      // user cannot dismiss by "moving away". There is no hover here.
      if (e.pointerType !== 'mouse') return;
      schedule(true, OPEN_DELAY);
    }),
    onPointerLeave: merge(child.props.onPointerLeave, () => schedule(false, CLOSE_DELAY)),
    // Keyboard focus shows it at once — the user has already committed.
    onFocus: merge(child.props.onFocus, (e) => {
      if (e.target.matches?.(':focus-visible')) { clearTimeout(timer.current); setOpen(true); }
    }),
    onBlur: merge(child.props.onBlur, () => { clearTimeout(timer.current); setOpen(false); }),
    // A tooltip must never survive the action it was describing.
    onClick: merge(child.props.onClick, () => { clearTimeout(timer.current); setOpen(false); }),
  });

  return (
    <>
      {trigger}
      <div
        ref={bubble}
        id={id}
        role="tooltip"
        popover="manual"
        data-side={side_}
        className={cx('ed-tooltip', mono && 'ed-tooltip--id', className)}
        /* Hoverable — 1.4.13. The pointer entering the bubble cancels the
           pending close, so a long label can be read at leisure. */
        style={{ pointerEvents: 'auto' }}
        onPointerEnter={() => clearTimeout(timer.current)}
        onPointerLeave={() => schedule(false, CLOSE_DELAY)}
        {...rest}
      >
        {label}
      </div>
    </>
  );
});

export default Tooltip;
