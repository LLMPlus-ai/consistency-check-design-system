import React from 'react';

export interface AvatarProps {
  /** Full name — initials are derived. */
  name?: string;
  /** Pixel diameter. @default 32 */
  size?: number;
  /** @default "bone" */
  tone?: 'bone' | 'dark' | 'primary';
  style?: React.CSSProperties;
}

/** Circular initials chip for reviewers (partner vs associate tone). */
export function Avatar(props: AvatarProps): JSX.Element;
