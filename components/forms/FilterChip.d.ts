import React from 'react';

export interface FilterChipProps {
  active?: boolean;
  /** Trailing count, mono-set. */
  count?: number | null;
  /** Leading status-dot colour (a CSS value / var). */
  dotColor?: string | null;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Pill filter toggle with optional status dot + count. */
export function FilterChip(props: FilterChipProps): JSX.Element;
