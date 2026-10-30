import * as React from 'react';

/** The highlight mark: a chunky five-point star with depth, for the one feature in a section that matters most, in place of that feature's icon. Saffron, outlined in ink (paper-light on the dark band). Set --ed-mk-hl-line to change the outline. */
export declare function HighlightMark(props: React.SVGAttributes<SVGSVGElement> & {
  /** Width and height in px. Default 32. */
  size?: number;
  /** What a screen reader hears. Default "Highlighted"; null when the text beside it already says so. */
  label?: string | null;
}): JSX.Element;
export default HighlightMark;
