import * as React from 'react';

export type ButtonVariant =
  | 'primary'        // the one main action
  | 'brand'          // full-strength #00a699 — at most one per screen
  | 'secondary'
  | 'ghost'
  | 'danger'         // destructive, standing alone
  | 'danger-quiet'   // destructive, sitting in a row of ordinary actions
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square, icon-only. Requires aria-label. */
  icon?: boolean;
  /** Full width. */
  block?: boolean;
  /** Shows a spinner, blocks input, keeps the button's width stable. */
  loading?: boolean;
  /** Render as another element, e.g. `as="a"` for a link that looks like a button. */
  as?: React.ElementType;
}

export declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** In warehouse mode, stack full-width instead of sitting side by side. */
  stack?: boolean;
}
export declare const ButtonGroup: React.FC<ButtonGroupProps>;
