import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/**
 * Table.
 *
 * Sticky head is ON by default — pass `staticHead` to opt out. The dashboard's
 * 45 tables have it twice, which is the defect this is correcting.
 *
 *   <TableWrap>
 *     <Table density="compact">
 *       <THead><Tr><Th sort="asc" onSort={…}>SKU</Th><Th num>Qty</Th></Tr></THead>
 *       <TBody><Tr><Td id>SKU-4417</Td><Td num>1,240</Td></Tr></TBody>
 *     </Table>
 *   </TableWrap>
 */
export const TableWrap = ({ maxHeight, className = '', style, ...rest }) => (
  <div className={cx('ed-table-wrap', className)} style={{ maxHeight, ...style }} {...rest} />
);

export const Table = ({
  density, zebra = false, clickable = false, pinFirst = false,
  staticHead = false, className = '', ...rest
}) => (
  <table
    className={cx('ed-table',
      density && density !== 'default' && `ed-table--${density}`,
      zebra && 'ed-table--zebra',
      clickable && 'ed-table--clickable',
      pinFirst && 'ed-table--pin-first',
      staticHead && 'ed-table--static',
      className)}
    {...rest}
  />
);

export const THead = (p) => <thead {...p} />;
export const TBody = (p) => <tbody {...p} />;
export const TFoot = (p) => <tfoot {...p} />;

export const Tr = ({ selected = false, severity, className = '', ...rest }) => (
  <tr className={cx(selected && 'ed-tr--selected', severity && `ed-tr--${severity}`, className)} {...rest} />
);

/**
 * `sort` drives both aria-sort and the arrow, so the accessible name and the
 * visible indicator cannot drift apart. Passing onSort makes the header a button.
 */
export function Th({ num = false, select = false, actions = false, sort, onSort,
                     className = '', children, ...rest }) {
  const sortable = typeof onSort === 'function';
  const ariaSort = sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : sortable ? 'none' : undefined;
  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={cx(num && 'ed-th--num', select && 'ed-th--select', actions && 'ed-th--actions',
        sortable && 'ed-th--sortable', className)}
      {...rest}
    >
      {sortable
        ? <button type="button" onClick={onSort}>{children}</button>
        : children}
    </th>
  );
}

export const Td = ({ num = false, id = false, strong = false, muted = false,
                     top = false, nowrap = false, select = false, actions = false,
                     className = '', ...rest }) => (
  <td
    className={cx(num && 'ed-td--num', id && 'ed-td--id', strong && 'ed-td--strong',
      muted && 'ed-td--muted', top && 'ed-td--top', nowrap && 'ed-td--nowrap',
      select && 'ed-td--select', actions && 'ed-td--actions', className)}
    {...rest}
  />
);

/** Full-width empty state. `colSpan` must match the column count. */
export const TableEmpty = ({ colSpan, title, children }) => (
  <tr>
    <td colSpan={colSpan} className="ed-table__empty">
      {title && <span className="ed-table__empty-title">{title}</span>}
      {children}
    </td>
  </tr>
);

Table.Wrap = TableWrap; Table.Head = THead; Table.Body = TBody; Table.Foot = TFoot;
Table.Tr = Tr; Table.Th = Th; Table.Td = Td; Table.Empty = TableEmpty;
