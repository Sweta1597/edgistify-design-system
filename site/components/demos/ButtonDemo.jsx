'use client';

import { Button, ButtonGroup } from '@edgistify/design-system/react/Button';
import { Example } from '@/components/Example';

/* A server-rendered MDX page cannot hand component functions to a client
   component, so each component page gets a thin client wrapper that imports
   the real thing and supplies it as the live scope. One per page keeps the
   bundle to what that page actually demonstrates. */
export function ButtonDemo(props) {
  return <Example {...props} scope={{ Button, ButtonGroup }} />;
}
