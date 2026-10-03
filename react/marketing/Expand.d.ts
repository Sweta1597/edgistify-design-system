import * as React from 'react';

/** A panel that widens to full width and lifts its content into place as it scrolls into view. Client component. */
export declare function ExpandOnScroll(props: React.HTMLAttributes<HTMLElement> & {
  /** 'light' (default) — a light panel, for a dark page. 'dark' — the reverse. */
  tone?: 'light' | 'dark';
  /** Side clip when closed, any CSS length. Default clamp(16px, 8vw, 120px). */
  inset?: string;
  /** Top corner radius. Default 16px. */
  radius?: string;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}): JSX.Element;
