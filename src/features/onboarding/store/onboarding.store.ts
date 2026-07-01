import { create } from 'zustand';

interface OnboardingStoreState {
  currentStep: number;
  completedSteps: number[];
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
}

export const useOnboardingStore = create<OnboardingStoreState>((set) => ({
  currentStep: 1,
  completedSteps: [],
  setCurrentStep: (currentStep) => set({ currentStep }),
  completeStep: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),
}));
