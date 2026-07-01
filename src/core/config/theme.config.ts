// ============================================================================
// Theme Configuration
// Source of Truth: BankMate AI Frontend Blueprint · Phase 2 (Design System)
// Wires design tokens to runtime theme provider defaults.
// ============================================================================

export const THEME_CONFIG = {
  defaultTheme: 'system' as 'light' | 'dark' | 'system',
  storageKey: 'bankmate.theme',
  // Feature surfaces mapped to channel tokens (Section 10)
  aiAccent: '#7C3AED',
  aiBubble: '#EFF6FF',
} as const;

export type ThemeConfig = typeof THEME_CONFIG;

export default THEME_CONFIG;
