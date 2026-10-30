import * as React from 'react';

export type IsoIconName = "parcel" | "warehouse" | "weighed" | "truck" | "route" | "cod" | "layers" | "returns" | "contract" | "invoice" | "reconcile" | "label" | "parcel-check" | "pin" | "split" | "phone" | "shield" | "flag" | "address" | "claim";

/** Every isometric line icon, by name, as SVG markup. */
export declare const ISO_ICONS: Record<IsoIconName, string>;

/** An isometric line icon for a marketing page's features, in currentColor. Decorative unless `label` is given. */
export declare function IsoIcon(props: React.SVGAttributes<SVGSVGElement> & {
  name: IsoIconName;
  /** Width and height in px. Default 24. */
  size?: number;
  /** What a screen reader hears; leave out when the text beside it names the feature. */
  label?: string;
}): JSX.Element | null;
export default IsoIcon;
