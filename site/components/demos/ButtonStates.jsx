'use client';

import { useState } from 'react';
import { Button } from '@edgistify/design-system/react/Button';
import { Icon } from '@/components/demos/ArtifactIcon';

/* The specimen's States row, live: clicking a loading button runs it for a
   beat so you can see the width hold steady and the pointer events stop. */
export function ButtonStates() {
  const [busy, setBusy] = useState(null);
  const run = (id) => { setBusy(id); setTimeout(() => setBusy(null), 1600); };

  return (
    <div className="ed-btn-group">
      <Button>Rest</Button>
      <Button id="focusme">Tab to me</Button>
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>Disabled</Button>
      <Button loading={busy === 'a'} onClick={() => run('a')}><Icon name="check" />Confirm pick</Button>
      <Button variant="secondary" loading={busy === 'b'} onClick={() => run('b')}>Save draft</Button>
    </div>
  );
}
