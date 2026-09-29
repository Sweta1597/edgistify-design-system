import * as React from 'react';

export interface NavMenuItem { title: string; desc?: string; href: string; tag?: string }
export interface NavGroup { label?: string; items: NavMenuItem[]; all?: { label: string; href: string } }
export type NavItem =
  | { label: string; href: string; groups?: undefined }
  | { label: string; groups: NavGroup[]; href?: undefined };

/** Wordmark, disclosure mega-menus, one CTA, and a full-screen drawer below 1024px. Client component. */
export declare function SiteHeader(props: {
  nav: NavItem[];
  /** The one call to action — a <Button variant="primary">. */
  cta?: React.ReactNode;
  /** A quieter second action (WhatsApp, Client login). Hidden on small screens, shown in the drawer. */
  secondary?: React.ReactNode;
  brandHref?: string;
}): JSX.Element;
