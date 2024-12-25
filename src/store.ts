import { create } from 'zustand';

export type ChaseCaseStore = {
  searchQuery: string | null;
  setSearchQuery: (searchQuery: string | null) => void;
  highlightedCaseId: string | null;
  setHighlightedCaseId: (highlightedCaseId: string | null) => void;
  selectedCaseId: string | null;
  setSelectedCaseId: (selectedCaseId: string | null) => void;
  filteredTags: Set<string>;
  addFilteredTag: (tag: string) => void;
  removeFilteredTag: (tag: string) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  searchQuery: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  highlightedCaseId: null,
  setHighlightedCaseId: (highlightedCaseId) => set({ highlightedCaseId }),
  selectedCaseId: null,
  setSelectedCaseId: (selectedCaseId) => set({ selectedCaseId }),
  filteredTags: new Set(),
  addFilteredTag: (tag) =>
    set((state) => {
      state.filteredTags.add(tag);
      return { filteredTags: state.filteredTags };
    }),
  removeFilteredTag: (tag) =>
    set((state) => {
      state.filteredTags.delete(tag);
      return { filteredTags: state.filteredTags };
    }),
}));
