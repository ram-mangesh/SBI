// ============================================================================
// UI Store
// Source of Truth: BankMate AI Frontend Blueprint · Section 2.4 / 2.13
// Cross-component UI state: sidebar collapse, mobile drawer, active nav.
// Kept separate from feature stores so layout chrome can subscribe cheaply.
// ============================================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type NavRole = 'customer' | 'admin' | 'rm';

export interface UIState {
  /** Desktop sidebar collapsed (persisted). */
  sidebarCollapsed: boolean;
  /** Mobile drawer open. */
  mobileNavOpen: boolean;
  /** Which nav role's sidebar is rendered. */
  activeNavRole: NavRole;
  /** Top loading bar visibility (route transitions). */
  routeLoading: boolean;
  /** Global shortcuts help dialog open (Ctrl/Cmd + /). */
  shortcutsHelpOpen: boolean;
  /** Command palette / global search overlay open (Ctrl/Cmd + K). */
  searchOpen: boolean;

  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  setActiveNavRole: (role: NavRole) => void;
  setRouteLoading: (v: boolean) => void;
  setShortcutsHelpOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileNavOpen: false,
      activeNavRole: 'customer',
      routeLoading: false,
      shortcutsHelpOpen: false,
      searchOpen: false,

      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      openMobileNav: () => set({ mobileNavOpen: true }),
      closeMobileNav: () => set({ mobileNavOpen: false }),
      setActiveNavRole: (role) => set({ activeNavRole: role }),
      setRouteLoading: (v) => set({ routeLoading: v }),
      setShortcutsHelpOpen: (v) => set({ shortcutsHelpOpen: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
    }),
    {
      name: 'bankmate.ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        sidebarCollapsed: s.sidebarCollapsed,
        activeNavRole: s.activeNavRole,
      }),
    },
  ),
);

export default useUIStore;