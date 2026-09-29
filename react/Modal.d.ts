import * as React from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalVariant = 'drawer' | 'sheet';

export interface ModalProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'onClose'> {
  open: boolean;
  /** Fired by Escape, the close button and a backdrop click alike. */
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  size?: ModalSize;
  /** drawer slides from the right; sheet rises from the bottom. Warehouse mode
   *  turns every non-drawer modal into a sheet on its own. */
  variant?: ModalVariant;
  /** role="alertdialog" for destructive confirmation. Ignores backdrop clicks
   *  AND Escape, so a stray keystroke cannot dismiss the decision. */
  alert?: boolean;
  /** Rule under the header, for a body that scrolls past it. */
  ruled?: boolean;
  closeOnBackdrop?: boolean;
  showClose?: boolean;
}
export declare const Modal: React.ForwardRefExoticComponent<
  ModalProps & React.RefAttributes<HTMLDialogElement>
> & { Body: typeof ModalBody; Footer: typeof ModalFooter };

export declare const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>>;
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> { spread?: boolean }
export declare const ModalFooter: React.FC<ModalFooterProps>;
