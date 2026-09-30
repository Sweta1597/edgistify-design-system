import * as React from "react";

export type LogoVariant = "mark" | "square" | "wordmark";
export type LogoTone = "teal" | "black" | "white";

interface LogoCommon {
  /** Which artwork. Defaults to the E. monogram. */
  variant?: LogoVariant;
  /**
   * Only meaningful for `variant="wordmark"`, which is a raster and so
   * cannot follow `currentColor`. The mark ignores it — set `color`.
   */
  tone?: LogoTone;
  /**
   * Accessible name. Omit beside a visible "Edgistify" — the mark is then
   * aria-hidden and the wordmark gets alt="".
   */
  title?: string;
}

/**
 * The mark renders an <svg>, the wordmark an <img>, so the extra props
 * each accepts differ. Typed as the union rather than
 * SVGProps<SVGSVGElement> alone, which would have let `srcSet` through on
 * a mark and rejected `loading` on a wordmark.
 */
export type LogoProps =
  | (LogoCommon & { variant?: "mark" | "square" } & React.SVGProps<SVGSVGElement>)
  | (LogoCommon & { variant: "wordmark" } & React.ImgHTMLAttributes<HTMLImageElement>);

export declare function Logo(props: LogoProps): React.ReactElement;

/** Where the wordmark PNGs are served from. Default "/brand/wordmark". */
export declare let wordmarkBase: string;
/** Set it once at the app edge, not per call site. */
export declare function setWordmarkBase(path: string): void;

export default Logo;
