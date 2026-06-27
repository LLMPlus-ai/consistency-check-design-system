import React from 'react';

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'sm';

export interface ButtonProps {
  /** Visual weight. `primary` is the scarce orange stamp. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" (44px) — `sm` is 36px */
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  /** Icon node rendered before the label (e.g. a Lucide <svg>). */
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * The primary action primitive — fully-rounded, three weights.
 * @startingPoint section="Forms" subtitle="Pill buttons in every weight" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
