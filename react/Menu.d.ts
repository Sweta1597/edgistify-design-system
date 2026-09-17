import * as React from 'react';

/* ---- shared option shapes ------------------------------------------- */
export interface OptionBase {
  value: string | number;
  label: React.ReactNode;
  hint?: React.ReactNode;
  meta?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}
export interface TreeOption extends OptionBase { children?: TreeOption[] }

/* ---- Menu: items are ACTIONS ----------------------------------------- */
export interface MenuItem {
  type?: 'item' | 'separator' | 'label';
  label?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}
export interface MenuProps {
  /** Any focusable element. Menu clones it and attaches the trigger wiring. */
  trigger: React.ReactElement;
  items: MenuItem[];
  align?: 'start' | 'end';
  className?: string;
}
export declare function Menu(p: MenuProps): JSX.Element;

/* ---- Select: ONE value ------------------------------------------------ */
export interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  options: OptionBase[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  /** Filter box above the list. Turn off for short lists. */
  searchable?: boolean;
  invalid?: boolean;
}
export declare function Select(p: SelectProps): JSX.Element;

/* ---- MultiSelect: MANY values ----------------------------------------- */
export interface MultiSelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  options: OptionBase[];
  value?: Array<string | number>;
  onChange?: (value: Array<string | number>) => void;
  placeholder?: string;
  searchable?: boolean;
  /** Chips shown before collapsing to "+n more". Default 3. */
  maxTokens?: number;
  invalid?: boolean;
}
export declare function MultiSelect(p: MultiSelectProps): JSX.Element;

/* ---- CascadeSelect: the value is a PATH -------------------------------- */
export interface CascadeSelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  options: TreeOption[];
  /** The path, root first: ['BLR-01', 'A', 'A-12', 'A-12-03']. */
  value?: Array<string | number>;
  onChange?: (path: Array<string | number>) => void;
  placeholder?: string;
  /** Joins the path in the trigger. Default ' › '. */
  separator?: string;
  /** Only a leaf commits a value. Off lets a branch be chosen too. */
  leafOnly?: boolean;
}
export declare function CascadeSelect(p: CascadeSelectProps): JSX.Element;

/* ---- TreeSelect: ONE node in a hierarchy -------------------------------- */
export interface TreeSelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  options: TreeOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  defaultExpanded?: Array<string | number>;
  /** Off (default): clicking a branch expands it. On: a branch is a value too. */
  branchSelectable?: boolean;
}
export declare function TreeSelect(p: TreeSelectProps): JSX.Element;
