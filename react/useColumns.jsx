import React from 'react';

/* ==================================================================
   useColumns — the state behind a table whose columns the reader owns.

   Pinning is sticky positioning, and sticky needs a `left` for every
   pinned cell. Which columns are pinned changes at runtime, so the
   offsets are measured from the rendered header and written inline;
   CSS only says what a pinned cell looks like once it has one.

   REORDERING IS KEYBOARD-FIRST. A drag handle with no arrow-key path
   is a keyboard trap, and it is the failure every reorderable table
   ships with. Focus a grip, press ArrowLeft/ArrowRight, done — the
   pointer drag is the second way in, not the only one.
   ================================================================== */
export function useColumns(initial, { onChange } = {}) {
  const [order, setOrder] = React.useState(() => initial.map((c) => c.id));
  const [pinned, setPinned] = React.useState(
    () => initial.filter((c) => c.pinned).map((c) => c.id)
  );
  const [grabbed, setGrabbed] = React.useState(null);   // keyboard carry
  const [dragging, setDragging] = React.useState(null); // pointer drag
  const [dropTarget, setDropTarget] = React.useState(null);
  const [offsets, setOffsets] = React.useState({});
  const headRef = React.useRef(null);

  const byId = React.useMemo(
    () => Object.fromEntries(initial.map((c) => [c.id, c])), [initial]
  );

  /* Pinned columns are always leftmost, whatever the drag order says — a
     pinned column floating in the middle would stick to the left edge and
     land on top of whatever is actually there. */
  const columns = React.useMemo(() => {
    const pin = order.filter((id) => pinned.includes(id));
    const rest = order.filter((id) => !pinned.includes(id));
    return [...pin, ...rest].map((id) => byId[id]).filter(Boolean);
  }, [order, pinned, byId]);

  React.useEffect(() => { onChange?.({ order: columns.map((c) => c.id), pinned }); },
    [columns, pinned, onChange]);

  /* Measure after layout: each pinned column starts where the previous one
     ended. Reading widths in an effect rather than guessing them is the only
     way this survives a column whose content changes. */
  React.useLayoutEffect(() => {
    const head = headRef.current;
    if (!head) { setOffsets({}); return; }
    let x = 0;
    const next = {};
    for (const c of columns) {
      if (!pinned.includes(c.id)) break;      // pinned run is contiguous at the left
      next[c.id] = x;
      const cell = head.querySelector(`[data-col="${CSS.escape(c.id)}"]`);
      x += cell ? cell.getBoundingClientRect().width : 0;
    }
    setOffsets((prev) => {
      const same = Object.keys(next).length === Object.keys(prev).length
        && Object.entries(next).every(([k, v]) => prev[k] === v);
      return same ? prev : next;
    });
  }, [columns, pinned]);

  const move = React.useCallback((id, delta) => {
    setOrder((o) => {
      const from = o.indexOf(id);
      const to = from + delta;
      if (from < 0 || to < 0 || to >= o.length) return o;
      const next = [...o];
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });
  }, []);

  const moveTo = React.useCallback((id, beforeId) => {
    setOrder((o) => {
      const next = o.filter((x) => x !== id);
      const at = beforeId == null ? next.length : next.indexOf(beforeId);
      next.splice(at < 0 ? next.length : at, 0, id);
      return next;
    });
  }, []);

  const togglePin = React.useCallback((id) => {
    setPinned((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }, []);

  const lastPinned = columns.filter((c) => pinned.includes(c.id)).slice(-1)[0]?.id;

  /* Spread on BOTH the th and every td of that column, so a pinned cell and
     its header stick to the same place. */
  const cellProps = React.useCallback((id) => {
    const isPinned = pinned.includes(id);
    return {
      'data-col': id,
      'data-pinned': isPinned ? (id === lastPinned ? 'last' : 'true') : undefined,
      style: isPinned ? { left: offsets[id] ?? 0 } : undefined,
    };
  }, [pinned, offsets, lastPinned]);

  const headerProps = React.useCallback((id) => ({
    ...cellProps(id),
    'data-dragging': dragging === id ? 'true' : undefined,
    'data-grabbed': grabbed === id ? 'true' : undefined,
    'data-dropbefore': dropTarget?.id === id && dropTarget.side === 'before' ? 'true' : undefined,
    'data-dropafter': dropTarget?.id === id && dropTarget.side === 'after' ? 'true' : undefined,
    onDragOver: (e) => {
      if (!dragging || dragging === id) return;
      e.preventDefault();
      const r = e.currentTarget.getBoundingClientRect();
      setDropTarget({ id, side: e.clientX < r.left + r.width / 2 ? 'before' : 'after' });
    },
    onDrop: (e) => {
      e.preventDefault();
      if (dragging && dropTarget) {
        const after = dropTarget.side === 'after';
        const target = columns.findIndex((c) => c.id === dropTarget.id);
        const nextId = after ? columns[target + 1]?.id ?? null : dropTarget.id;
        moveTo(dragging, nextId === dragging ? null : nextId);
      }
      setDragging(null); setDropTarget(null);
    },
  }), [cellProps, dragging, grabbed, dropTarget, columns, moveTo]);

  const pinProps = React.useCallback((id) => ({
    type: 'button',
    className: 'ed-table__colbtn',
    'aria-pressed': pinned.includes(id),
    'aria-label': `${pinned.includes(id) ? 'Unpin' : 'Pin'} ${byId[id]?.label ?? id} column`,
    onClick: () => togglePin(id),
  }), [pinned, byId, togglePin]);

  const gripProps = React.useCallback((id) => ({
    type: 'button',
    draggable: true,
    className: 'ed-table__colbtn ed-table__colbtn--grip',
    'aria-label': `Reorder ${byId[id]?.label ?? id} column`,
    'aria-describedby': 'ed-col-help',
    onDragStart: (e) => { setDragging(id); e.dataTransfer.effectAllowed = 'move'; },
    onDragEnd: () => { setDragging(null); setDropTarget(null); },
    onKeyDown: (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        move(id, e.key === 'ArrowLeft' ? -1 : 1);
        setGrabbed(id);
        /* Focus follows the column, not the position — otherwise the second
           arrow press moves whatever slid into the old slot. */
        requestAnimationFrame(() => e.target.focus());
      }
      if (e.key === 'Escape') setGrabbed(null);
    },
    onBlur: () => setGrabbed(null),
  }), [byId, move]);

  /* One call per header. headerProps carries the sticky offset and the drag
     targets; pin and grip are handed straight to <Th>, which only renders
     them. */
  const thProps = React.useCallback((id) => ({
    ...headerProps(id),
    pin: pinProps(id),
    grip: gripProps(id),
  }), [headerProps, pinProps, gripProps]);

  return { columns, pinned, order: columns.map((c) => c.id), thProps,
           headRef, cellProps, headerProps, pinProps, gripProps,
           togglePin, move, reset: () => { setOrder(initial.map((c) => c.id));
             setPinned(initial.filter((c) => c.pinned).map((c) => c.id)); } };
}

export default useColumns;
