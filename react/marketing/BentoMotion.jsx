'use client';
import { useEffect, useRef } from 'react';

/* Drives a Bento's open block. Every `interval` ms the next block opens
   (top → hub → bottom → top …). A block under the mouse stays open while
   the pointer is on it; the loop picks up from there when it leaves. The
   loop runs only while the bento is on screen and the tab is visible, and
   not at all under reduced motion (hover still opens a block). */
export function BentoMotion({ interval = 2000 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current && ref.current.closest('.ed-mk-bento');
    if (!el) return undefined;
    const tiles = Array.from(el.querySelectorAll('.ed-mk-bento__tile'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let open = Number(el.dataset.open) || 2;
    let held = false;
    let onScreen = true;
    let timer = null;

    const set = (n) => { open = n; el.dataset.open = String(n); };
    const tick = () => { if (!held && onScreen && !document.hidden) set((open % tiles.length) + 1); };
    const start = () => { if (reduce) return; clearInterval(timer); timer = setInterval(tick, interval); };

    const enters = tiles.map((tile, i) => {
      const fn = (e) => { if (e.pointerType && e.pointerType !== 'mouse') return; held = true; clearInterval(timer); set(i + 1); };
      tile.addEventListener('pointerenter', fn);
      return fn;
    });
    const leave = (e) => { if (e.pointerType && e.pointerType !== 'mouse') return; held = false; start(); };
    el.addEventListener('pointerleave', leave);

    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; });
    io.observe(el);

    set(open);
    start();

    return () => {
      clearInterval(timer);
      io.disconnect();
      el.removeEventListener('pointerleave', leave);
      tiles.forEach((tile, i) => tile.removeEventListener('pointerenter', enters[i]));
    };
  }, [interval]);

  return <span ref={ref} hidden />;
}
