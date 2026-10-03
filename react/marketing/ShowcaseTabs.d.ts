import * as React from 'react';

export interface ShowcaseTab {
  label: React.ReactNode;
  /** Shown beside the label, in the label's colour. */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  href?: string;
  linkLabel?: React.ReactNode;
  /** The product screen in the middle. */
  media?: React.ReactNode;
  /** One figure on the right. Route unverified values through <Pending>. */
  stat?: { value: React.ReactNode; caption?: React.ReactNode };
}

/** Tabs over a three-part stage — copy, product screen, one figure. Client component. */
export declare function ShowcaseTabs(props: { tabs: ShowcaseTab[]; initial?: number; label?: string; className?: string }): JSX.Element;
