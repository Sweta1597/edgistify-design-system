import * as React from 'react';

export interface CarouselCard {
  title: React.ReactNode;
  body?: React.ReactNode;
  /** on a hatched plate at the card's top, e.g. a light-theme hairline figure */
  media?: React.ReactNode;
}

/** The carousel's host: `active` false holds a hidden one; `held` holds the shown one; `onRound` is called (instead of wrapping) after the last card's turn. */
export declare const CarouselHost: React.Context<{ active: boolean; held?: boolean; onRound?: (() => void) | null }>;

/** Cards that move on by themselves every `interval` ms (default 3500) and wrap round, with arrow buttons and a pause button; still while hovered, focused, off screen or under reduced motion. Client component. */
export declare function Carousel(props: {
  items: CarouselCard[];
  interval?: number;
  label?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>): JSX.Element;
