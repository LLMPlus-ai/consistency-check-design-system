import React from 'react';

export interface IconButtonProps {
  /** @default "outline" */
  variant?: 'outline' | 'bare' | 'dark';
  /** Pixel diameter. @default 36 */
  size?: number;
  /** Accessible label — required, icon-only control. */
  ariaLabel?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Circular icon-only control (copy, menu, close, carousel arrows). */
export function IconButton(props: IconButtonProps): JSX.Element;
