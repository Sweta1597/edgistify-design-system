import * as React from "react";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** Which artwork. Defaults to the E monogram. */
  variant?: "mark" | "square" | "wordmark";
  /**
   * Accessible name. Omit when the logo sits beside the word "Edgistify"
   * already — the component is then marked aria-hidden rather than
   * announced twice.
   */
  title?: string;
}

export declare function Logo(props: LogoProps): React.ReactElement;
export default Logo;
