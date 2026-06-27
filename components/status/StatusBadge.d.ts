import React from 'react';

export type VerificationStatus = 'Verified' | 'Mischaracterised' | 'Fabricated';

export interface StatusBadgeProps {
  /** The verification verdict. @default "Verified" */
  status?: VerificationStatus;
  /** Fill the verdict hue instead of a tinted background. */
  solid?: boolean;
  style?: React.CSSProperties;
}

/**
 * Verification verdict badge — the product's core signal.
 * @startingPoint section="Status" subtitle="Verified · Mischaracterised · Fabricated" viewport="700x150"
 */
export function StatusBadge(props: StatusBadgeProps): JSX.Element;
