import React from 'react';

export interface InputProps {
  /** @default "md" (44px) — `sm` is 36px */
  size?: 'md' | 'sm';
  /** Leading icon node (search glyph etc.). */
  iconLeft?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Style for the inner <input>. */
  style?: React.CSSProperties;
  /** Style for the pill wrapper. */
  wrapStyle?: React.CSSProperties;
}

/** Pill text field — white on cream, orange focus ring. */
export function Input(props: InputProps): JSX.Element;
