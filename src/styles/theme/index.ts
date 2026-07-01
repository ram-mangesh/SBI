// Theme Barrel — Phase 2 Design System
// Single export point for all design tokens.
// `tailwind.config.ts` imports { Config } from here.
//
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §11

import colors from './colors';
import typography, { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
import spacing, { containerWidths } from './spacing';
import { breakpoints, screens } from './breakpoints';
import shadows, { boxShadow } from './shadows';
import animations, { keyframes, animation, transitionTiming } from './animations';

export { colors, typography, spacing, breakpoints, shadows, animations };

// ── borderRadius scale ───────────────────────────────────────────────────
// sm: 4px · md: 8px · lg: 12px · xl: 16px · 2xl: 24px (Phase 1 §11)
export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
} as const;

// ── z-index scale (UI layering) ──────────────────────────────────────────
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  toast: 1400,
  tooltip: 1500,
} as const;

/**
 * Config — consumed by tailwind.config.ts.
 * Maps design tokens to the Tailwind theme.extend shape.
 */
export const Config = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacing,
  containerWidths,
  borderRadius,
  boxShadow,
  animation,
  keyframes,
  screens,
  zIndex,
} as const;

const theme = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacing,
  containerWidths,
  breakpoints,
  screens,
  borderRadius,
  shadows,
  boxShadow,
  animations,
  animation,
  keyframes,
  transitionTiming,
  zIndex,
  Config,
};

export default theme;
