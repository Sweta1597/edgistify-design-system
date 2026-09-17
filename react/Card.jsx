import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/**
 * Composable card. Nothing is required except <Card> itself.
 *
 *   <Card>
 *     <CardHeader title="Pick list" subtitle="Wave 4471" actions={<Button …/>} />
 *     <CardBody><CardBleed><table …/></CardBleed></CardBody>
 *     <CardFooter><Button …/></CardFooter>
 *   </Card>
 */
export const Card = React.forwardRef(function Card(
  { flat = false, raised = false, dense = false, interactive = false,
    accent, as: Tag = 'div', className = '', children, ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cx('ed-card',
        flat && 'ed-card--flat',
        raised && 'ed-card--raised',
        dense && 'ed-card--dense',
        interactive && 'ed-card--interactive',
        accent && `ed-card--accent-${accent}`,
        className)}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export function CardHeader({ title, subtitle, actions, ruled = false, className = '', children, ...rest }) {
  return (
    <div className={cx('ed-card__header', ruled && 'ed-card__header--ruled', className)} {...rest}>
      {(title || subtitle) && (
        <div className="ed-card__heading">
          {title && <h3 className="ed-card__title">{title}</h3>}
          {subtitle && <p className="ed-card__subtitle">{subtitle}</p>}
        </div>
      )}
      {children}
      {actions && <div className="ed-card__actions">{actions}</div>}
    </div>
  );
}

export const CardBody = ({ bleed = false, className = '', ...rest }) => (
  <div className={cx('ed-card__body', bleed && 'ed-card__body--bleed', className)} {...rest} />
);

/** Escapes the body padding so a table or chart reaches the card's edges. */
export const CardBleed = ({ className = '', ...rest }) => (
  <div className={cx('ed-card__bleed', className)} {...rest} />
);

export const CardFooter = ({ spread = false, className = '', ...rest }) => (
  <div className={cx('ed-card__footer', spread && 'ed-card__footer--start', className)} {...rest} />
);

export const CardDivider = ({ className = '', ...rest }) => (
  <hr className={cx('ed-card__divider', className)} {...rest} />
);

/**
 * Stretches one real link across the whole card. The card becomes clickable,
 * but the link keeps the accessible name and the card's text stays selectable.
 * Requires the parent Card to have `interactive`.
 */
export const CardLink = ({ className = '', ...rest }) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a className={cx('ed-card__link', className)} {...rest} />
);

/**
 * Stat tile. `direction` is the arrow; `sentiment` is the colour — they are not
 * the same thing. Returns rising is bad news; fill rate rising is good.
 */
export function CardStat({ label, value, delta, direction, sentiment = 'flat', className = '', ...rest }) {
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : null;
  return (
    <div className={cx('ed-card__heading', className)} {...rest}>
      {label && <span className="ed-card__label">{label}</span>}
      <span className="ed-card__metric">{value}</span>
      {delta != null && (
        <span className={`ed-card__delta ed-card__delta--${sentiment}`}>
          {arrow && <span aria-hidden="true">{arrow}</span>}{delta}
        </span>
      )}
    </div>
  );
}

export const CardGrid = ({ className = '', ...rest }) => (
  <div className={cx('ed-card-grid', className)} {...rest} />
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Bleed = CardBleed;
Card.Footer = CardFooter;
Card.Divider = CardDivider;
Card.Link = CardLink;
Card.Stat = CardStat;
