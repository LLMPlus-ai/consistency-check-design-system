import React from 'react';

export interface StatCardProps {
  /** The headline metric (string or number). */
  value: React.ReactNode;
  /** Overline label above the value. */
  label: string;
  /** Supporting caption beneath. */
  caption?: React.ReactNode;
  /** Accent colour for the value + left rule (a status hue). */
  accent?: string | null;
  style?: React.CSSProperties;
}

/**
 * Dashboard metric card — big display value, overline label, caption.
 * @startingPoint section="Surfaces" subtitle="Headline metric cards" viewport="700x180"
 */
export function StatCard(props: StatCardProps): JSX.Element;
