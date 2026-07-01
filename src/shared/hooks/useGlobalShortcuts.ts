// ============================================================================
// useGlobalShortcuts — Global Keyboard Shortcuts Hook
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.13 (Accessibility)
//   + Section 3.4.4 (Ctrl/Cmd+B sidebar) · 3.3.1 (Ctrl/Cmd+K search)
//
// Registers app-wide keyboard shortcuts. Each handler fires only when the
// appropriate modifier keys match and the user is not typing in an input,
// unless the shortcut explicitly opts in (e.g. Esc to clear search).
//
// Shortcuts (Section 3.13):
//   Ctrl/Cmd + K  → focus global search          (typing-allowed)
//   Ctrl/Cmd + B  → toggle sidebar
//   Ctrl/Cmd + /  → open keyboard-shortcuts help
//   Esc           → close topmost overlay (modals/drawers/search)
//   Alt + H       → go home / dashboard
//   Alt + N       → open notifications
//   Alt + C       → open chat
// ============================================================================

import { useEffect } from 'react';

export interface ShortcutHandlers {
  /** Ctrl/Cmd+K — focus the global search bar. */
  onSearch?: () => void;
  /** Ctrl/Cmd+B — toggle the desktop sidebar. */
  onToggleSidebar?: () => void;
  /** Ctrl/Cmd+/ — open the keyboard-shortcuts help dialog. */
  onShortcutHelp?: () => void;
  /** Esc — dismiss the topmost overlay (modal/drawer/search). */
  onEscape?: () => void;
  /** Alt+H — navigate home / dashboard. */
  onHome?: () => void;
  /** Alt+N — open notifications. */
  onNotifications?: () => void;
  /** Alt+C — open chat. */
  onChat?: () => void;
}

/** Editable element the user may be typing in. */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    target.isContentEditable
  );
}

/**
 * Register global keyboard shortcuts. Pass only the handlers you need; the
 * hook is a no-op for omitted handlers.
 */
export function useGlobalShortcuts(handlers: ShortcutHandlers): void {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const mod = event.ctrlKey || event.metaKey;
      const typing = isEditableTarget(event.target);

      // Esc — always allowed (works while typing to clear/blur).
      if (event.key === 'Escape') {
        handlers.onEscape?.();
        return;
      }

      // Ctrl/Cmd combos — allow while typing only for the search shortcut.
      if (mod) {
        const key = event.key.toLowerCase();
        if (key === 'k') {
          event.preventDefault();
          handlers.onSearch?.();
          return;
        }
        if (key === 'b' && !typing) {
          event.preventDefault();
          handlers.onToggleSidebar?.();
          return;
        }
        if (key === '/' && !typing) {
          event.preventDefault();
          handlers.onShortcutHelp?.();
          return;
        }
      }

      // Alt combos — never fire while typing.
      if (event.altKey && !typing && !mod) {
        const key = event.key.toLowerCase();
        if (key === 'h') {
          event.preventDefault();
          handlers.onHome?.();
          return;
        }
        if (key === 'n') {
          event.preventDefault();
          handlers.onNotifications?.();
          return;
        }
        if (key === 'c') {
          event.preventDefault();
          handlers.onChat?.();
          return;
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlers]);
}

export default useGlobalShortcuts;
