import * as React from 'react';

/** One line above the header, sitewide: newsletter, report, event, offer. Client component. */
export declare function Announcement(props: {
  /** Storage key for a dismissed bar. Change it to show a new message to people who closed the last one. */
  id?: string;
  tone?: 'ink' | 'brand' | 'tint';
  href?: string;
  /** Draws the ↗ arrow and opens in a new tab. */
  external?: boolean;
  /** The statement, for the text + link and text + button formats. Omit it and the children become the whole-line link. */
  message?: React.ReactNode;
  linkLabel?: React.ReactNode;
  /** A small <Button>, for the text + button format. */
  action?: React.ReactNode;
  /** Default true: every bar has a ×. false only for a notice people must not lose. */
  dismissible?: boolean;
  /** A small element at the right edge, e.g. a Login text button. Renders before the × when both are present. */
  end?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}): JSX.Element | null;
