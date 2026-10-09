import * as React from 'react';

export interface DotMapPoint {
  id: string;
  name: string;
  lon: number;
  lat: number;
  /** filter ids this place is lit for */
  tags?: string[];
  /** which side its name shows on; default right */
  side?: 'left' | 'right';
}

/** A country drawn as a field of dots, places on it, and a row of filters under it: hovering, focusing or tapping a filter lights the places tagged with it and names them; the rest dim. A tap pins a filter. Filters no place carries are left out; with no tagged places the row is not shown. Client component. */
export declare function DotMap(props: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** rings of [lon, lat] for the land */
  shape: [number, number][][];
  /** [lon, lat] dots for islands too small for the grid */
  extra?: [number, number][];
  points?: DotMapPoint[];
  filters?: { id: string; label: string }[];
  /** grid spacing in degrees of latitude; default 0.45 */
  step?: number;
  /** names the group for assistive tech */
  label?: string;
  /** a line over the filters */
  hint?: React.ReactNode;
}): JSX.Element;
