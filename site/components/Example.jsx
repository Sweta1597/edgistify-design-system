'use client';

import { useState } from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';

/* One string, two jobs: react-live renders it AND it is what you read and
   copy. There is no second copy of the markup to fall out of step.

   This is the fix for the failure that produced this site: the old Button
   page carried a hand-copied snapshot of button.css and went on documenting
   a ghost button that failed contrast at 4.24:1, months after the real one
   was fixed. Docs that import the component cannot drift; docs that
   describe it always eventually do. */
export function Example({ code, scope, noInline = false, caption }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — the code is on screen to select by hand */
    }
  };

  return (
    <figure className="example">
      <LiveProvider code={code.trim()} scope={scope} noInline={noInline}>
        <div className="example__preview"><LivePreview /></div>
        <LiveError className="example__error" />
        <div className="example__code">
          <pre><code>{code.trim()}</code></pre>
          <button type="button" className="example__copy" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </LiveProvider>
      {caption && <figcaption className="example__caption">{caption}</figcaption>}
    </figure>
  );
}
