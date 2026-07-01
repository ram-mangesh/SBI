import { create } from 'zustand';

interface GoalsStoreState {
  activeGoalId: string | null;
  setActiveGoalId: (goalId: string | null) => void;
}

export const useGoalsStore = create<GoalsStoreState>((set) => ({
  activeGoalId: null,
  setActiveGoalId: (activeGoalId) => set({ activeGoalId }),
}));
