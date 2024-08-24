import { create } from 'zustand';
import { ChaseCase } from './types';

export type ChaseCaseStore = {
  selectedCase: ChaseCase | null;
  setSelectedCase: (selectedCase: ChaseCase | null) => void;
  selectedCases: ChaseCase[];
  setSelectedCases: (selectedCases: ChaseCase[]) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  selectedCase: null,
  setSelectedCase: (selectedCaseId) => set({ selectedCase: selectedCaseId }),
  selectedCases: [],
  setSelectedCases: (selectedCases) => set({ selectedCases }),
}));
