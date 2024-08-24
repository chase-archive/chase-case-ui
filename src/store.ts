import { create } from 'zustand';

export type ChaseCaseStore = {
  selectedCaseId: string | null;
  setSelectedCaseId: (selectedCaseId: string | null) => void;
};
export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  selectedCaseId: null,
  setSelectedCaseId: (selectedCaseId) => set({ selectedCaseId }),
}));
