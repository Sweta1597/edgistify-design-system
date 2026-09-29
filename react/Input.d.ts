import * as React from 'react';

export type ControlSize = 'sm' | 'md' | 'lg' | 'xl';

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: React.ReactNode;
  /** Shown under the field. Hidden while an error is showing. */
  hint?: React.ReactNode;
  /** Truthy renders the message and sets aria-invalid on the control. */
  error?: React.ReactNode;
  required?: boolean;
  /** Supply one to control it; otherwise Field generates it. */
  id?: string;
  children: React.ReactNode;
}
export declare function Field(p: FieldProps): JSX.Element;

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'id'> {
  size?: ControlSize;
  /** SKU, order number, batch — mono with a slashed zero. */
  id?: boolean | string;
}
export declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>>;

export declare const Textarea: React.ForwardRefExoticComponent<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.RefAttributes<HTMLTextAreaElement>>;

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: ControlSize;
}
export declare const Select: React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>>;

export declare const InputGroup: React.FC<React.HTMLAttributes<HTMLDivElement>>;
export declare const InputAddon: React.FC<React.HTMLAttributes<HTMLSpanElement>>;
export declare const InputIcon: React.FC<React.HTMLAttributes<HTMLDivElement>>;

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** "Some of these", not "all of these". Renders a dash. */
  indeterminate?: boolean;
}
export declare const Checkbox: React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>>;

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
}
export declare const Radio: React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLInputElement>>;
