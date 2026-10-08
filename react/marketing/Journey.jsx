'use client';
import { useEffect, useRef } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* Depths along the route: the dock's facade, the warehouse's back wall, the network's centre. */
const Z1 = 30, Z2 = 90, NZ = 300;

/* The camera's route, in seconds: [time, distance along the route, eye height, downward tilt]. It eases
   between keys and holds where two keys share a place: up to the dock door (Diagnose), down the rack
   aisle (Design), out on the highway behind a truck (Transition), then up over the network running as
   one loop (Operate). Then it fades out and starts again from the yard. */
const ROUTE = [
  [0, -10, 1.8, 0], [4, 8, 1.8, 0], [6.5, 8, 1.8, 0],
  [11, 44, 1.8, 0], [13.5, 44, 1.8, 0],
  [18, 105, 1.8, 0], [20.5, 105, 1.8, 0],
  [26, 178, 82, 0.7], [30, 178, 82, 0.7],
];
const CYCLE = ROUTE[ROUTE.length - 1][0];
const FADE = 1.2;        // seconds of fade at each end of the loop
const STILL = 5;         // the moment drawn under reduced motion: at the dock door
const LEVELS = 6;        // brightness bins, one stroke each
const clamp = (v) => Math.max(0, Math.min(1, v));
const ease = (f) => (f < 0.5 ? 4 * f * f * f : 1 - (-2 * f + 2) ** 3 / 2);

function camAt(s) {
  let i = 0;
  while (i < ROUTE.length - 2 && s >= ROUTE[i + 1][0]) i++;
  const A = ROUTE[i], B = ROUTE[i + 1], e = ease(clamp((s - A[0]) / (B[0] - A[0])));
  return { z: A[1] + (B[1] - A[1]) * e, y: A[2] + (B[2] - A[2]) * e, p: A[3] + (B[3] - A[3]) * e };
}

/* The world, built once: segments [x1, y1, z1, x2, y2, z2, zone, tone]; zones 0 outside, 1 inside,
   2 highway, 3 network, 4 the network's ground grid; tone 0 grey, 1 teal. */
let WORLD = null;
function world() {
  if (WORLD) return WORLD;
  const W3 = [], HUBS = [], LOOP = [];
  const seg = (a, b, c, d, e, f, zone = 0, tone = 0) => { W3.push(a, b, c, d, e, f, zone, tone); };
  const rectZ = (x1, y1, x2, y2, z, zone) => { seg(x1, y1, z, x2, y1, z, zone); seg(x2, y1, z, x2, y2, z, zone); seg(x2, y2, z, x1, y2, z, zone); seg(x1, y2, z, x1, y1, z, zone); };
  const rectX = (x, y1, z1, y2, z2, zone) => { seg(x, y1, z1, x, y1, z2, zone); seg(x, y1, z2, x, y2, z2, zone); seg(x, y2, z2, x, y2, z1, zone); seg(x, y2, z1, x, y1, z1, zone); };
  const box = (x, z, w, h, d, zone, tone) => {
    const a = x - w / 2, b = x + w / 2, c = z - d / 2, e = z + d / 2;
    [[a, c, b, c], [b, c, b, e], [b, e, a, e], [a, e, a, c]].forEach((q) => { seg(q[0], 0, q[1], q[2], 0, q[3], zone, tone); seg(q[0], h, q[1], q[2], h, q[3], zone, tone); });
    [[a, c], [b, c], [b, e], [a, e]].forEach((q) => { seg(q[0], 0, q[1], q[0], h, q[1], zone, tone); });
  };
  let y, z, k;
  /* yard: truck bays in front of the doors, and the ground edge */
  [-11.5, -5.5, -3.5, 3.5, 5.5, 11.5].forEach((x) => seg(x, 0, 12, x, 0, Z1));
  seg(-14, 0, -10, -14, 0, Z1); seg(14, 0, -10, 14, 0, Z1);
  /* facade, parapet, canopy over the centre door, two closed side doors */
  seg(-14, 0, Z1, -3, 0, Z1); seg(3, 0, Z1, 14, 0, Z1); seg(14, 0, Z1, 14, 9.4, Z1); seg(14, 9.4, Z1, -14, 9.4, Z1); seg(-14, 9.4, Z1, -14, 0, Z1);
  seg(-14, 8.8, Z1, 14, 8.8, Z1);
  seg(-3, 0, Z1, -3, 5, Z1); seg(3, 0, Z1, 3, 5, Z1); seg(-3, 5, Z1, 3, 5, Z1);
  seg(-4, 5.7, Z1 - 1.6, 4, 5.7, Z1 - 1.6, 0, 1); seg(-4, 5.7, Z1 - 1.6, -4, 5.7, Z1); seg(4, 5.7, Z1 - 1.6, 4, 5.7, Z1);
  [-1, 1].forEach((s) => {
    rectZ(s * 6.5, 0, s * 11, 4.2, Z1);
    for (y = 0.5; y < 4.2; y += 0.5) seg(s * 6.5, y, Z1, s * 11, y, Z1);
  });
  /* the shell, seen once inside: side walls, roof edges, back wall with its open door */
  [-14, 14].forEach((x) => { seg(x, 0, Z1, x, 0, Z2, 1); seg(x, 9.4, Z1, x, 9.4, Z2, 1); });
  seg(-14, 0, Z2, -3, 0, Z2, 1); seg(3, 0, Z2, 14, 0, Z2, 1); seg(14, 0, Z2, 14, 9.4, Z2, 1); seg(14, 9.4, Z2, -14, 9.4, Z2, 1); seg(-14, 9.4, Z2, -14, 0, Z2, 1);
  seg(-3, 0, Z2, -3, 5, Z2, 1); seg(3, 0, Z2, 3, 5, Z2, 1); seg(-3, 5, Z2, 3, 5, Z2, 1);
  /* inside: roof trusses, a row of ceiling lights, teal floor guides down the aisle */
  for (z = Z1 + 8; z < Z2; z += 10) seg(-14, 9.4, z, 14, 9.4, z, 1);
  for (z = Z1 + 6; z < Z2 - 2; z += 6) seg(-0.6, 9, z, 0.6, 9, z, 1, 1);
  seg(-2.2, 0, Z1 + 4, -2.2, 0, Z2 - 4, 1, 1); seg(2.2, 0, Z1 + 4, 2.2, 0, Z2 - 4, 1, 1);
  /* racks either side of the aisle: uprights, beams, pallets on three levels */
  const LV = [0.15, 2.5, 5, 7.5], r0 = Z1 + 6, r1 = Z2 - 6;
  [-1, 1].forEach((s) => {
    [2.6, 3.8].forEach((d) => {
      for (z = r0; z <= r1 + 0.01; z += 3) seg(s * d, 0, z, s * d, 7.5, z, 1);
      LV.forEach((ly) => seg(s * d, ly, r0, s * d, ly, r1, 1));
    });
    for (z = r0; z < r1; z += 3) for (k = 0; k < 3; k++) {
      const h = (Math.sin(z * 12.9898 + k * 78.233 + s * 3.1) * 43758.5453) % 1;
      if (Math.abs(h) < 0.25) continue;
      rectX(s * 2.6, LV[k] + 0.15, z + 0.3, LV[k] + 1.55, z + 2.7, 1);
      seg(s * 2.6, LV[k] + 0.85, z + 0.3, s * 2.6, LV[k] + 0.85, z + 2.7, 1);
    }
  });
  /* the highway: road edges and street lights, running into the network */
  seg(-7, 0, Z2 + 2, -7, 0, NZ - 62, 2); seg(7, 0, Z2 + 2, 7, 0, NZ - 62, 2);
  seg(-3.5, 0, Z2 + 2, -3.5, 0, NZ - 62, 2); seg(3.5, 0, Z2 + 2, 3.5, 0, NZ - 62, 2);
  for (z = Z2 + 14; z < NZ - 62; z += 20) [-1, 1].forEach((s) => {
    seg(s * 8.5, 0, z, s * 8.5, 7, z, 2); seg(s * 8.5, 7, z, s * 6.3, 7.2, z, 2); seg(s * 6.3, 7.2, z, s * 5.7, 7.1, z, 2);
  });
  /* the network: a faint ground grid, six hubs on a loop around EdgeOS at the centre, spokes, and drop points */
  for (let gx = -140; gx <= 140; gx += 20) seg(gx, 0, NZ - 90, gx, 0, NZ + 110, 4);
  for (let gz = NZ - 90; gz <= NZ + 110; gz += 20) seg(-140, 0, gz, 140, 0, gz, 4);
  box(0, NZ, 16, 6, 16, 3, 1); box(0, NZ, 8, 10, 8, 3, 1);
  for (k = 0; k < 6; k++) {
    const an = -Math.PI / 2 + k * Math.PI / 3, hx = 62 * Math.cos(an), hz = NZ + 48 * Math.sin(an);
    HUBS.push([hx, hz]); box(hx, hz, 9, 4, 9, 3);
    seg(hx, 0, hz, 0, 0, NZ, 3);
    for (let q = 0; q < 4; q++) {
      const bn = an + (q - 1.5) * 0.45;
      seg(hx, 0, hz, hx + 22 * Math.cos(bn), 0, hz + 17 * Math.sin(bn), 3);
    }
  }
  for (k = 0; k <= 120; k++) { const t0 = -Math.PI / 2 + (k / 120) * 2 * Math.PI; LOOP.push(62 * Math.cos(t0), NZ + 48 * Math.sin(t0)); }
  for (k = 0; k < 120; k++) seg(LOOP[k * 2], 0.05, LOOP[k * 2 + 1], LOOP[k * 2 + 2], 0.05, LOOP[k * 2 + 3], 3, 1);
  WORLD = { W3: Float32Array.from(W3), count: W3.length / 8, HUBS, LOOP };
  return WORLD;
}

/* A colour token as "r, g, b", to compose with an alpha on the canvas. */
function rgb(el, name, fallback) {
  const m = /^#([0-9a-f]{6})$/i.exec(getComputedStyle(el).getPropertyValue(name).trim());
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return `${n >> 16}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * The getting-started journey as a background that plays on its own: one world drawn in hairlines —
 * structure in grey, light and movement in teal — seen through a camera that walks up to a dock door
 * as it rolls up, goes down a rack aisle, out onto the highway behind a truck, then rises over the
 * network running as one loop, fades, and starts again. Far lines fade into the dark. It draws only
 * while on screen; under reduced motion it is a still of the dock door.
 */
export function JourneyLoop({ className, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const c = cv && cv.getContext('2d');
    if (!c) return undefined;
    const { W3, count, HUBS, LOOP } = world();
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ink = {
      grey: rgb(cv, '--ed-neutral-300', '181, 187, 186'),
      teal: rgb(cv, '--ed-teal-200', '135, 228, 216'),
      glow: rgb(cv, '--ed-teal-300', '90, 209, 195'),
      spark: rgb(cv, '--ed-teal-50', '235, 245, 243'),
      lamp: rgb(cv, '--ed-neutral-100', '227, 230, 229'),
    };
    let W = 0, H = 0, dpr = 1, C = camAt(STILL), V, bins, dots;
    const zoneA = [1, 0, 0, 0, 0];

    /* camera space: across, up, and depth along the view; the camera tilts down by C.p */
    const view = (x, y, z) => {
      const rx = x - V.camX, ry = y - V.camY, rz = z - C.z, cp = Math.cos(C.p), sp = Math.sin(C.p);
      return [rx, ry * cp + rz * sp, -ry * sp + rz * cp];
    };
    /* projects a segment and files it in a tone and brightness bin; clips at the near plane; fades with distance */
    const line = (x1, y1, z1, x2, y2, z2, a, tone) => {
      let A = view(x1, y1, z1), B = view(x2, y2, z2);
      const n = 0.6;
      if (A[2] < n && B[2] < n) return;
      if (A[2] < n) { const k = (n - A[2]) / (B[2] - A[2]); A = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k, n]; }
      else if (B[2] < n) { const k = (n - B[2]) / (A[2] - B[2]); B = [B[0] + (A[0] - B[0]) * k, B[1] + (A[1] - B[1]) * k, n]; }
      const far = 115 + C.y * 4, fog = clamp((far - Math.min(A[2], B[2])) / 85) * clamp((Math.max(A[2], B[2]) - 0.8) / 2);
      const al = a * fog * (tone ? 1 : 0.62);
      if (al < 0.04) return;
      bins[tone ? 1 : 0][Math.min(LEVELS - 1, Math.floor(al * LEVELS))].push(
        V.ox + (A[0] * V.f) / A[2], V.oy - (A[1] * V.f) / A[2], V.ox + (B[0] * V.f) / B[2], V.oy - (B[1] * V.f) / B[2]);
    };
    const point = (x, y, z, a, r, warm) => {
      const P = view(x, y, z);
      if (P[2] < 0.8) return;
      const al = a * clamp((115 + C.y * 4 - P[2]) / 85);
      if (al < 0.04) return;
      dots.push(V.ox + (P[0] * V.f) / P[2], V.oy - (P[1] * V.f) / P[2], al, Math.max(1, Math.min(6, (r * V.f) / P[2] / 60)), warm ? 1 : 0);
    };

    function draw(t, fade) {
      const narrow = W < 860;
      V = {
        ox: W * (narrow ? 0.5 : 0.7) * dpr, oy: H * (narrow ? 0.3 : 0.32) * dpr,
        f: Math.min(H * 0.75, W * (narrow ? 1.25 : 0.62)) * dpr,
        camX: calm ? 0 : Math.sin(t * 0.3) * 0.12, camY: C.y + (calm ? 0 : Math.sin(t * 0.45) * 0.05),
      };
      bins = [[], []];
      for (let l = 0; l < LEVELS; l++) { bins[0].push([]); bins[1].push([]); }
      dots = [];
      zoneA[1] = clamp((C.z - 16) / 12); zoneA[2] = clamp((C.z - 62) / 22); zoneA[3] = clamp((C.z - 130) / 40); zoneA[4] = zoneA[3] * 0.45;
      for (let i = 0; i < count; i++) {
        const o = i * 8, za = zoneA[W3[o + 6]];
        if (za > 0) line(W3[o], W3[o + 1], W3[o + 2], W3[o + 3], W3[o + 4], W3[o + 5], za, W3[o + 7]);
      }
      /* the centre door rolls up as the camera comes near */
      const open = clamp((C.z - 2) / 18), oh = 5 * open;
      for (let y = oh; y < 4.99; y += 0.45) line(-3, y, Z1, 3, y, Z1, 1, 0);
      if (open > 0 && open < 1) line(-3, oh, Z1, 3, oh, Z1, 1, 1);
      if (zoneA[2] > 0) {
        /* teal lane dashes stream toward the camera, so the road keeps moving while it holds */
        const A = zoneA[2], off = calm ? 0 : (t * 9) % 6;
        for (let z = Z2 + 4 - off; z < NZ - 62; z += 6) line(0, 0, z, 0, 0, z + 2.6, A, 1);
        /* the truck ahead: rear doors, side edges, wheels, tail lights */
        const tz = Math.min(NZ - 72, Math.max(Z2 + 26, C.z + 24));
        line(-1.3, 0.9, tz, 1.3, 0.9, tz, A); line(1.3, 0.9, tz, 1.3, 4.1, tz, A); line(1.3, 4.1, tz, -1.3, 4.1, tz, A); line(-1.3, 4.1, tz, -1.3, 0.9, tz, A);
        line(0, 0.9, tz, 0, 4.1, tz, A); line(-1.3, 0.9, tz, -1.3, 0.9, tz + 10, A); line(1.3, 0.9, tz, 1.3, 0.9, tz + 10, A); line(-1.3, 4.1, tz, -1.3, 4.1, tz + 10, A); line(1.3, 4.1, tz, 1.3, 4.1, tz + 10, A);
        [-1, 1].forEach((s) => { line(s * 1.15, 0, tz + 1.2, s * 1.15, 0.9, tz + 1.2, A); line(s * 1.15, 0, tz + 2.6, s * 1.15, 0.9, tz + 2.6, A); point(s * 1.05, 1.25, tz, A, 9); });
        for (let lz = Z2 + 14; lz < NZ - 62; lz += 20) { point(-5.9, 7.05, lz, A * 0.7, 10, true); point(5.9, 7.05, lz, A * 0.7, 10, true); }
      }
      if (zoneA[3] > 0) {
        /* the network at work: lights run round the loop, and outcomes flow from every hub back to the centre */
        const B = zoneA[3], sp = calm ? 0 : t;
        for (let m = 0; m < 6; m++) {
          const u = ((sp * 0.035 + m / 6) % 1) * 120, i0 = Math.floor(u), fr = u - i0;
          point(LOOP[i0 * 2] + (LOOP[i0 * 2 + 2] - LOOP[i0 * 2]) * fr, 0.3, LOOP[i0 * 2 + 1] + (LOOP[i0 * 2 + 3] - LOOP[i0 * 2 + 1]) * fr, B, 70);
          const h = HUBS[m], g = (sp * 0.18 + m * 0.37) % 1;
          point(h[0] * (1 - g), 0.3, h[1] + (NZ - h[1]) * g, B * 0.8, 45);
          point(h[0], 4.4, h[1], B * (0.35 + 0.25 * Math.sin(sp * 1.4 + m)), 40, true);
        }
        point(0, 10.6, NZ, B * (0.7 + 0.3 * Math.sin(sp * 1.1)), 90);
      }
      /* paint: grey structure first, then teal, each a soft glow under a fine bright core */
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, cv.width, cv.height);
      c.globalAlpha = fade;
      c.globalCompositeOperation = 'lighter';
      c.lineCap = 'round';
      const dd = Z1 - C.z;
      if (open > 0 && dd > 3) {   /* the light inside the half-open door */
        const px = (x) => V.ox + ((x - V.camX) * V.f) / dd, py = (y) => V.oy - ((y - V.camY) * V.f) / dd;
        const lg = c.createLinearGradient(0, py(0), 0, py(oh + 0.01));
        lg.addColorStop(0, `rgba(${ink.glow}, ${0.3 * (1 - open * 0.6) * clamp((dd - 3) / 8)})`);
        lg.addColorStop(1, `rgba(${ink.glow}, 0.02)`);
        c.fillStyle = lg; c.fillRect(px(-3), py(oh), px(3) - px(-3), py(0) - py(oh));
      }
      const TONES = [[ink.grey, ink.grey, 0.05], [ink.teal, ink.glow, 0.16]];
      for (let tn = 0; tn < 2; tn++) for (let pass = 0; pass < 2; pass++) {
        c.lineWidth = (pass ? (tn ? 1.3 : 1.05) : 5) * dpr;
        for (let l = 0; l < LEVELS; l++) {
          const b = bins[tn][l];
          if (!b.length) continue;
          const a = (l + 0.5) / LEVELS;
          c.strokeStyle = pass ? `rgba(${TONES[tn][0]}, ${a.toFixed(2)})` : `rgba(${TONES[tn][1]}, ${(a * TONES[tn][2]).toFixed(3)})`;
          c.beginPath();
          for (let j = 0; j < b.length; j += 4) { c.moveTo(b[j], b[j + 1]); c.lineTo(b[j + 2], b[j + 3]); }
          c.stroke();
        }
      }
      for (let p = 0; p < dots.length; p += 5) {
        const x = dots[p], y = dots[p + 1], al = dots[p + 2], r = dots[p + 3] * dpr, warm = dots[p + 4];
        const g = c.createRadialGradient(x, y, 0, x, y, r * 3);
        g.addColorStop(0, `rgba(${warm ? ink.lamp : ink.spark}, ${al})`);
        g.addColorStop(0.3, warm ? `rgba(${ink.grey}, ${al * 0.35})` : `rgba(${ink.glow}, ${al * 0.5})`);
        g.addColorStop(1, `rgba(${ink.glow}, 0)`);
        c.fillStyle = g; c.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
      }
    }

    /* a clock that only runs while the loop is drawn, so it resumes where it left off */
    let clock = 0, last = 0, raf = 0, seen = false;
    const still = () => { C = camAt(STILL); draw(0, 1); };
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      clock += last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      const s = clock % CYCLE;
      C = camAt(s);
      draw(clock, clamp(s / FADE) * clamp((CYCLE - s) / FADE));
    };
    const run = () => { if (!raf && seen && !calm) { last = 0; raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      if (calm) still();
    };
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen) run(); else stop(); }, { rootMargin: '100px' });
    io.observe(cv);
    size();
    return () => { stop(); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className={cx('ed-mk-journey', className)} aria-hidden="true" {...rest}>
      <canvas ref={ref} />
    </div>
  );
}
