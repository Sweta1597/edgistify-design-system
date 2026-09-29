import * as React from 'react';

/** Four statuses, a neutral, and identity. There is no sixth status. */
export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand';
export type BadgeSize = 'sm' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  /** `brand` marks something as ours; it never means "done" or "ok". RULE 01. */
  tone?: BadgeTone;
  /** Solid fill. How one status outranks another of the SAME kind
   *  (Delivered over Dispatched) — not a second palette. */
  strong?: boolean;
  /** No fill. For a badge sitting on an already-tinted row. */
  outline?: boolean;
  size?: BadgeSize;
  /** Leading dot for live/paused indicators. Always alongside a label,
   *  never instead of one. */
  dot?: boolean;
  /** Circular numeric badge for nav items and tabs. */
  count?: boolean;
  /** Leading icon element, sized by the badge. */
  icon?: React.ReactNode;
  /** Supplying this turns the badge into a removable tag with a real button. */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Overrides the generated "Remove <label>" accessible name. */
  removeLabel?: string;
  as?: React.ElementType;
}

export declare const Badge: React.ForwardRefExoticComponent<
  BadgeProps & React.RefAttributes<HTMLElement>
> & { Group: typeof BadgeGroup };

export declare function BadgeGroup(
  props: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }
): JSX.Element;

export default Badge;
