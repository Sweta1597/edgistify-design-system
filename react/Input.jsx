import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/**
 * Field — label, hint, error, and the wiring between them.
 *
 * The dashboard has 45 standalone <label> elements and 12 `htmlFor` between
 * them. A label that is not associated does not focus its field when clicked
 * and is not announced with it. Field generates the id and wires label,
 * aria-describedby and aria-invalid, so getting it right costs nothing.
 *
 *   <Field label="Safety stock" hint="Units" error={errors.safety} required>
 *     <Input type="number" value={v} onChange={…} />
 *   </Field>
 */
export function Field({ label, hint, error, required = false, id, className = '', children, ...rest }) {
  const auto = React.useId();
  const fieldId = id || auto;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined;

  const control = React.Children.map(children, child =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          id: child.props.id || fieldId,
          'aria-describedby': child.props['aria-describedby'] || describedBy,
          'aria-invalid': child.props['aria-invalid'] ?? (error ? true : undefined),
          'aria-required': child.props['aria-required'] ?? (required || undefined),
        })
      : child
  );

  return (
    <div className={cx('ed-field', error && 'ed-field--invalid', className)} {...rest}>
      {label && (
        <label className="ed-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="ed-field__required" aria-hidden="true">*</span>}
        </label>
      )}
      {control}
      {hint && !error && <span className="ed-field__hint" id={hintId}>{hint}</span>}
      {error && (
        <span className="ed-field__error" id={errId}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor"
               strokeWidth="1.75" aria-hidden="true" style={{ flex: 'none', marginTop: 1 }}>
            <circle cx="8" cy="8" r="6.5" /><path d="M8 5v3.5M8 11h.01" strokeLinecap="round" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

export const Input = React.forwardRef(function Input(
  { size = 'md', id: isId = false, className = '', ...rest }, ref
) {
  return (
    <input ref={ref}
      className={cx('ed-input', size !== 'md' && `ed-input--${size}`, isId && 'ed-input--id', className)}
      {...rest} />
  );
});

export const Textarea = React.forwardRef(function Textarea({ className = '', ...rest }, ref) {
  return <textarea ref={ref} className={cx('ed-textarea', className)} {...rest} />;
});

export const Select = React.forwardRef(function Select({ size = 'md', className = '', ...rest }, ref) {
  return (
    <select ref={ref}
      className={cx('ed-select', size !== 'md' && `ed-select--${size}`, className)}
      {...rest} />
  );
});

/** Currency, units — beside the field, not in the placeholder, which vanishes on typing. */
export const InputGroup = ({ className = '', ...rest }) => (
  <div className={cx('ed-input-group', className)} {...rest} />
);
export const InputAddon = ({ className = '', ...rest }) => (
  <span className={cx('ed-input-group__addon', className)} {...rest} />
);
/** Leading icon inside the field. Pass the icon first, then the Input. */
export const InputIcon = ({ className = '', ...rest }) => (
  <div className={cx('ed-input-icon', className)} {...rest} />
);

/**
 * Checkbox and Radio wrap their own label, so the whole row is the hit target
 * and the association needs no id. `indeterminate` is a DOM property, not an
 * attribute — it has to be set on the node.
 */
export const Checkbox = React.forwardRef(function Checkbox(
  { label, hint, indeterminate = false, className = '', ...rest }, ref
) {
  const inner = React.useRef(null);
  React.useImperativeHandle(ref, () => inner.current);
  React.useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const box = <input ref={inner} type="checkbox" className={cx('ed-checkbox', !label && className)} {...rest} />;
  if (!label) return box;
  return (
    <label className={cx('ed-check', className)}>
      {box}
      <span className="ed-check__text">{label}{hint && <span className="ed-check__hint">{hint}</span>}</span>
    </label>
  );
});

export const Radio = React.forwardRef(function Radio({ label, hint, className = '', ...rest }, ref) {
  const box = <input ref={ref} type="radio" className={cx('ed-radio', !label && className)} {...rest} />;
  if (!label) return box;
  return (
    <label className={cx('ed-check', className)}>
      {box}
      <span className="ed-check__text">{label}{hint && <span className="ed-check__hint">{hint}</span>}</span>
    </label>
  );
});
