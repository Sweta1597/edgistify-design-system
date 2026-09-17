'use client';

import { useEffect, useState } from 'react';

/* The same two attributes the products set, on the same element.
   Light is the default here exactly as it is in the apps — nothing reads
   prefers-color-scheme, because a design system that flips with the OS is
   not the one the product ships. */
export function ModeToggle() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('desk');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (mode === 'warehouse') root.setAttribute('data-mode', 'warehouse');
    else root.removeAttribute('data-mode');
  }, [theme, mode]);

  return (
    <>
      <div className="seg" role="group" aria-label="Density">
        {['desk', 'warehouse'].map((m) => (
          <button key={m} type="button" className="seg__btn"
            aria-pressed={mode === m} onClick={() => setMode(m)}>
            {m === 'desk' ? 'Desk' : 'Warehouse'}
          </button>
        ))}
      </div>
      <div className="seg" role="group" aria-label="Theme">
        {['light', 'dark'].map((t) => (
          <button key={t} type="button" className="seg__btn"
            aria-pressed={theme === t} onClick={() => setTheme(t)}>
            {t === 'light' ? 'Light' : 'Dark'}
          </button>
        ))}
      </div>
    </>
  );
}
