import React from 'react';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface RiskBadgeProps {
  /** @default "Low" */
  level?: RiskLevel;
  /** `pill` tinted badge or `bar` 4-segment meter. @default "pill" */
  variant?: 'pill' | 'bar';
  style?: React.CSSProperties;
}

/** Graded risk indicator — Low · Medium · High · Critical. */
export function RiskBadge(props: RiskBadgeProps): JSX.Element;
