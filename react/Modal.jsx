import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* One lock shared by every open dialog, so nested dialogs don't unlock the
   page when the inner one closes. */
let lockCount = 0;
function lockScroll() {
  if (lockCount++ === 0) {
    const bar = window.innerWidth - document.documentElement.clientWidth;
    document.body.dataset.edScrollLock = document.body.style.cssText;
    document.body.style.overflow = 'hidden';
    if (bar > 0) document.body.style.paddingRight = `${bar}px`;  // no layout jump
  }
}
function unlockScroll() {
  if (--lockCount <= 0) {
    lockCount = 0;
    document.body.style.cssText = document.body.dataset.edScrollLock || '';
    delete document.body.dataset.edScrollLock;
  }
}

/**
 * Modal, drawer and bottom sheet — a native <dialog> opened with showModal().
 *
 * The platform gives the focus trap, Escape, inertness of everything behind,
 * the top layer and focus return. We add the scroll lock and the design.
 *
 *   <Modal open={open} onClose={close} title="Split order" size="lg">
 *     <ModalBody>…</ModalBody>
 *     <ModalFooter>
 *       <Button variant="secondary" onClick={close}>Cancel</Button>
 *       <Button onClick={save}>Split</Button>
 *     </ModalFooter>
 *   </Modal>
 */
export const Modal = React.forwardRef(function Modal(
  {
    open,
    onClose,
    title,
    subtitle,
    size = 'md',
    variant,                 // 'drawer' | 'sheet'
    alert = false,           // destructive confirmation
    ruled = false,
    closeOnBackdrop = true,
    showClose = true,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const inner = React.useRef(null);
  React.useImperativeHandle(ref, () => inner.current);
  const titleId = React.useId();

  React.useEffect(() => {
    const el = inner.current;
    if (!el) return;
    if (open && !el.open) { el.showModal(); }
    else if (!open && el.open) { el.close(); }
  }, [open]);

  // The lock follows `open`, not showModal(). Pairing it with showModal()
  // meant React's double-invoked effects could unlock a dialog that was
  // still on screen — the second pass sees el.open already true and skips
  // the lock, while the first pass's cleanup has already released it.
  // Tying it to the prop makes it idempotent, and unmounting while open
  // releases it too.
  React.useEffect(() => {
    if (!open) return undefined;
    lockScroll();
    return unlockScroll;
  }, [open]);

  // Escape and the close button both fire the dialog's own close event, so
  // there is one path out rather than three.
  const handleClose = () => { onClose?.(); };

  // A destructive confirmation must not be dismissible by a stray Escape
  // either — the same reason it ignores backdrop clicks.
  const handleCancel = (e) => { if (alert) e.preventDefault(); };

  const onClick = (e) => {
    if (!closeOnBackdrop || alert) return;
    // showModal() makes the backdrop part of the dialog's own box, so a click
    // on it targets the dialog itself. Anything inside stops here.
    if (e.target === inner.current) inner.current.close();
  };

  return (
    <dialog
      ref={inner}
      className={cx('ed-modal',
        size !== 'md' && `ed-modal--${size}`,
        variant && `ed-modal--${variant}`,
        alert && 'ed-modal--alert',
        className)}
      role={alert ? 'alertdialog' : undefined}
      aria-labelledby={title ? titleId : undefined}
      onClose={handleClose}
      onCancel={handleCancel}
      onClick={onClick}
      {...rest}
    >
      {(title || showClose) && (
        <div className={cx('ed-modal__header', ruled && 'ed-modal__header--ruled')}>
          <div className="ed-modal__heading">
            {title && <h2 className="ed-modal__title" id={titleId}>{title}</h2>}
            {subtitle && <p className="ed-modal__subtitle">{subtitle}</p>}
          </div>
          {showClose && (
            <button type="button" className="ed-btn ed-btn--ghost ed-btn--icon ed-btn--sm"
                    aria-label="Close" onClick={() => inner.current?.close()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>
      )}
      {children}
    </dialog>
  );
});

export const ModalBody = ({ className = '', ...rest }) => (
  <div className={cx('ed-modal__body', className)} {...rest} />
);

export const ModalFooter = ({ spread = false, className = '', ...rest }) => (
  <div className={cx('ed-modal__footer', spread && 'ed-modal__footer--spread', className)} {...rest} />
);

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
