import { create } from 'zustand';
import { recommendations } from '../data/section8.mock';
import type { Section8State } from '../types/section8.types';

export const useSection8Store = create<Section8State>((set, get) => ({
  savedIds: recommendations.filter((item) => item.saved).map((item) => item.id),
  dismissedIds: [],
  comparisonIds: ['home-flex', 'personal-quick'],
  recentlyViewedIds: ['home-flex', 'signature-card', 'health-shield'],
  eligibilityChecks: {},
  toggleSaved: (id) =>
    set((state) => ({
      savedIds: state.savedIds.includes(id)
        ? state.savedIds.filter((item) => item !== id)
        : [...state.savedIds, id].slice(-10),
    })),
  dismiss: (id) => set((state) => ({ dismissedIds: [...state.dismissedIds, id] })),
  toggleCompare: (productId) => {
    const { comparisonIds } = get();
    if (comparisonIds.includes(productId)) {
      set({ comparisonIds: comparisonIds.filter((item) => item !== productId) });
      return;
    }
    if (comparisonIds.length >= 3) return;
    set({ comparisonIds: [...comparisonIds, productId] });
  },
  clearCompare: () => set({ comparisonIds: [] }),
  removeCompare: (productId) => set((state) => ({ comparisonIds: state.comparisonIds.filter((id) => id !== productId) })),
  trackView: (productId) =>
    set((state) => ({
      recentlyViewedIds: [productId, ...state.recentlyViewedIds.filter((id) => id !== productId)].slice(0, 10),
    })),
  runEligibility: (productId, fallback) =>
    set((state) => ({ eligibilityChecks: { ...state.eligibilityChecks, [productId]: fallback } })),
}));
