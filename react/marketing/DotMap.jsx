'use client';
import { useId, useMemo, useState } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');
const U = 20;                                   // viewBox units per degree of latitude

/* Even-odd: is the point inside the ring? */
function inside(x, y, ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/* The land as a hex grid of dots, in one path; and a projection for the places. Longitude is
   squeezed by the cosine of the middle latitude, so the land keeps its proportions. */
function lay(shape, extra, points, step) {
  const all = [...shape.flat(), ...extra, ...points.map((p) => [p.lon, p.lat])];
  const lons = all.map((c) => c[0]), lats = all.map((c) => c[1]);
  const w0 = Math.min(...lons) - step, w1 = Math.max(...lons) + step;
  const s0 = Math.min(...lats) - step, s1 = Math.max(...lats) + step;
  const k = Math.cos((((s0 + s1) / 2) * Math.PI) / 180);
  const at = (lon, lat) => [(lon - w0) * k * U, (s1 - lat) * U];
  const W = (w1 - w0) * k * U, H = (s1 - s0) * U;
  const gap = step * U, row = gap * Math.sqrt(3) / 2, r = gap * 0.2;
  const dot = (x, y) => `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${r} ${r} 0 1 0 ${(2 * r).toFixed(2)} 0a${r} ${r} 0 1 0 ${(-2 * r).toFixed(2)} 0`;
  const d = [];
  for (let y = row / 2, n = 0; y < H; y += row, n++) {
    for (let x = (n % 2 ? gap : gap / 2); x < W; x += gap) {
      const lon = w0 + x / (k * U), lat = s1 - y / U;
      if (shape.some((ring) => inside(lon, lat, ring))) d.push(dot(x, y));
    }
  }
  extra.forEach(([lon, lat]) => d.push(dot(...at(lon, lat))));
  return { W, H, land: d.join(''), at };
}

/**
 * A country drawn as a field of dots, with places on it and a row of filters under it.
 * Hovering, focusing or tapping a filter lights the places tagged with it and names them;
 * the rest dim. A tap pins a filter until it is tapped again. Filters no place is tagged
 * with are left out, and with no tagged places the row is not shown.
 *
 *   shape   rings of [lon, lat] for the land
 *   extra   [lon, lat] dots for islands too small for the grid
 *   points  [{ id, name, lon, lat, tags: [filter ids], side: 'left' | 'right' }]
 *   filters [{ id, label }]
 *   hint    a line over the filters, e.g. "Hover a category"
 *   layout  'side': the map on the left and the filters on the right as a
 *           list of text with hairlines between (stacked on a narrow screen);
 *           default: the filters as pills under the map
 */
export function DotMap({ shape = [], extra = [], points = [], filters = [], step = 0.45, label, hint, layout, className = '', ...rest }) {
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const id = useId();
  const map = useMemo(() => lay(shape, extra, points, step), [shape, extra, points, step]);
  const active = hover ?? pinned;
  const shown = filters.filter((f) => points.some((p) => p.tags?.includes(f.id)));
  const lit = active ? points.filter((p) => p.tags?.includes(active)) : [];
  const activeLabel = shown.find((f) => f.id === active)?.label;

  return (
    <div className={cx('ed-mk-dotmap', layout === 'side' && 'ed-mk-dotmap--side', active && 'ed-mk-dotmap--active', className)} role="group" aria-label={label} {...rest}>
      <div className="ed-mk-dotmap__map" style={{ aspectRatio: `${map.W.toFixed(1)} / ${map.H.toFixed(1)}` }}>
        <svg viewBox={`0 0 ${map.W.toFixed(1)} ${map.H.toFixed(1)}`} aria-hidden="true">
          <defs>
            <radialGradient id={`${id}-glow`}>
              <stop offset="0" className="ed-mk-dotmap__stop" />
              <stop offset="1" className="ed-mk-dotmap__stop" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path className="ed-mk-dotmap__land" d={map.land} />
          {points.map((p) => {
            const [x, y] = map.at(p.lon, p.lat);
            const on = lit.includes(p);
            return (
              <g key={p.id} className={cx('ed-mk-dotmap__pt', on && 'is-on', active && !on && 'is-dim')} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                <circle className="ed-mk-dotmap__glow" r={U * 1.6} fill={`url(#${id}-glow)`} />
                <circle className="ed-mk-dotmap__ring" r={U * 0.34} />
                <circle className="ed-mk-dotmap__core" r={U * 0.2} />
              </g>
            );
          })}
        </svg>
        {points.map((p) => {
          const [x, y] = map.at(p.lon, p.lat);
          return (
            <span key={p.id} className={cx('ed-mk-dotmap__name', lit.includes(p) && 'is-on')} data-side={p.side || 'right'} aria-hidden="true"
              style={{ left: `${((x / map.W) * 100).toFixed(2)}%`, top: `${((y / map.H) * 100).toFixed(2)}%` }}>{p.name}</span>
          );
        })}
      </div>
      {shown.length > 0 && (
        <div className="ed-mk-dotmap__pick">
          {hint && <p className="ed-mk-dotmap__hint">{hint}</p>}
          <ul className="ed-mk-dotmap__filters" onMouseLeave={() => setHover(null)}>
            {shown.map((f) => (
              <li key={f.id}>
                <button type="button" className={cx(active === f.id && 'is-on')} aria-pressed={pinned === f.id}
                  onMouseEnter={() => setHover(f.id)} onFocus={() => setHover(f.id)} onBlur={() => setHover(null)}
                  onClick={() => setPinned((v) => (v === f.id ? null : f.id))}>{f.label}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="ed-mk-sr" aria-live="polite">{activeLabel ? `${activeLabel}: ${lit.map((p) => p.name).join(', ')}` : ''}</p>
    </div>
  );
}
