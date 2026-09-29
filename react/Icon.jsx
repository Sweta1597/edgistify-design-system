import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* Light-mode pixel sizes of the space foundation's icon tokens. Only used
   to choose the optical drawing; the rendered size comes from the
   `.ed-icon-*` class, which warehouse mode scales in CSS. */
const TOKEN_PX = { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 };
const ACCENT = 'var(--ed-icon-accent, #008277)';

/* Material's own thresholds: the 20 drawing up to 20px, 24 up to 40, 48
   above. A size the icon has not been drawn at falls back to 24, which
   the brief names as the one to draw when only one is drawn. */
const opticalSize = (px) => (px <= 20 ? 20 : px <= 40 ? 24 : 48);

/**
 * One icon, sized by a token rather than a prop so warehouse mode can
 * scale it. Two ways in:
 *
 *   import { Icon } from '@edgistify/design-system/react/Icon';
 *   import { Package, ChevronDown } from '@edgistify/design-system/icons';
 *
 *   <Icon icon={Package} />                          library icon: outline, 16px
 *   <Icon icon={Package} filled size="lg" />         filled, 24px — the selected state
 *   <Icon icon={ChevronDown} size={14} />            numeric px
 *   <Icon icon={Package} label="Package" />          named, for an icon-only control
 *
 *   <Icon size="sm"><SomeOtherGlyph /></Icon>        any icon element, wrapped and
 *                                                    sized by the class — the
 *                                                    migration path from lucide
 *
 * A library icon draws the same two paths in both states. Only `filled`
 * paints the accent teal; outline is monochrome, so teal means "this one
 * is current" rather than decoration every row carries at once. The body
 * takes the text colour, the accent takes `--ed-icon-accent`, which the
 * surface sets.
 */
export const Icon = React.forwardRef(function Icon(
  { icon, filled = false, size = 'sm', label, decorative, className = '', style, children, ...rest },
  ref
) {
  const token = typeof size === 'string' ? size : null;
  const px = token ? (TOKEN_PX[token] ?? TOKEN_PX.sm) : size;
  const sizeClass = token && `ed-icon-${token}`;
  const sizeStyle = token ? style : { width: px, height: px, ...style };
  /* An icon is decoration unless it is the only thing naming a control. */
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  void decorative; // the default; accepted so the intent can be written down

  if (!icon) {
    /* Wrapper mode: the child fills the box, the box carries the token.
       CSS stroke-width on the class beats the attribute a stroked icon
       library writes, so the child needs no editing. */
    return (
      <span ref={ref} className={cx('ed-icon', sizeClass, className)} style={sizeStyle} {...a11y} {...rest}>
        {children}
      </span>
    );
  }

  const state = filled ? icon.filled : icon.outline;
  const art = state[opticalSize(px)] ?? state[24] ?? Object.values(state)[0];
  const body = <path key="body" className="body" d={art.body} fill="currentColor" />;
  const accent = art.accent
    ? <path key="accent" className="accent" d={art.accent} fill={filled ? ACCENT : 'currentColor'} />
    : null;

  return (
    <svg
      ref={ref}
      viewBox="0 -960 960 960"
      focusable="false"
      className={cx('ed-icon', sizeClass, filled && 'ed-icon--filled', className)}
      style={sizeStyle}
      data-icon={icon.name}
      {...a11y}
      {...rest}
    >
      {/* Paint order: whatever sits underneath goes first. For a tick on a
          disc the disc is the accent, and it goes under the tick. */}
      {icon.accentFirst ? [accent, body] : [body, accent]}
    </svg>
  );
});

export default Icon;
