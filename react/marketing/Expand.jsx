'use client';
import { useEffect, useRef } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');

/* A panel that opens out as it scrolls into view (Freshworks' "expand on
   scroll"). While its top travels from the bottom of the window to near the
   top, the clip on its sides closes from `inset` to nothing — the panel
   widens to the full width — and its content rises into place. Progress is
   one number, --p (0 → 1), written on the element; the CSS does the rest.
   Under reduced motion it is simply open. */
export function ExpandOnScroll({ tone = 'light', inset, radius, as: Tag = 'section', className, style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', '1'); return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const start = h;            // panel top at the bottom edge: closed
      const end = h * 0.15;       // panel top near the top edge: open
      const p = Math.min(1, Math.max(0, (start - top) / (start - end)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cx('ed-mk-expand', tone === 'light' ? 'ed-mk-expand--light' : 'ed-mk-expand--dark', className)}
      style={{ ...(inset ? { '--ed-mk-expand-inset': inset } : null), ...(radius ? { '--ed-mk-expand-radius': radius } : null), ...style }}
      {...rest}
    >
      <div className="ed-mk-expand__panel">
        <div className="ed-mk-expand__content">{children}</div>
      </div>
    </Tag>
  );
}
