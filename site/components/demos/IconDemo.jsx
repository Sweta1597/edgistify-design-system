'use client';

import { useMemo, useState } from 'react';
import * as LIB from '@edgistify/design-system/icons';
import manifest from '@edgistify/design-system/icons/manifest';
import { Icon } from '@edgistify/design-system/react/Icon';
import { Badge } from '@edgistify/design-system/react/Badge';

/* The five sizes the products render at. 48 is the empty-state size and
   gets its own drawing; it is in the optical proof rather than here. */
const SIZES = [14, 16, 20, 24, 32];
const CATEGORIES = ['navigation', 'logistics', 'devices', 'actions', 'status', 'documents'];
const STATUSES = ['seed', 'drawn', 'approved'];
/* Status is workflow, never brand — RULE 01 applies to badges here too. */
const TONE = { seed: 'neutral', drawn: 'info', approved: 'success' };

const defOf = (name) => LIB.ICONS[name];

/* An outline/filled pair at one size on one ground. */
function Pair({ name, size }) {
  const def = defOf(name);
  return (
    <span className="ico-pair" title={`${name} ${size}px`}>
      <Icon icon={def} size={size} />
      <Icon icon={def} size={size} filled />
    </span>
  );
}

function Ground({ variant, name, sizes = SIZES, same }) {
  return (
    <div className={`ico-row ico-row--${variant}`}>
      {sizes.map((s) => <Pair key={s} name={name} size={s} />)}
      {same && <span className="ico-same">fill = outline</span>}
    </div>
  );
}

export function Tile({ entry }) {
  const same = Object.values(entry.fillIdentical ?? {}).some(Boolean);
  return (
    <div className="ico-tile">
      <div className="ico-head">
        <span className="ico-name">{entry.name}</span>
        <span className="ico-ver">v{entry.version}</span>
        <Badge tone={TONE[entry.status]} size="sm">{entry.status}</Badge>
      </div>
      <Ground variant="light" name={entry.name} same={same} />
      <Ground variant="dark" name={entry.name} />
    </div>
  );
}

export function ContactSheet() {
  const [cat, setCat] = useState('all');
  const [status, setStatus] = useState('all');
  const [q, setQ] = useState('');
  const list = useMemo(() => manifest.icons.filter((ic) =>
    (cat === 'all' || ic.category === cat) &&
    (status === 'all' || ic.status === status) &&
    (!q || ic.name.includes(q.toLowerCase()) || (ic.lucide ?? '').toLowerCase().includes(q.toLowerCase()))
  ), [cat, status, q]);

  return (
    <div>
      <div className="ico-filters">
        <input className="ed-input" type="search" placeholder="Find by name or lucide name"
               value={q} onChange={(e) => setQ(e.target.value)} aria-label="Find an icon" />
        <select className="ed-select" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="ed-select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="all">Any status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="ico-count">{list.length} of {manifest.icons.length}</span>
      </div>
      <div className="ico-grid">
        {list.map((ic) => <Tile key={ic.name} entry={ic} />)}
      </div>
    </div>
  );
}

/* Every nearPairs entry is symmetric in the manifest, so grouping by
   connected names gives each cluster once. */
function pairGroups() {
  const seen = new Set(), groups = [];
  for (const ic of manifest.icons) {
    if (seen.has(ic.name) || !(ic.nearPairs?.length)) continue;
    const g = [ic.name];
    const stack = [...ic.nearPairs];
    seen.add(ic.name);
    while (stack.length) {
      const n = stack.pop();
      if (seen.has(n)) continue;
      seen.add(n); g.push(n);
      for (const m of manifest.icons.find((x) => x.name === n)?.nearPairs ?? []) stack.push(m);
    }
    groups.push(g.sort());
  }
  return groups;
}

export function NearPairs() {
  const groups = useMemo(pairGroups, []);
  return (
    <div className="ico-pairs">
      {groups.map((g) => (
        <div className="ico-pairgroup" key={g.join('/')}>
          <div className="ico-names">{g.join(' / ')}</div>
          <div className="ico-grounds">
            <div className="ico-row ico-row--light">{g.map((n) => <Pair key={n} name={n} size={14} />)}</div>
            <div className="ico-row ico-row--dark">{g.map((n) => <Pair key={n} name={n} size={14} />)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FillIdentical() {
  const list = manifest.icons.filter((ic) => Object.values(ic.fillIdentical ?? {}).some(Boolean));
  return (
    <p className="sub">
      <strong>{list.length} of {manifest.icons.length}</strong> have no counter to punch, so both
      states are the same drawing and selection has to come from the panel and the label:{' '}
      {list.map((ic, i) => <span key={ic.name}><code className="mono">{ic.name}</code>{i < list.length - 1 ? ', ' : ''}</span>)}.
    </p>
  );
}

/* Three drawings at one rendered size: what changes is the weight and
   how open the counters are, not the scale. */
export function OpticalProof({ name = 'package' }) {
  const def = defOf(name);
  return (
    <div className="ico-opt">
      {[20, 24, 48].map((s) => {
        const art = def.outline[s];
        if (!art) return null;
        return (
          <figure key={s}>
            <span className="opt opt--big">
              <svg viewBox="0 -960 960 960" aria-hidden="true">
                <path d={art.body} fill="currentColor" />
                {art.accent && <path d={art.accent} fill="currentColor" />}
              </svg>
            </span>
            <figcaption>{name} · drawn for {s}dp</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export function Counts() {
  const by = (s) => manifest.icons.filter((ic) => ic.status === s).length;
  return (
    <>
      <strong>{manifest.icons.length}</strong> icons — {by('seed')} seed, {by('drawn')} drawn, {by('approved')} approved.
      Library <code className="mono">{LIB.LIBRARY_VERSION}</code>.
    </>
  );
}
