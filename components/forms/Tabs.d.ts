import React from 'react';

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface TabsProps {
  /** Array of `{value,label}` or plain strings. */
  tabs: (TabItem | string)[];
  /** Active tab value. */
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/** Underline tab strip; active tab carries the orange 2px underline. */
export function Tabs(props: TabsProps): JSX.Element;
