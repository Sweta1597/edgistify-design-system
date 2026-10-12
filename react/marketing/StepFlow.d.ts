import * as React from 'react';

export interface Step {
  /** defaults to 01, 02 … */
  num?: React.ReactNode;
  /** leave out when the figure is a StepCard, which carries its own */
  title?: React.ReactNode;
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
export declare function StepScreen(props: { /** with no title or status, the bar is left out */ title?: React.ReactNode; /** in place of the window dots */ icon?: React.ReactNode; status?: [string, string?] | string[]; className?: string; children?: React.ReactNode }): JSX.Element;

/** A step as a tall dark card: title and line at the top, and its panel (children, usually a StepScreen with an icon) filling the rest over a teal glow. The glow swells and the panel rises as the step plays; the edge turns teal at `at` (default .9). Use in a StepFlow with className "ed-mk-stepflow--cards", leaving the step's own title out. Panel content classes: .ed-mk-scr__cost, __rows, __floor, __ntitle, __tasks, __sales, __graph (the floor plan and graph grow to fill), and .ed-mk-swap (two children; the second replaces the first at its data-at). */
export declare function StepCard(props: { title: React.ReactNode; body?: React.ReactNode; at?: string; children?: React.ReactNode }): JSX.Element;
