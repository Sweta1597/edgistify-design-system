import * as React from 'react';

export type CardAccent = 'danger' | 'warning' | 'success' | 'info';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** No shadow. Use for a card inside a card, or on an already-raised surface. */
  flat?: boolean;
  /** elevation-2. Floating or emphasised. */
  raised?: boolean;
  /** Tighter padding for dashboard grids. */
  dense?: boolean;
  /** Hover and focus affordances. Pair with <CardLink> for the accessible name. */
  interactive?: boolean;
  /** Left stripe for status. Not a tinted card — a wash fights the data. */
  accent?: CardAccent;
  as?: React.ElementType;
}
export declare const Card: React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLElement>
> & {
  Header: typeof CardHeader; Body: typeof CardBody; Bleed: typeof CardBleed;
  Footer: typeof CardFooter; Divider: typeof CardDivider; Link: typeof CardLink;
  Stat: typeof CardStat;
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  /** Rule beneath the header. Only when the body is full-bleed. */
  ruled?: boolean;
}
export declare function CardHeader(p: CardHeaderProps): JSX.Element;

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { bleed?: boolean }
export declare const CardBody: React.FC<CardBodyProps>;
export declare const CardBleed: React.FC<React.HTMLAttributes<HTMLDivElement>>;

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { spread?: boolean }
export declare const CardFooter: React.FC<CardFooterProps>;
export declare const CardDivider: React.FC<React.HTMLAttributes<HTMLHRElement>>;
export declare const CardLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

export interface CardStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  value: React.ReactNode;
  delta?: React.ReactNode;
  /** The arrow. */
  direction?: 'up' | 'down';
  /** The colour. Not the same as direction — returns rising is bad news. */
  sentiment?: 'good' | 'bad' | 'flat';
}
export declare function CardStat(p: CardStatProps): JSX.Element;
export declare const CardGrid: React.FC<React.HTMLAttributes<HTMLDivElement>>;
