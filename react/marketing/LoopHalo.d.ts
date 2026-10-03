import * as React from 'react';

/** A dark section with a heading over a page-wide half circle whose rim glows (Attio's halo); the rim meets both page edges where the section ends. As it scrolls in, the heading focuses and the glow sweeps along the rim from left to right until the halo is complete. Client component. */
export declare function LoopHalo(props: React.HTMLAttributes<HTMLElement> & {
  /** Small line above the title. */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** Labels placed on the rim over the crown, lit in turn as the glow sweeps past. */
  nodes?: React.ReactNode[];
  /** Content inside the dome, under the crown. */
  inner?: React.ReactNode;
  children?: React.ReactNode;
}): JSX.Element;
