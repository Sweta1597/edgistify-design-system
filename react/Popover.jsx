import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* ==================================================================
   Popover — a CONTROLLED floating panel.

   Menu/Select/MultiSelect own their own state and their own markup.
   This one owns neither: the app keeps the `open` variable it already
   had, and puts whatever it already rendered inside. It exists so an
   existing hand-positioned `absolute … z-50` panel can move into the
   browser's top layer without its behaviour being rewritten.

   What the platform gives us once the panel is a real popover:
     · top layer        — no z-index to pick, and none to lose against
     · light dismiss    — delete the outside-click listener / scrim div
     · Escape           — delete the keydown listener
     · :popover-open    — the open state is styleable

   Pair it with useDropdown(), which supplies the trigger's handler:

     const nav = useDropdown();
     <button {...nav.triggerProps} aria-expanded={nav.open}>Warehouse</button>
     <Popover {...nav.popoverProps} className="min-w-[220px]">
       …items…
     </Popover>

   The trigger's handler has to come from here rather than from the app.
   Light dismiss fires on pointerdown and a click fires after it, so a
   second click on the trigger would otherwise close the panel and then
   immediately reopen it. useDropdown swallows that second edge.
   ================================================================== */

export function useDropdown({ open: openProp, setOpen: setOpenProp, onOpenChange } = {}) {
  const triggerRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const closedAt = React.useRef(0);
  const [ownOpen, setOwnOpen] = React.useState(false);

  // Controlled mode: a screen that already has `const [x, setX] = useState()`
  // keeps it and passes it in, so adopting the popover costs it no state
  // surgery. Uncontrolled mode is the default and owns its own flag.
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : ownOpen;

  const latest = React.useRef(open);
  latest.current = open;

  const commit = React.useCallback((want) => {
    if (controlled) setOpenProp?.(want);
    else setOwnOpen(want);
  }, [controlled, setOpenProp]);

  const setOpen = React.useCallback((next) => {
    const want = typeof next === 'function' ? next(latest.current) : next;
    // The light dismiss that just ran WAS this interaction. Ignore the click
    // riding in behind it, or the panel never appears to close. 150ms covers
    // the pointerdown -> click gap without swallowing a deliberate reopen a
    // moment later.
    if (want && performance.now() - closedAt.current < 150) return;
    commit(want);
  }, [commit]);

  const toggle = React.useCallback(() => setOpen((v) => !v), [setOpen]);

  const onTriggerKeyDown = React.useCallback((e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setOpen(true); }
  }, [setOpen]);

  const handleOpenChange = React.useCallback((isOpen) => {
    if (!isOpen) closedAt.current = performance.now();
    commit(isOpen);
    onOpenChange?.(isOpen);
  }, [commit, onOpenChange]);

  return {
    open,
    setOpen,
    close: React.useCallback(() => commit(false), [commit]),
    triggerProps: {
      ref: triggerRef, onClick: toggle, onKeyDown: onTriggerKeyDown,
      'aria-expanded': open, 'aria-haspopup': true,
    },
    popoverProps: { open, anchorRef: triggerRef, ref: panelRef, onOpenChange: handleOpenChange },
  };
}

export const Popover = React.forwardRef(function Popover(
  {
    open,
    anchorRef,
    onOpenChange,
    align = 'start',        // 'start' | 'end' — which edge lines up with the anchor
    matchWidth = false,     // panel is exactly as wide as its trigger
    roving = true,          // Arrow keys walk the panel's focusable items
    autoFocus = false,      // land on the first item rather than the panel
    gap = 4,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const panel = React.useRef(null);
  React.useImperativeHandle(ref, () => panel.current);

  const place = React.useCallback(() => {
    const t = anchorRef?.current, p = panel.current;
    if (!t || !p) return;
    const r = t.getBoundingClientRect();
    if (matchWidth) { p.style.width = `${r.width}px`; p.style.minWidth = `${r.width}px`; }
    else p.style.setProperty('--ed-pop-anchor-w', `${r.width}px`);
    // Measure from a known origin — a stale offset would compound each pass.
    p.style.left = '0px'; p.style.top = '0px';
    const pr = p.getBoundingClientRect();
    const below = window.innerHeight - r.bottom;
    const top = (below < pr.height + gap && r.top > below)
      ? r.top - pr.height - gap
      : r.bottom + gap;
    const wanted = align === 'end' ? r.right - pr.width : r.left;
    const left = Math.max(8, Math.min(wanted, window.innerWidth - pr.width - 8));
    p.style.left = `${left + window.scrollX}px`;
    p.style.top = `${top + window.scrollY}px`;
  }, [anchorRef, align, matchWidth, gap]);

  React.useEffect(() => {
    const p = panel.current;
    if (!p) return;
    const isOpen = p.matches(':popover-open');
    if (open && !isOpen) {
      p.showPopover?.();
      // Focus has to cross into the panel or the arrow keys below never see
      // a keydown — and a screen reader would stay outside too. Do it now,
      // not in the rAF: a key pressed in the frame between would be lost.
      if (autoFocus) p.querySelector('button:not([disabled]), [href], input:not([disabled])')?.focus({ preventScroll: true });
      else if (!p.contains(document.activeElement)) p.focus({ preventScroll: true });
      requestAnimationFrame(place);   // placement needs a measurable box
    } else if (!open && isOpen) { p.hidePopover?.(); }
  }, [open, place, autoFocus]);

  // The browser closes on outside click and Escape without telling React.
  React.useEffect(() => {
    const p = panel.current;
    if (!p) return;
    const onToggle = (e) => {
      const isOpen = e.newState === 'open';
      onOpenChange?.(isOpen);
      // Only take focus back if we still hold it — a click elsewhere on the
      // page is the user choosing where to go next.
      if (!isOpen && p.contains(document.activeElement)) anchorRef?.current?.focus();
    };
    p.addEventListener('toggle', onToggle);
    return () => p.removeEventListener('toggle', onToggle);
  }, [onOpenChange, anchorRef]);

  React.useEffect(() => {
    if (!open) return;
    const on = () => place();
    window.addEventListener('resize', on);
    window.addEventListener('scroll', on, true);   // capture: inner scrollers too
    return () => { window.removeEventListener('resize', on); window.removeEventListener('scroll', on, true); };
  }, [open, place]);

  const onKeyDown = (e) => {
    if (!roving) return;
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const items = [...panel.current.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    e.preventDefault();
    const at = items.indexOf(document.activeElement);
    const to = e.key === 'Home' ? 0
      : e.key === 'End' ? items.length - 1
      : e.key === 'ArrowDown' ? (at + 1) % items.length
      : (at - 1 + items.length) % items.length;
    items[to]?.focus();
  };

  return (
    <div
      ref={panel}
      popover="auto"
      tabIndex={-1}
      className={cx('ed-pop', className)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
});
