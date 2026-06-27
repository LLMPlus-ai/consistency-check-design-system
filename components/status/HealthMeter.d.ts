import React from 'react';

export interface HealthMeterProps {
  /** Score value. @default 58 */
  score?: number;
  /** @default 100 */
  max?: number;
  /** Pixel diameter. @default 132 */
  size?: number;
  /** Caption under the dial. */
  label?: string;
  /** Centre value colour — set to a light token on dark surfaces. @default "var(--ink)" */
  valueColor?: string;
  /** "/ max" sub-readout colour. @default "var(--ash)" */
  subColor?: string;
  /** Caption colour. @default "var(--charcoal)" */
  labelColor?: string;
  /** Unfilled track colour. @default "var(--hairline)" */
  trackColor?: string;
  style?: React.CSSProperties;
}

/**
 * Radial citation-health dial; arc colour grades red→ochre→green.
 * @startingPoint section="Status" subtitle="Radial 0–100 health score" viewport="700x200"
 */
export function HealthMeter(props: HealthMeterProps): JSX.Element;
