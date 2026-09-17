/* Required by @next/mdx in the App Router. Every MDX page inherits these,
   so a page writes <ButtonDemo …/> without importing anything. */
import { Example } from '@/components/Example';
import { ButtonDemo } from '@/components/demos/ButtonDemo';

export function useMDXComponents(components) {
  return { Example, ButtonDemo, ...components };
}
