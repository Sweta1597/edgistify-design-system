import * as React from 'react';

export type TableDensity = 'compact' | 'default' | 'comfortable';
export type RowSeverity = 'danger' | 'warning' | 'success';
export type SortDirection = 'asc' | 'desc';

export interface TableWrapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Caps the scroll box so the sticky head has something to stick against. */
  maxHeight?: number | string;
}
export declare const TableWrap: React.FC<TableWrapProps>;

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
  /** Stripes instead of hairlines. Never both. */
  zebra?: boolean;
  /** Rows are pointers and take focus. */
  clickable?: boolean;
  /** Freezes the first column for tables that scroll sideways. */
  pinFirst?: boolean;
  /** Opts out of the sticky header. */
  staticHead?: boolean;
  /** Reader-managed columns: pin and reorder. Wins over pinFirst. */
  managed?: boolean;
}
export declare const Table: React.FC<TableProps> & {
  Wrap: typeof TableWrap; Head: typeof THead; Body: typeof TBody; Foot: typeof TFoot;
  Tr: typeof Tr; Th: typeof Th; Td: typeof Td; Empty: typeof TableEmpty;
};

export declare const THead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
export declare const TBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
export declare const TFoot: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  severity?: RowSeverity;
}
export declare const Tr: React.FC<TrProps>;

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  num?: boolean; select?: boolean; actions?: boolean;
  /** Current direction. Drives aria-sort and the arrow together. */
  sort?: SortDirection;
  /** Providing this makes the header a real button. */
  onSort?: () => void;
  /** Pin toggle, from useColumns().pinProps(id). */
  pin?: ColumnControlProps;
  /** Reorder grip, from useColumns().gripProps(id). Keyboard-first. */
  grip?: ColumnControlProps;
}
export declare function Th(p: ThProps): JSX.Element;

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  num?: boolean;
  /** SKU, order id, bin, pincode — mono with a slashed zero. */
  id?: boolean;
  strong?: boolean; muted?: boolean; top?: boolean; nowrap?: boolean;
  select?: boolean; actions?: boolean;
}
export declare const Td: React.FC<TdProps>;

export interface TableEmptyProps { colSpan: number; title?: React.ReactNode; children?: React.ReactNode }
export declare const TableEmpty: React.FC<TableEmptyProps>;

/** Prop bags from useColumns(); spread straight onto <Th>. */
export interface ColumnControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
