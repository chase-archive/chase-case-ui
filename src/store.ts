import { create } from 'zustand';
import { ChaseCase } from './types';

export type ChaseCaseStore = {
  savedSearchQuery: string | null;
  setSavedSearchQuery: (savedSearchQuery: string | null) => void;
  savedYearQuery: number | null;
  setSavedYearQuery: (savedYearQuery: number | null) => void;
  highlightedCases: ChaseCase[];
  setHighlightedCases: (highlightedCases: ChaseCase[]) => void;
  queriedCases: ChaseCase[];
  setQueriedCases: (queriedCases: ChaseCase[]) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  savedSearchQuery: null,
  setSavedSearchQuery: (savedSearchQuery) => {
    set({ savedSearchQuery, savedYearQuery: null });
  },
  savedYearQuery: null,
  setSavedYearQuery: (savedYearQuery) => {
    set({ savedYearQuery, savedSearchQuery: null });
  },
  highlightedCases: [],
  setHighlightedCases: (highlightedCases) => set({ highlightedCases }),
  queriedCases: [],
  setQueriedCases: (queriedCases) => set({ queriedCases }),
}));
