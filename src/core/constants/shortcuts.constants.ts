// ============================================================================
// Keyboard Shortcut Registry
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.13 (Accessibility)
// Static catalog of global shortcuts — rendered in the shortcuts help dialog.
// ============================================================================

export interface ShortcutDef {
  /** Display keys, platform-agnostic. Use ⌘ on macOS, Ctrl elsewhere. */
  keys: string;
  /** Human description. */
  description: string;
  /** Group label for visual grouping. */
  group: 'Navigation' | 'View' | 'Search' | 'Help';
}

const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
const MOD = isMac ? '⌘' : 'Ctrl';

export const GLOBAL_SHORTCUTS: ShortcutDef[] = [
  { keys: `${MOD} + K`, description: 'Focus global search', group: 'Search' },
  { keys: `${MOD} + B`, description: 'Toggle sidebar', group: 'View' },
  { keys: `${MOD} + /`, description: 'Open keyboard shortcuts help', group: 'Help' },
  { keys: 'Esc', description: 'Close dialog / drawer / search', group: 'View' },
  { keys: 'Alt + H', description: 'Go to home / dashboard', group: 'Navigation' },
  { keys: 'Alt + N', description: 'Open notifications', group: 'Navigation' },
  { keys: 'Alt + C', description: 'Open AI chat', group: 'Navigation' },
];

export const SHORTCUT_GROUPS = ['Navigation', 'View', 'Search', 'Help'] as const;
export type ShortcutGroup = (typeof SHORTCUT_GROUPS)[number];

export default { GLOBAL_SHORTCUTS, SHORTCUT_GROUPS };
