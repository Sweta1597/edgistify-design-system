import * as React from 'react';

export interface Instrument {
  id?: string;
  label: string;
  /** the tile's live figure, e.g. a light-theme hairline figure */
  figure?: React.ReactNode;
  headline?: React.ReactNode;
  lede?: React.ReactNode;
  href?: string;
  /** the readout's screen, e.g. <Screen label="EdgeOS · Warehousing" /> */
  media?: React.ReactNode;
}

/** Six live tiles on a framed board beside a readout of the chosen one. Hover, click, arrows or the pager choose. Client component. */
export declare function InstrumentBoard(props: {
  items: Instrument[];
  label?: string;
  readout?: React.ReactNode;
  live?: React.ReactNode | false;
  count?: (i: number, n: number) => React.ReactNode;
  linkLabel?: (item: Instrument) => React.ReactNode;
  className?: string;
}): JSX.Element;
