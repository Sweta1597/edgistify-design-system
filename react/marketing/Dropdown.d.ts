import * as React from 'react';

/** A select-looking button opening a panel of anything (e.g. nested checkboxes), in the top layer. */
export declare function Dropdown(props: {
  id?: string;
  /** what the closed button shows */
  value?: React.ReactNode;
  placeholder?: React.ReactNode;
  /** names the button and the panel */
  label?: string;
  /** extra content left of Done; false hides the footer */
  footer?: React.ReactNode | false;
  /** hears the panel open (true) and close (false) */
  onOpenChange?: (open: boolean) => void;
  /** false: the panel may be wider than the trigger (at least 300px). Default true. */
  matchWidth?: boolean;
  /** the panel's contents, or ({ close }) => contents (to close on a pick) */
  children?: React.ReactNode | ((api: { close: () => void }) => React.ReactNode);
  className?: string;
  panelClassName?: string;
}): JSX.Element;

/** A second panel beside a row of a Dropdown's panel (a hierarchical dropdown's next level): against the panel's right edge, level with `anchor`, or its left edge when there's no room. Put it inside the Dropdown's children. */
export declare function Flyout(props: { anchor: React.RefObject<Element | null>; open: boolean; label?: string; children?: React.ReactNode; className?: string }): JSX.Element;
