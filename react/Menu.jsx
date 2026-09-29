import React from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');
const Chevron = (p) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="m4 6 4 4 4-4"/></svg>
);
const Caret = (p) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="m6 4 4 4-4 4"/></svg>
);
const Tick = (p) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="m3 8 3.5 3.5L13 5"/></svg>
);
const Cross = (p) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" aria-hidden="true" {...p}><path d="M12 4 4 12M4 4l8 8"/></svg>
);

/* ------------------------------------------------------------------
   Shared popover core.

   The panel is a native popover, so the browser owns the top layer,
   light dismissal and Escape. We own placement and the keyboard model.
   ------------------------------------------------------------------ */
function usePopover({ onOpenChange } = {}) {
  const triggerRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const place = React.useCallback(() => {
    const t = triggerRef.current, p = panelRef.current;
    if (!t || !p) return;
    const r = t.getBoundingClientRect();
    p.style.setProperty('--ed-pop-anchor-w', `${r.width}px`);
    p.style.left = '0px'; p.style.top = '0px';
    const pr = p.getBoundingClientRect();
    const gap = 4;
    // Flip up when there is not room below, and keep it on screen sideways.
    const below = window.innerHeight - r.bottom;
    const top = (below < pr.height + gap && r.top > below) ? r.top - pr.height - gap : r.bottom + gap;
    const left = Math.max(8, Math.min(r.left, window.innerWidth - pr.width - 8));
    p.style.left = `${left + window.scrollX}px`;
    p.style.top = `${top + window.scrollY}px`;
  }, []);

  const show = React.useCallback(() => {
    panelRef.current?.showPopover?.();
    setOpen(true); onOpenChange?.(true);
    requestAnimationFrame(place);
  }, [place, onOpenChange]);

  const hide = React.useCallback(() => {
    panelRef.current?.hidePopover?.();
  }, []);

  React.useEffect(() => {
    const p = panelRef.current;
    if (!p) return;
    const onToggle = (e) => {
      const isOpen = e.newState === 'open';
      setOpen(isOpen);
      onOpenChange?.(isOpen);
      if (!isOpen) triggerRef.current?.focus();
    };
    p.addEventListener('toggle', onToggle);
    return () => p.removeEventListener('toggle', onToggle);
  }, [onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    const on = () => place();
    window.addEventListener('resize', on);
    window.addEventListener('scroll', on, true);
    return () => { window.removeEventListener('resize', on); window.removeEventListener('scroll', on, true); };
  }, [open, place]);

  return { triggerRef, panelRef, open, show, hide, place };
}

/* Roving highlight over a flat list of enabled indices. */
function useActive(count, open, isDisabled = () => false) {
  const [i, setI] = React.useState(-1);
  React.useEffect(() => { if (!open) setI(-1); }, [open]);
  const step = (d) => setI(cur => {
    if (!count) return -1;
    let n = cur;
    for (let k = 0; k < count; k++) {
      n = (n + d + count) % count;
      if (!isDisabled(n)) return n;
    }
    return cur;
  });
  return [i, setI, step];
}

/* ==================================================================
   Menu — items are ACTIONS.
   ================================================================== */
export function Menu({ trigger, items = [], align = 'start', className = '' }) {
  const { triggerRef, panelRef, open, show, hide } = usePopover();
  const id = React.useId();
  const rows = items.filter(x => x.type !== 'separator' && x.type !== 'label');
  const [act, setAct, step] = useActive(rows.length, open, n => rows[n]?.disabled);

  const run = (item) => { if (item.disabled) return; hide(); item.onSelect?.(); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); open ? step(1) : show(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); open ? step(-1) : show(); }
    else if (e.key === 'Home') { e.preventDefault(); setAct(0); }
    else if (e.key === 'End') { e.preventDefault(); setAct(rows.length - 1); }
    else if ((e.key === 'Enter' || e.key === ' ') && open && act >= 0) { e.preventDefault(); run(rows[act]); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); }
  };

  let r = -1;
  return (
    <>
      {React.cloneElement(trigger, {
        ref: triggerRef, onClick: () => (open ? hide() : show()), onKeyDown,
        'aria-haspopup': 'menu', 'aria-expanded': open, 'aria-controls': id,
      })}
      <div ref={panelRef} id={id} popover="auto" role="menu"
           className={cx('ed-pop', className)}
           aria-activedescendant={act >= 0 ? `${id}-${act}` : undefined}>
        <ul className="ed-pop__list">
          {items.map((it, k) => {
            if (it.type === 'separator') return <li key={k}><hr className="ed-pop__sep" /></li>;
            if (it.type === 'label') return <li key={k} className="ed-pop__group-label">{it.label}</li>;
            r++; const mine = r;
            return (
              <li key={k}>
                <button type="button" role="menuitem" id={`${id}-${mine}`} tabIndex={-1}
                  className={cx('ed-pop__item', it.danger && 'ed-pop__item--danger',
                                act === mine && 'ed-pop__item--active')}
                  aria-disabled={it.disabled || undefined}
                  onMouseEnter={() => setAct(mine)}
                  onClick={() => run(it)}>
                  {it.icon}
                  <span className="ed-pop__text">{it.label}
                    {it.hint && <span className="ed-pop__hint">{it.hint}</span>}</span>
                  {it.shortcut && <span className="ed-pop__meta">{it.shortcut}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

/* ==================================================================
   Select — one value, searchable. For long lists; a short native
   <select> is better and this file says so.
   ================================================================== */
export function Select({
  options = [], value, onChange, placeholder = 'Select…',
  searchable = true, disabled = false, invalid = false, id: htmlId, className = '', ...rest
}) {
  const { triggerRef, panelRef, open, show, hide } = usePopover();
  const uid = React.useId();
  const id = htmlId || uid;
  const [q, setQ] = React.useState('');
  const searchRef = React.useRef(null);

  const flat = React.useMemo(() => {
    const t = q.trim().toLowerCase();
    return options.filter(o => !t || String(o.label).toLowerCase().includes(t)
                               || String(o.value).toLowerCase().includes(t));
  }, [options, q]);

  const [act, setAct, step] = useActive(flat.length, open, n => flat[n]?.disabled);
  React.useEffect(() => { if (open) { setQ(''); requestAnimationFrame(() => searchRef.current?.focus()); } }, [open]);
  React.useEffect(() => { setAct(flat.findIndex(o => o.value === value)); }, [flat, value, setAct]);

  const pick = (o) => { if (o.disabled) return; onChange?.(o.value); hide(); };
  const current = options.find(o => o.value === value);

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(); return; }
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (act >= 0) pick(flat[act]); }
  };

  return (
    <>
      <button type="button" ref={triggerRef} id={id} disabled={disabled}
        className={cx('ed-combo', className)}
        role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? hide() : show())} onKeyDown={onKeyDown} {...rest}>
        <span className={cx('ed-combo__value', !current && 'ed-combo__value--empty')}>
          {current ? current.label : placeholder}
        </span>
        <Chevron className="ed-combo__chevron" />
      </button>

      <div ref={panelRef} popover="auto" className="ed-pop">
        {searchable && (
          <div className="ed-pop__search">
            <input ref={searchRef} className="ed-input ed-input--sm" type="text" value={q}
              placeholder="Search…" aria-label="Search options" aria-controls={`${id}-list`}
              onChange={e => setQ(e.target.value)} onKeyDown={onKeyDown} />
          </div>
        )}
        <ul className="ed-pop__list" id={`${id}-list`} role="listbox"
            aria-activedescendant={act >= 0 ? `${id}-o${act}` : undefined}>
          {flat.length === 0 && <li className="ed-pop__empty">No matches</li>}
          {flat.map((o, n) => (
            <li key={o.value}>
              <div role="option" id={`${id}-o${n}`}
                aria-selected={o.value === value}
                aria-disabled={o.disabled || undefined}
                className={cx('ed-pop__item', act === n && 'ed-pop__item--active')}
                onMouseEnter={() => setAct(n)} onClick={() => pick(o)}>
                {o.icon}
                <span className="ed-pop__text">{o.label}
                  {o.hint && <span className="ed-pop__hint">{o.hint}</span>}</span>
                {o.meta && <span className="ed-pop__meta">{o.meta}</span>}
                <Tick className="ed-pop__tick" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ==================================================================
   MultiSelect — many values. Chips up to `maxTokens`, then a count,
   because thirty chips is not a control any more.
   ================================================================== */
export function MultiSelect({
  options = [], value = [], onChange, placeholder = 'Select…',
  searchable = true, maxTokens = 3, disabled = false, invalid = false,
  id: htmlId, className = '', ...rest
}) {
  const { triggerRef, panelRef, open, show, hide } = usePopover();
  const uid = React.useId();
  const id = htmlId || uid;
  const [q, setQ] = React.useState('');
  const searchRef = React.useRef(null);
  const set = React.useMemo(() => new Set(value), [value]);

  const flat = React.useMemo(() => {
    const t = q.trim().toLowerCase();
    return options.filter(o => !t || String(o.label).toLowerCase().includes(t));
  }, [options, q]);
  const [act, setAct, step] = useActive(flat.length, open, n => flat[n]?.disabled);
  React.useEffect(() => { if (open) { setQ(''); requestAnimationFrame(() => searchRef.current?.focus()); } }, [open]);

  const toggle = (o) => {
    if (o.disabled) return;
    const next = new Set(set);
    next.has(o.value) ? next.delete(o.value) : next.add(o.value);
    onChange?.(options.filter(x => next.has(x.value)).map(x => x.value));
  };
  const remove = (v, e) => { e.stopPropagation(); onChange?.(value.filter(x => x !== v)); };

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(); return; }
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (act >= 0) toggle(flat[act]); }
  };

  const chosen = options.filter(o => set.has(o.value));
  const shown = chosen.slice(0, maxTokens);
  const allOn = flat.length > 0 && flat.every(o => set.has(o.value));

  return (
    <>
      <button type="button" ref={triggerRef} id={id} disabled={disabled}
        className={cx('ed-combo ed-combo--multi', className)}
        role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? hide() : show())} onKeyDown={onKeyDown} {...rest}>
        {chosen.length === 0
          ? <span className="ed-combo__value ed-combo__value--empty">{placeholder}</span>
          : (
            <span className="ed-tokens">
              {shown.map(o => (
                <span className="ed-token" key={o.value}>
                  <span className="ed-token__label">{o.label}</span>
                  <span role="button" tabIndex={-1} className="ed-token__x"
                        aria-label={`Remove ${o.label}`}
                        onClick={e => remove(o.value, e)}><Cross /></span>
                </span>
              ))}
              {chosen.length > shown.length &&
                <span className="ed-token ed-token--count">+{chosen.length - shown.length} more</span>}
            </span>
          )}
        <Chevron className="ed-combo__chevron" />
      </button>

      <div ref={panelRef} popover="auto" className="ed-pop">
        {searchable && (
          <div className="ed-pop__search">
            <input ref={searchRef} className="ed-input ed-input--sm" type="text" value={q}
              placeholder="Search…" aria-label="Search options"
              onChange={e => setQ(e.target.value)} onKeyDown={onKeyDown} />
          </div>
        )}
        <ul className="ed-pop__list" id={`${id}-list`} role="listbox" aria-multiselectable="true"
            aria-activedescendant={act >= 0 ? `${id}-o${act}` : undefined}>
          {flat.length === 0 && <li className="ed-pop__empty">No matches</li>}
          {flat.map((o, n) => (
            <li key={o.value}>
              <div role="option" id={`${id}-o${n}`}
                aria-selected={set.has(o.value)} aria-disabled={o.disabled || undefined}
                className={cx('ed-pop__item', act === n && 'ed-pop__item--active')}
                onMouseEnter={() => setAct(n)} onClick={() => toggle(o)}>
                <input type="checkbox" className="ed-checkbox" tabIndex={-1}
                       checked={set.has(o.value)} readOnly aria-hidden="true" />
                <span className="ed-pop__text">{o.label}
                  {o.hint && <span className="ed-pop__hint">{o.hint}</span>}</span>
                {o.meta && <span className="ed-pop__meta">{o.meta}</span>}
              </div>
            </li>
          ))}
        </ul>
        <div className="ed-pop__footer">
          <button type="button" className="ed-btn ed-btn--link"
            onClick={() => onChange?.(allOn ? [] : options.filter(o => !o.disabled).map(o => o.value))}>
            {allOn ? 'Clear all' : 'Select all'}
          </button>
          <span className="ed-pop__meta">{chosen.length} selected</span>
        </div>
      </div>
    </>
  );
}

/* ==================================================================
   CascadeSelect — the value is a PATH. Choosing a parent populates the
   next column. Warehouse → zone → aisle → bin.
   ================================================================== */
export function CascadeSelect({
  options = [], value = [], onChange, placeholder = 'Select…',
  separator = ' › ', leafOnly = true, disabled = false, id: htmlId, className = '', ...rest
}) {
  const { triggerRef, panelRef, open, show, hide, place } = usePopover();
  const uid = React.useId();
  const id = htmlId || uid;
  const [path, setPath] = React.useState(value);
  React.useEffect(() => { if (open) setPath(value); }, [open, value]);

  // Columns: level 0 is the roots; each further column is the chosen node's children.
  const cols = React.useMemo(() => {
    const out = [options];
    let level = options;
    for (const v of path) {
      const node = level.find(o => o.value === v);
      if (!node?.children?.length) break;
      out.push(node.children);
      level = node.children;
    }
    return out;
  }, [options, path]);

  const labels = React.useMemo(() => {
    const out = []; let level = options;
    for (const v of path) {
      const node = level.find(o => o.value === v);
      if (!node) break;
      out.push(node.label);
      level = node.children || [];
    }
    return out;
  }, [options, path]);

  const choose = (depth, o) => {
    if (o.disabled) return;
    const next = [...path.slice(0, depth), o.value];
    setPath(next);
    const leaf = !o.children?.length;
    if (leaf || !leafOnly) { onChange?.(next); if (leaf) hide(); }
    requestAnimationFrame(place);
  };

  const done = value.length > 0;
  return (
    <>
      <button type="button" ref={triggerRef} id={id} disabled={disabled}
        className={cx('ed-combo', className)}
        role="combobox" aria-haspopup="tree" aria-expanded={open}
        onClick={() => (open ? hide() : show())} {...rest}>
        <span className={cx('ed-combo__value', !done && 'ed-combo__value--empty')}>
          {done ? labelsFor(options, value).join(separator) : placeholder}
        </span>
        <Chevron className="ed-combo__chevron" />
      </button>

      <div ref={panelRef} popover="auto" className="ed-pop" style={{ maxWidth: 'min(94vw, 34rem)' }}>
        {labels.length > 0 && (
          <div className="ed-cascade__path" aria-live="polite">
            {labels.map((l, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Caret />}
                <b>{l}</b>
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="ed-cascade">
          {cols.map((col, depth) => (
            <div className="ed-cascade__col" key={depth}>
              <ul className="ed-pop__list" role="listbox"
                  aria-label={depth === 0 ? 'Level 1' : `Level ${depth + 1}`}>
                {col.map(o => {
                  const parent = !!o.children?.length;
                  return (
                    <li key={o.value}>
                      <div role="option" aria-selected={path[depth] === o.value}
                        aria-disabled={o.disabled || undefined}
                        className={cx('ed-pop__item', parent && 'ed-pop__item--parent')}
                        onClick={() => choose(depth, o)}>
                        <span className="ed-pop__text">{o.label}</span>
                        {parent
                          ? <span className="ed-pop__meta"><Caret /></span>
                          : <Tick className="ed-pop__tick" />}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function labelsFor(options, path) {
  const out = []; let level = options;
  for (const v of path) {
    const n = level.find(o => o.value === v);
    if (!n) break;
    out.push(n.label); level = n.children || [];
  }
  return out;
}

/* ==================================================================
   TreeSelect — one hierarchy, expanded in place. For a category tree,
   where the shape matters and the depth is uneven.
   ================================================================== */
export function TreeSelect({
  options = [], value, onChange, placeholder = 'Select…',
  defaultExpanded = [], branchSelectable = false, disabled = false,
  id: htmlId, className = '', ...rest
}) {
  const { triggerRef, panelRef, open, show, hide, place } = usePopover();
  const uid = React.useId();
  const id = htmlId || uid;
  const [exp, setExp] = React.useState(() => new Set(defaultExpanded));

  const rows = React.useMemo(() => {
    const out = [];
    const walk = (nodes, level) => nodes.forEach(n => {
      const kids = n.children?.length ? n.children : null;
      out.push({ ...n, level, hasKids: !!kids });
      if (kids && exp.has(n.value)) walk(kids, level + 1);
    });
    walk(options, 0);
    return out;
  }, [options, exp]);

  const toggleExp = (v, e) => {
    e.stopPropagation();
    setExp(s => { const n = new Set(s); n.has(v) ? n.delete(v) : n.add(v); return n; });
    requestAnimationFrame(place);
  };
  const pick = (n) => {
    if (n.disabled) return;
    if (n.hasKids && !branchSelectable) return setExp(s => {
      const x = new Set(s); x.has(n.value) ? x.delete(n.value) : x.add(n.value); return x;
    });
    onChange?.(n.value); hide();
  };
  const current = rows.find(n => n.value === value) || flatFind(options, value);

  return (
    <>
      <button type="button" ref={triggerRef} id={id} disabled={disabled}
        className={cx('ed-combo', className)}
        role="combobox" aria-haspopup="tree" aria-expanded={open}
        onClick={() => (open ? hide() : show())} {...rest}>
        <span className={cx('ed-combo__value', !current && 'ed-combo__value--empty')}>
          {current ? current.label : placeholder}
        </span>
        <Chevron className="ed-combo__chevron" />
      </button>

      <div ref={panelRef} popover="auto" className="ed-pop">
        <ul className="ed-pop__list ed-tree" role="tree">
          {rows.map(n => (
            <li key={n.value} role="treeitem"
                aria-level={n.level + 1}
                aria-expanded={n.hasKids ? exp.has(n.value) : undefined}
                aria-selected={n.value === value}
                className="ed-tree__item">
              <div className={cx('ed-pop__item')} style={{ '--level': n.level }}
                   aria-disabled={n.disabled || undefined} onClick={() => pick(n)}>
                {n.hasKids
                  ? <span role="button" tabIndex={-1} className="ed-tree__twisty"
                          aria-label={exp.has(n.value) ? `Collapse ${n.label}` : `Expand ${n.label}`}
                          onClick={e => toggleExp(n.value, e)}><Caret /></span>
                  : <span className="ed-tree__spacer" />}
                <span className="ed-pop__text">{n.label}</span>
                {n.meta && <span className="ed-pop__meta">{n.meta}</span>}
                {n.value === value && <Tick className="ed-pop__tick" style={{ opacity: 1 }} />}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function flatFind(nodes, v) {
  for (const n of nodes) {
    if (n.value === v) return n;
    const hit = n.children && flatFind(n.children, v);
    if (hit) return hit;
  }
  return null;
}
