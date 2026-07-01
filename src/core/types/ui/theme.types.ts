// ============================================================================
// UI Theme Types
// Source of Truth: BankMate AI Frontend Blueprint · Phase 2 (Design System)
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export type BadgeColor =
  | 'blue'
  | 'orange'
  | 'green'
  | 'purple'
  | 'teal'
  | 'red'
  | 'gray';

export type StatusColor = 'success' | 'warning' | 'error' | 'muted';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

export default {};
