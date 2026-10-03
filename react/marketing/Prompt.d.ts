import * as React from 'react';

export interface PromptSubmission { text: string; url: string; files: File[] }

/** The requirement composer: a large text field, a website-URL field, attach and voice buttons, one submit. Client component. */
export declare function Prompt(props: React.HTMLAttributes<HTMLDivElement> & {
  placeholder?: string;
  urlPlaceholder?: string;
  submitLabel?: React.ReactNode;
  /** Small line under the field, e.g. 'Enter to send'. Off by default. */
  hint?: React.ReactNode;
  /** Chips below the box; clicking one fills the field. */
  suggestions?: string[];
  /** The file picker's accept list. */
  accept?: string;
  attach?: boolean; mic?: boolean; url?: boolean;
  /** false hides the send button; Enter still submits. */
  submit?: boolean;
  defaultText?: string; defaultUrl?: string;
  /** Rendered behind the box only, full viewport width — e.g. <WaveMesh />. */
  backdrop?: React.ReactNode;
  onSubmit?: (s: PromptSubmission) => void;
}): JSX.Element;
