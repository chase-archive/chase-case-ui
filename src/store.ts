import { create } from 'zustand';
import { ChaseCase } from './types';

export type ChaseCaseStore = {
  highlightedCases: ChaseCase[];
  setHighlightedCases: (highlightedCases: ChaseCase[]) => void;
  queriedCases: ChaseCase[];
  setQueriedCases: (queriedCases: ChaseCase[]) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  highlightedCases: [],
  setHighlightedCases: (highlightedCases) => set({ highlightedCases }),
  queriedCases: [],
  setQueriedCases: (queriedCases) => set({ queriedCases }),
}));
