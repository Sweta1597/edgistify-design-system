import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/* The published specimen's own markup, captured after its generators ran.

   These pages were written as standalone documents with their demos built
   by inline script. Rather than retype them — and risk the text drifting
   from what the team already reviewed — the markup is kept verbatim and the
   stylesheet is ported beside it. Colour comes from the package, so the
   specimens respond to the top bar's Desk/Warehouse and Light/Dark exactly
   as the products do.

   Live, editable code sits alongside each one, in <Example>. */
export function Specimen({ name }) {
  const html = readFileSync(join(process.cwd(), 'content', `${name}.html`), 'utf8');
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
