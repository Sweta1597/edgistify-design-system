import * as React from 'react';

export interface Step {
  /** defaults to 01, 02 … */
  num?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** under the text; usually a StepScreen */
  figure?: React.ReactNode;
}

/** Steps in one row joined by a line of light. On a wide screen the section holds still while the page scrolls: the line runs left to right and each step comes live as it is reached (its screen's numbers count up, bars fill, checks tick). Stacked on a narrow screen, each coming live as it scrolls in. Client component. */
export declare function StepFlow(props: Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
  head?: React.ReactNode;
  steps: Step[];
  /** a small line under the row */
  note?: React.ReactNode;
}): JSX.Element;

/** A small EdgeOS window for a step: dots, a path, and a status that reads status[0] until the step is nearly done, then status[1]. Inside: data-at=".4" adds .is-go when the step is that far along; data-to (data-from, -dec, -pre, -suf) counts up; a path with pathLength="1" and data-draw draws itself. Classes: .ed-mk-scr__kpis, __mix, __chip(--warn), __plan, __foot, __checks, __spark, __ok, __trend. */
export declare function StepScreen(props: { title: React.ReactNode; status?: [string, string?] | string[]; children?: React.ReactNode }): JSX.Element;
