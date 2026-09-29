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
  managed = false, staticHead = false, className = '', ...rest
}) => (
  <table
    className={cx('ed-table',
      density && density !== 'default' && `ed-table--${density}`,
      zebra && 'ed-table--zebra',
      clickable && 'ed-table--clickable',
      /* pinFirst is the fixed kind: one column, chosen by whoever built the
         screen. managed is the other kind, where the reader chooses. Setting
         both means two different answers to the same question. */
      pinFirst && !managed && 'ed-table--pin-first',
      managed && 'ed-table--managed',
      staticHead && 'ed-table--static',
      className)}
    {...rest}
  />
);

/* THead forwards its ref: useColumns measures the rendered header to work
   out where each pinned column starts. */
export const THead = React.forwardRef((p, ref) => <thead ref={ref} {...p} />);
THead.displayName = 'THead';
export const TBody = (p) => <tbody {...p} />;
export const TFoot = (p) => <tfoot {...p} />;

export const Tr = ({ selected = false, severity, className = '', ...rest }) => (
  <tr className={cx(selected && 'ed-tr--selected', severity && `ed-tr--${severity}`, className)} {...rest} />
);

/**
 * `sort` drives both aria-sort and the arrow, so the accessible name and the
 * visible indicator cannot drift apart. Passing onSort makes the header a button.
 */
/* Inlined rather than imported, like Badge's remove glyph: the package
   ships no icon library, and these two are small enough that depending on
   one for them would be the tail wagging the dog. */
/* One drawing, not two. Pinned is signalled by COLOUR — the stroke turns
   teal via .ed-table__colbtn[aria-pressed="true"] — so there is no filled
   variant to keep in step with the outline one.

   Drawn upright and rotated 45deg rather than re-plotted at an angle: the
   rotated coordinates would be unreadable and impossible to adjust, and the
   transform is exact where hand-derived beziers would not be. */
function PinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {/* Rotated AND scaled about the centre. At 45deg the upright pin's
          14x20 box spans the full 24 diagonally, so the 1.8 stroke — centred
          on the path, half of it outside — was clipped at all four edges.
          0.88 leaves room for it. Scale must follow rotate here: a bare
          scale() works about the origin, not the centre. */}
      <g transform="translate(12 12) rotate(45) scale(0.88) translate(-12 -12)">
        <path d="M12 17v5" />
        <path d="M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.8l-1.8-.9A2 2 0 0 1 15 10.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
      </g>
    </svg>
  );
}function GripGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <circle cx="9" cy="6" r="1.6" /><circle cx="15" cy="6" r="1.6" />
      <circle cx="9" cy="12" r="1.6" /><circle cx="15" cy="12" r="1.6" />
      <circle cx="9" cy="18" r="1.6" /><circle cx="15" cy="18" r="1.6" />
    </svg>
  );
}

/**
 * `pin` and `grip` take the prop bags useColumns() produces:
 *
 *   <Th {...cols.thProps('order')}>Order</Th>
 *
 * They are plain objects rather than booleans-plus-callbacks so the header
 * stays ignorant of where the state lives — useColumns is one source, a
 * Redux store or a URL param is another, and Th does not need to know.
 */
export function Th({ num = false, select = false, actions = false, sort, onSort,
                     pin, grip, className = '', children, ...rest }) {
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
      {(pin || grip) && (
        <span className="ed-table__colctl">
          {pin && <button {...pin}><PinGlyph /></button>}
          {grip && <button {...grip}><GripGlyph /></button>}
        </span>
      )}
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
