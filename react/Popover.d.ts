import * as React from 'react';

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Controlled: the panel shows when true. */
  open: boolean;
  /** The element the panel is positioned against — usually the trigger. */
  anchorRef: React.RefObject<HTMLElement>;
  /** Fired when the browser opens or closes it (light dismiss, Escape). */
  onOpenChange?: (open: boolean) => void;
  /** Which edge lines up with the anchor. Default 'start'. */
  align?: 'start' | 'end';
  /** Panel is exactly as wide as its trigger. Default false. */
  matchWidth?: boolean;
  /** Arrow keys / Home / End walk the panel's focusable items. Default true. */
  roving?: boolean;
  /** Distance from the anchor in px. Default 4. */
  gap?: number;
  children?: React.ReactNode;
}

export const Popover: React.ForwardRefExoticComponent<
  PopoverProps & React.RefAttributes<HTMLDivElement>
>;

export interface DropdownState {
  open: boolean;
  /** Setter that ignores a re-open riding in behind a light dismiss. */
  setOpen: (next: boolean | ((cur: boolean) => boolean)) => void;
  /** Unconditional close — safe to call from an item's onClick. */
  close: () => void;
  triggerProps: {
    ref: React.RefObject<any>;
    onClick: () => void;
    'aria-expanded': boolean;
    'aria-haspopup': boolean;
  };
  popoverProps: Pick<PopoverProps, 'open' | 'anchorRef' | 'onOpenChange'> & {
    ref: React.RefObject<HTMLDivElement>;
  };
}

export function useDropdown(opts?: {
  /** Controlled mode: pass the screen's own flag and setter to adopt them. */
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}): DropdownState;
