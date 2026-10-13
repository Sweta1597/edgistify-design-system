import * as React from 'react';

export interface CarouselCard {
  title: React.ReactNode;
  body?: React.ReactNode;
  /** on a hatched plate at the card's top, e.g. a light-theme hairline figure */
  media?: React.ReactNode;
}

/** Whether the carousel is shown; a parent that keeps several mounted provides false for the hidden ones. */
export declare const CarouselActive: React.Context<boolean>;

/** Cards that move on by themselves every `interval` ms (default 1000) and wrap round, with arrow buttons; still while hovered, focused, off screen or under reduced motion. Client component. */
export declare function Carousel(props: {
  items: CarouselCard[];
  interval?: number;
  label?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>): JSX.Element;
