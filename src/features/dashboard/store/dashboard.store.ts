import { create } from 'zustand';

interface DashboardStoreState {
  lastRefreshAt: string | null;
  refresh: () => void;
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  lastRefreshAt: null,
  refresh: () => set({ lastRefreshAt: new Date().toISOString() }),
}));
