import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* The X is inlined rather than imported so the package carries no icon
   dependency. Everything else takes its icon from the app's own set. */
function RemoveGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
    </svg>
  );
}

/**
 * A short label: order status, sync state, a count, a plan name.
 *
 *   <Badge tone="success">Dispatched</Badge>
 *   <Badge tone="success" strong>Delivered</Badge>
 *   <Badge tone="danger" dot>Sync error</Badge>
 *   <Badge tone="neutral" onRemove={() => drop('Pending')}>Pending</Badge>
 *
 * `tone="brand"` is identity, never state — see RULE 01.
 */
export const Badge = React.forwardRef(function Badge(
  { tone = 'neutral', strong = false, outline = false, size,
    dot = false, count = false, icon,
    onRemove, removeLabel,
    as: Tag = 'span', className = '', children, ...rest },
  ref
) {
  const removable = typeof onRemove === 'function';

  return (
    <Tag
      ref={ref}
      className={cx('ed-badge', `ed-badge--${tone}`,
        strong && 'ed-badge--strong',
        outline && 'ed-badge--outline',
        size && `ed-badge--${size}`,
        count && 'ed-badge--count',
        removable && 'ed-badge--removable',
        className)}
      {...rest}
    >
      {dot && <span className="ed-badge__dot" aria-hidden="true" />}
      {icon}
      {count ? children : <span className="ed-badge__label">{children}</span>}
      {removable && (
        <button
          type="button"
          className="ed-badge__remove"
          /* An icon is not a name. Falls back to the label's own text
             when that text is a plain string. */
          aria-label={removeLabel ||
            `Remove${typeof children === 'string' ? ` ${children}` : ''}`}
          onClick={onRemove}
        >
          <RemoveGlyph />
        </button>
      )}
    </Tag>
  );
});

/** Wraps a run of badges so they wrap on a narrow screen instead of clipping. */
export function BadgeGroup({ as: Tag = 'div', className = '', children, ...rest }) {
  return <Tag className={cx('ed-badge-group', className)} {...rest}>{children}</Tag>;
}

Badge.Group = BadgeGroup;
export default Badge;
