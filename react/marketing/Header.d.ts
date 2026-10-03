import * as React from 'react';

export interface NavMenuItem { title: string; href: string; icon?: React.ReactNode; desc?: string; tag?: string }
export interface NavGroup { label?: string; items: NavMenuItem[]; note?: React.ReactNode; all?: { label: string; href: string } }
/** The right quarter of the panel: a card and a short list. */
export interface NavAside {
  label?: string;
  /** A short list at the top: title in teal, one grey line under it. */
  links?: { label?: string; items: { title: string; desc?: string; href: string }[] };
  /** A boxed card: image, title, line, and a "Watch now ›" style call to action. */
  card?: { title: string; body?: string; href: string; image?: string; cta?: string };
  list?: { label?: string; items: { title: string; href: string }[] };
}
/** The strip under the panel: "View all …" plus up to three secondary links. */
export interface NavFooter { cta?: { label: string; href: string }; links?: { title: string; desc?: string; href: string }[] }
export type NavItem =
  | { label: string; href: string; groups?: undefined }
  | { label: string; groups: NavGroup[]; aside?: NavAside; footer?: NavFooter; href?: undefined;
      /** The footer strip's link to the page the menu summarises: a waving hand, the sentence, an arrow. */
      lead?: { label: string; href: string } };

/** Wordmark, disclosure mega-menus, one CTA, and a full-screen drawer below 1024px. Client component. */
export declare function SiteHeader(props: {
  nav: NavItem[];
  /** The one call to action — a <Button variant="primary">. */
  cta?: React.ReactNode;
  /** A quieter second action (WhatsApp, Client login). Hidden on small screens, shown in the drawer. */
  secondary?: React.ReactNode;
  brandHref?: string;
  /** light (default) | ink. Ink is the dark header: bar and panels are ink, the wordmark stays teal. */
  tone?: 'light' | 'ink';
}): JSX.Element;
