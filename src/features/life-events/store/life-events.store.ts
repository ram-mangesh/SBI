import { create } from 'zustand';

interface LifeEventsStoreState {
  activeEventId: string | null;
  setActiveEventId: (eventId: string | null) => void;
}

export const useLifeEventsStore = create<LifeEventsStoreState>((set) => ({
  activeEventId: null,
  setActiveEventId: (activeEventId) => set({ activeEventId }),
}));
