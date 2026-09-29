import * as React from 'react';
import type { IconDef } from '../icons/index';

export type IconSizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconBaseProps {
  /** A space token — xs 14 · sm 16 · md 20 · lg 24 · xl 32, scaled by
   *  warehouse mode — or a pixel number. Default sm. */
  size?: number | IconSizeToken;
  /** Accessible name. Without it the icon is aria-hidden, which is right
   *  whenever a label sits beside it. */
  label?: string;
  /** Explicitly scenery. Already the default; this documents intent. */
  decorative?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** A library icon: renders the drawing as an <svg>. */
export interface LibraryIconProps
  extends IconBaseProps, Omit<React.SVGAttributes<SVGSVGElement>, 'children' | 'className' | 'style'> {
  /** An export of `@edgistify/design-system/icons`, e.g. `Package`. */
  icon: IconDef;
  /** The selected state: same silhouette, counter filled, accent in teal.
   *  Outline (the default) is monochrome. */
  filled?: boolean;
  children?: never;
}

/** Any other icon element, wrapped in a sized <span> — the migration path. */
export interface WrappedIconProps
  extends IconBaseProps, Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> {
  icon?: undefined;
  filled?: never;
  children: React.ReactNode;
}

export type IconProps = LibraryIconProps | WrappedIconProps;

export declare const Icon: React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement | HTMLSpanElement>
>;

export default Icon;
