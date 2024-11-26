import { create } from 'zustand';
import { ChaseCase } from './types';

export type ChaseCaseStore = {
  savedSearchQuery: string | null;
  setSavedSearchQuery: (savedSearchQuery: string | null) => void;
  highlightedCases: ChaseCase[];
  setHighlightedCases: (highlightedCases: ChaseCase[]) => void;
  queriedCases: ChaseCase[];
  setQueriedCases: (queriedCases: ChaseCase[]) => void;
  soundingCaseId: string | null;
  setSoundingCaseId: (soundingCaseId: string | null) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  savedSearchQuery: null,
  setSavedSearchQuery: (savedSearchQuery) => set({ savedSearchQuery }),
  highlightedCases: [],
  setHighlightedCases: (highlightedCases) => set({ highlightedCases }),
  queriedCases: [],
  setQueriedCases: (queriedCases) => set({ queriedCases }),
  soundingCaseId: null,
  setSoundingCaseId: (soundingCaseId) => set({ soundingCaseId }),
}));
