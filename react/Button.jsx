import React from 'react';

/**
 * Edgistify button.
 *
 * Ships as .jsx with a .d.ts alongside so the JSX apps (seller-dashboard,
 * picker-app) and the TSX apps (support frontend, admin) can both consume it
 * without a build step in between.
 */
export const Button = React.forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon = false,
    block = false,
    loading = false,
    disabled = false,
    as: Tag = 'button',
    type = 'button',
    className = '',
    children,
    ...rest
  },
  ref
) {
  if (process.env.NODE_ENV !== 'production' && icon && !rest['aria-label']) {
    console.warn('<Button icon> needs an aria-label — an icon is not an accessible name.');
  }

  const cls = [
    'ed-btn',
    `ed-btn--${variant}`,
    size !== 'md' && `ed-btn--${size}`,
    icon && 'ed-btn--icon',
    block && 'ed-btn--block',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      ref={ref}
      type={Tag === 'button' ? type : undefined}
      className={cls}
      disabled={Tag === 'button' ? disabled || loading : undefined}
      aria-disabled={Tag !== 'button' && (disabled || loading) ? true : undefined}
      aria-busy={loading || undefined}
      data-loading={loading ? 'true' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export const ButtonGroup = ({ stack = false, className = '', ...rest }) => (
  <div
    className={['ed-btn-group', stack && 'ed-btn-group--stack', className]
      .filter(Boolean).join(' ')}
    {...rest}
  />
);
