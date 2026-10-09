'use client';
import { useEffect, useRef } from 'react';

const cx = (...a) => a.filter(Boolean).join(' ');
const clamp = (v) => Math.max(0, Math.min(1, v));
const ease = (t) => 1 - (1 - t) ** 3;
const LEAD = 0.35;   // the last step finishes before the section lets go

/* A screen in a step: a title bar — three dots, a path, and a status that
   reads status[0] until the screen is nearly done, then status[1] — over a
   body. Inside it, any element with data-at=".4" gets .is-go once its step
   is that far along; data-to (with data-from, -dec, -pre, -suf) counts up;
   a path with pathLength="1" and data-draw draws itself. */
export function StepScreen({ title, status = [], children }) {
  return (
    <div className="ed-mk-scr" aria-hidden="true">
      <div className="ed-mk-scr__bar">
        <i /><i /><i /><b>{title}</b>
        {status.length > 0 && <span className="ed-mk-scr__live" data-at=".85" data-a={status[0]} data-b={status[1] ?? status[0]} />}
      </div>
      <div className="ed-mk-scr__body">{children}</div>
    </div>
  );
}

/**
 * Steps in one row, joined by a line of light. On a wide screen tall enough
 * for the row, the section holds still while the page scrolls (on a shorter
 * one it plays as the row scrolls through): the line runs left to right
 * from step to step, and each step comes live as the line reaches it — its screen's
 * numbers count up, its bars fill, its checks tick. On a narrow screen the
 * steps stack and each comes live as it scrolls into view. Under reduced
 * motion everything is simply there.
 *
 *   steps  [{ num, title, body, figure }]   figure: usually a StepScreen
 *   head   the section's heading;  note  a line under the row
 */
export function StepFlow({ head, steps = [], note, className, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const stage = root.querySelector('.ed-mk-stepflow__stage');
    const flow = root.querySelector('.ed-mk-stepflow__flow');
    const fill = root.querySelector('.ed-mk-stepflow__fill');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pin = window.matchMedia('(min-width: 961px) and (min-height: 760px)');
    const row = window.matchMedia('(min-width: 961px)');
    const parts = [...root.querySelectorAll('.ed-mk-flowstep')].map((el) => ({
      el,
      node: el.querySelector('.ed-mk-flowstep__node'),
      fig: el.querySelector('.ed-mk-flowstep__fig'),
      at: [...el.querySelectorAll('[data-at]')],
      count: [...el.querySelectorAll('[data-to]')],
      last: -1,
    }));
    const N = parts.length;
    let raf = 0;

    const paint = (s, p) => {
      if (Math.abs(p - s.last) < 0.0005) return;
      s.last = p;
      s.el.style.setProperty('--p', p.toFixed(3));
      s.el.classList.toggle('is-on', p > 0);
      s.at.forEach((e) => e.classList.toggle('is-go', p >= +e.dataset.at));
      const k = ease(Math.min(1, p / 0.6));
      s.count.forEach((e) => {
        const from = +(e.dataset.from || 0), to = +e.dataset.to, dec = +(e.dataset.dec || 0);
        const v = from + (to - from) * k;
        e.textContent = (e.dataset.pre || '') + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + (e.dataset.suf || '');
      });
    };

    /* The line: node to node as t (0..N) runs, then on to the row's end. */
    const rail = (t) => {
      if (!flow || !fill) return;
      const base = flow.getBoundingClientRect().left;
      const xs = parts.map((s) => (s.node ? s.node.getBoundingClientRect().left + s.node.offsetWidth / 2 - base : 0));
      const end = flow.offsetWidth;
      const i = Math.min(N - 1, Math.floor(t)), f = t - i;
      const x = i < N - 1 ? xs[i] + (xs[i + 1] - xs[i]) * f : xs[N - 1] + (end - xs[N - 1]) * clamp(f);
      fill.style.setProperty('--x0', `${xs[0]}px`);
      fill.style.setProperty('--x', `${Math.max(xs[0], x)}px`);
    };

    const update = () => {
      raf = 0;
      if (calm) { parts.forEach((s) => paint(s, 1)); rail(N); return; }
      if (pin.matches) {
        const header = document.querySelector('.ed-mk-header');
        const top = header ? header.getBoundingClientRect().height : 0;
        root.style.setProperty('--ed-mk-stepflow-top', `${top}px`);
        const r = root.getBoundingClientRect(), span = r.height - stage.offsetHeight;
        const t = (span > 0 ? clamp((top - r.top) / span) : 1) * (N + LEAD);
        parts.forEach((s, i) => paint(s, clamp(t - i)));
        rail(Math.min(N, t));
        return;
      }
      if (row.matches) {   // too short to hold: the line runs as the row scrolls through
        const y = flow.getBoundingClientRect().top;
        const t = clamp((window.innerHeight * 0.85 - y) / (window.innerHeight * 0.6)) * (N + LEAD);
        parts.forEach((s, i) => paint(s, clamp(t - i)));
        rail(Math.min(N, t));
        return;
      }
      parts.forEach((s) => {
        const y = (s.fig || s.el).getBoundingClientRect().top;
        paint(s, clamp((window.innerHeight * 0.92 - y) / (window.innerHeight * 0.45)));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    pin.addEventListener('change', onScroll);
    row.addEventListener('change', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      pin.removeEventListener('change', onScroll);
      row.removeEventListener('change', onScroll);
    };
  }, [steps.length]);

  return (
    <section ref={ref} className={cx('ed-mk-stepflow', className)} style={{ '--n': steps.length }} {...rest}>
      <div className="ed-mk-stepflow__stage">
        {head && <div className="ed-mk-stepflow__head">{head}</div>}
        <div className="ed-mk-stepflow__flow">
          <div className="ed-mk-stepflow__rail" aria-hidden="true"><span className="ed-mk-stepflow__fill" /></div>
          <ol className="ed-mk-stepflow__row">
            {steps.map((s, i) => (
              <li key={i} className="ed-mk-flowstep">
                <div className="ed-mk-flowstep__txt">
                  <span className="ed-mk-flowstep__node" aria-hidden="true" />
                  <span className="ed-mk-flowstep__num">{s.num ?? String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ed-mk-flowstep__title">{s.title}</h3>
                  {s.body && <p className="ed-mk-flowstep__body">{s.body}</p>}
                </div>
                {s.figure && <div className="ed-mk-flowstep__fig">{s.figure}</div>}
              </li>
            ))}
          </ol>
        </div>
        {note && <p className="ed-mk-stepflow__note">{note}</p>}
      </div>
    </section>
  );
}
