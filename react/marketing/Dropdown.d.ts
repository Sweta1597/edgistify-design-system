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
  children?: React.ReactNode;
  className?: string;
  panelClassName?: string;
}): JSX.Element;
