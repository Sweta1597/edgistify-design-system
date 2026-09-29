import * as React from 'react';

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The label. Short, and never the only place the information exists. */
  label?: React.ReactNode;
  /** Preferred side. Flips only when the preferred side cannot hold it. */
  side?: 'top' | 'bottom';
  /** Distance from the control, in px. */
  gap?: number;
  /** Mono face, for a SKU / order id / barcode. */
  mono?: boolean;
  /** Renders the child untouched — for a row that conditionally needs one. */
  disabled?: boolean;
  /** Exactly one element, which must carry its own accessible name. */
  children: React.ReactElement;
}

export declare const Tooltip: React.ForwardRefExoticComponent<
  TooltipProps & React.RefAttributes<HTMLDivElement>
>;
export default Tooltip;
