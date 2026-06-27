import React from 'react';

export interface CardProps {
  /** Surface tone. @default "card" */
  tone?: 'card' | 'bone' | 'dark';
  /** Inner padding (px). @default 20 */
  pad?: number;
  /** Corner radius CSS value. @default "var(--radius-md)" */
  radius?: string;
  /** Lift on hover. */
  interactive?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** The content container — white / bone / dark-inversion surfaces. */
export function Card(props: CardProps): JSX.Element;
