import { create } from 'zustand';

interface AnalyticsStoreState {
  lastEventName: string | null;
  recordEvent: (eventName: string) => void;
}

export const useAnalyticsStore = create<AnalyticsStoreState>((set) => ({
  lastEventName: null,
  recordEvent: (lastEventName) => set({ lastEventName }),
}));
