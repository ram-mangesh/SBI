import { create } from 'zustand';

interface SettingsStoreState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useSettingsStore = create<SettingsStoreState>((set) => ({
  activeSection: 'profile',
  setActiveSection: (activeSection) => set({ activeSection }),
}));
