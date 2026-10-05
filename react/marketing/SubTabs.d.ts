import * as React from 'react';

export interface SubTab { label: React.ReactNode; count?: number | null; content: React.ReactNode }
/** Tabs inside a panel; every panel stays in the page (hidden), so print sees them all. */
export declare function SubTabs(props: { tabs: SubTab[]; initial?: number; label?: string; className?: string }): JSX.Element;
