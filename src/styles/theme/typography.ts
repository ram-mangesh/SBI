// Typography Tokens — Phase 2 Design System
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §11 (Theme Architecture)

export const fontFamily = {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  // AI accent font — distinct voice for AI Copilot / explanation panels
  ai: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
} as const;

export const fontSize = {
  xs: 12, // 0.75rem
  sm: 14, // 0.875rem
  base: 16, // 1rem
  lg: 18, // 1.125rem
  xl: 20, // 1.25rem
  '2xl': 24, // 1.5rem
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const letterSpacing = {
  tight: '-0.015em',
  normal: '0',
  wide: '0.025em',
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
};

export default typography;
