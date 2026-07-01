// ============================================================================
// Dynamic Theme Config — Customer-Type Accent Themes
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.12 (Theme Integration)
//
// Maps each customer type to a primary/accent palette applied at runtime by
// overriding the --color-primary-* CSS variables on :root. Section 3.12:
//   Student → green · Salaried → blue (default) · Business/Self-employed → purple
//   Senior → gold/amber · NRI → teal
//
// Light + dark ramps are provided so the accent survives dark mode.
// ============================================================================

import { CustomerType } from '@/core/constants/customer-types.constants';

export interface AccentRamp {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface AccentTheme {
  /** Tailwind color key (matches BadgeColor). */
  key: string;
  light: AccentRamp;
  dark: AccentRamp;
}

export const ACCENT_THEMES: Record<CustomerType, AccentTheme> = {
  // SALARIED → blue (also the default brand primary)
  [CustomerType.SALARIED]: {
    key: 'blue',
    light: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
    },
    dark: {
      50: '#172554', 100: '#1e3a8a', 200: '#1e40af', 300: '#1d4ed8', 400: '#2563eb',
      500: '#3b82f6', 600: '#60a5fa', 700: '#93c5fd', 800: '#bfdbfe', 900: '#dbeafe',
    },
  },
  // SELF_EMPLOYED → purple (ai-accent family)
  [CustomerType.SELF_EMPLOYED]: {
    key: 'purple',
    light: {
      50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
      500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95',
    },
    dark: {
      50: '#2e1065', 100: '#4c1d95', 200: '#5b21b6', 300: '#6d28d9', 400: '#7c3aed',
      500: '#8b5cf6', 600: '#a78bfa', 700: '#c4b5fd', 800: '#ddd6fe', 900: '#ede9fe',
    },
  },
  // STUDENT → green (success family)
  [CustomerType.STUDENT]: {
    key: 'green',
    light: {
      50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
      500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b',
    },
    dark: {
      50: '#052e2b', 100: '#064e3b', 200: '#065f46', 300: '#047857', 400: '#059669',
      500: '#10b981', 600: '#34d399', 700: '#6ee7b7', 800: '#a7f3d0', 900: '#d1fae5',
    },
  },
  // SENIOR → gold/amber
  [CustomerType.SENIOR]: {
    key: 'amber',
    light: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f',
    },
    dark: {
      50: '#451a03', 100: '#78350f', 200: '#92400e', 300: '#b45309', 400: '#d97706',
      500: '#f59e0b', 600: '#fbbf24', 700: '#fcd34d', 800: '#fde68a', 900: '#fef3c7',
    },
  },
  // NRI → teal
  [CustomerType.NRI]: {
    key: 'teal',
    light: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
      500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a',
    },
    dark: {
      50: '#042f2e', 100: '#134e4a', 200: '#115e59', 300: '#0f766e', 400: '#0d9488',
      500: '#14b8a6', 600: '#2dd4bf', 700: '#5eead4', 800: '#99f6e4', 900: '#ccfbf1',
    },
  },
};

export default { ACCENT_THEMES };
