/* Required by @next/mdx in the App Router. Every MDX page inherits these, so
   a page writes <CardDemo …/> without importing anything.

   One wrapper per component rather than a single shared scope: each page then
   ships only the components it actually demonstrates. */
import { Example } from '@/components/Example';
import { ButtonDemo } from '@/components/demos/ButtonDemo';
import { CardDemo } from '@/components/demos/CardDemo';
import { TableDemo } from '@/components/demos/TableDemo';
import { InputDemo } from '@/components/demos/InputDemo';
import { ModalDemo } from '@/components/demos/ModalDemo';
import { MenuDemo } from '@/components/demos/MenuDemo';

/* A wide table scrolls inside its own container rather than widening the
   page — the grid column can shrink, so anything that cannot must say so. */
const table = (props) => (
  <div className="table-scroll"><table {...props} /></div>
);

export function useMDXComponents(components) {
  return { Example, ButtonDemo, CardDemo, TableDemo, InputDemo, ModalDemo, MenuDemo, table, ...components };
}
