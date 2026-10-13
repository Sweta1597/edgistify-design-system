import * as React from 'react';

export interface Instrument {
  id?: string;
  label: string;
  /** the tile's live figure, e.g. a light-theme hairline figure */
  figure?: React.ReactNode;
  headline?: React.ReactNode;
  lede?: React.ReactNode;
  href?: string;
  /** a strip of figures under the lede; a stat with a label is set as a figure */
  stats?: { value: React.ReactNode; label?: React.ReactNode }[];
  /** under the strip, e.g. a <Carousel /> (it runs only while its readout is shown) or a <Screen /> */
  media?: React.ReactNode;
}

/** Six live tiles on a framed board beside a readout of the chosen one. Hover, click, arrows or the pager choose. Every readout is stacked in one place, so the readout keeps one height. Client component. */
export declare function InstrumentBoard(props: {
  items: Instrument[];
  label?: string;
  /** an eyebrow over each readout (none by default) */
  readout?: React.ReactNode;
  /** a pulsing status on the eyebrow's right (none by default) */
  live?: React.ReactNode | false;
  /** a count left of the link, e.g. (i, n) => `${i} / ${n}` (none by default) */
  count?: ((i: number, n: number) => React.ReactNode) | null;
  /** the link's text, or a function of the item (pass text from a server component) */
  linkLabel?: React.ReactNode | ((item: Instrument) => React.ReactNode);
  className?: string;
}): JSX.Element;
