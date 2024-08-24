import { create } from 'zustand';
import { ChaseCase } from './types';

export type ChaseCaseStore = {
  highlightedCases: ChaseCase[];
  setHighlightedCases: (highlightedCases: ChaseCase[]) => void;
  selectedCases: ChaseCase[];
  setSelectedCases: (selectedCases: ChaseCase[]) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  highlightedCases: [],
  setHighlightedCases: (highlightedCases) => set({ highlightedCases }),
  selectedCases: [],
  setSelectedCases: (selectedCases) => set({ selectedCases }),
}));
