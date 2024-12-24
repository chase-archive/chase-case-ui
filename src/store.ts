import { create } from 'zustand';

export type ChaseCaseStore = {
  searchQuery: string | null;
  setSearchQuery: (searchQuery: string | null) => void;
  highlightedCaseId: string | null;
  setHighlightedCaseId: (highlightedCaseId: string | null) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  searchQuery: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  highlightedCaseId: null,
  setHighlightedCaseId: (highlightedCaseId) => set({ highlightedCaseId }),
}));
