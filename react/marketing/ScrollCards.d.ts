import * as React from 'react';

export interface ScrollCardItem {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  href?: string;
  linkLabel?: React.ReactNode;
  /** The card itself, e.g. <SystemCard />. */
  card: React.ReactNode;
}

/** Pinned stage: the page's scroll moves the cards sideways, first to last, with the front card's copy on the left; then the page scrolls on. Swipe row on narrow screens. Client component. */
export declare function ScrollCards(props: {
  head?: React.ReactNode;
  items: ScrollCardItem[];
  /** Scroll per card, as a fraction of the window height. Default 0.8. */
  per?: number;
  /** Extra space above, in multiples of the stage's own top space n: 1 makes the gap from the section before 2n. Default 0. */
  lead?: number;
  className?: string;
}): JSX.Element;
