// ============================================================================
// Shortcuts Provider
// Source of Truth: BankMate AI Frontend Blueprint · Section 3.13 (Accessibility)
// Mounts once near the app root. Wires `useGlobalShortcuts` to UI store actions
// (sidebar toggle, help dialog, search overlay, escape) and router navigation
// for the Alt+* jumps, then renders the global ShortcutHelpDialog.
// ============================================================================

import { useCallback, useMemo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalShortcuts } from '@/shared/hooks/useGlobalShortcuts';
import { useUIStore } from '@/store';
import { ROUTES } from '@/core/config/routes.config';
import { ShortcutHelpDialog } from '@/shared/components/feedback/ShortcutHelpDialog';

export interface ShortcutsProviderProps {
  children: ReactNode;
}

export function ShortcutsProvider({ children }: ShortcutsProviderProps) {
  const navigate = useNavigate();

  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setShortcutsHelpOpen = useUIStore((s) => s.setShortcutsHelpOpen);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const shortcutsHelpOpen = useUIStore((s) => s.shortcutsHelpOpen);
  const closeMobileNav = useUIStore((s) => s.closeMobileNav);

  const onSearch = useCallback(() => setSearchOpen(true), [setSearchOpen]);
  const onToggleSidebar = useCallback(() => toggleSidebar(), [toggleSidebar]);
  const onShortcutHelp = useCallback(
    () => setShortcutsHelpOpen(true),
    [setShortcutsHelpOpen],
  );
  // Esc dismisses the topmost overlay in priority order.
  const onEscape = useCallback(() => {
    closeMobileNav();
    setShortcutsHelpOpen(false);
    setSearchOpen(false);
  }, [closeMobileNav, setShortcutsHelpOpen, setSearchOpen]);
  const onHome = useCallback(() => navigate(ROUTES.ROOT), [navigate]);
  const onNotifications = useCallback(
    () => navigate(ROUTES.NOTIFICATIONS),
    [navigate],
  );
  const onChat = useCallback(() => navigate(ROUTES.CHAT), [navigate]);

  const handlers = useMemo(
    () => ({
      onSearch,
      onToggleSidebar,
      onShortcutHelp,
      onEscape,
      onHome,
      onNotifications,
      onChat,
    }),
    [onSearch, onToggleSidebar, onShortcutHelp, onEscape, onHome, onNotifications, onChat],
  );

  useGlobalShortcuts(handlers);

  return (
    <>
      {children}
      <ShortcutHelpDialog
        open={shortcutsHelpOpen}
        onOpenChange={setShortcutsHelpOpen}
      />
    </>
  );
}

export default ShortcutsProvider;
