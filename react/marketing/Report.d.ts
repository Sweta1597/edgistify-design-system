import * as React from 'react';

/** A white report in a dialog: header (title; tag, edit, close), ruled sections, a thin footer. Client component. */
export declare function ReportDialog(props: {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  /** a small pill right of the title, e.g. the search's scope */
  tag?: React.ReactNode;
  /** shows an edit button right of the tag */
  onEdit?: () => void;
  editLabel?: string;
  /** footer, left (older name: `helpful`) */
  footStart?: React.ReactNode;
  helpful?: React.ReactNode;
  /** a module the width of the window, from a small gap under its top to the bottom edge, rising from below; top corners rounded */
  sheet?: boolean;
  /** a strip under the header, e.g. "Trusted by" */
  strip?: React.ReactNode;
  /** with it, the body splits: this in the left quarter (questions, an ask at its foot), the report in the right three; each scrolls on its own */
  aside?: React.ReactNode;
  /** footer, right: e.g. Download and Share */
  actions?: React.ReactNode;
  /** a ref to what opened it: the dialog rises out of that place */
  origin?: React.RefObject<Element | null>;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element;

/** One ruled part of the report, under a small label. */
export declare function ReportSection(props: { label?: React.ReactNode; children?: React.ReactNode; className?: string }): JSX.Element;
