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
  // these actions *have* to return a new set to trigger a re-render
  // see: https://gis.stackexchange.com/questions/431120/mapbox-layer-doesnt-update-on-variable-change-react-map-gl
  addFilteredTag: (tag) =>
    set((state) => {
      state.filteredTags.add(tag);
      const newTags = new Set(state.filteredTags);
      return { filteredTags: newTags };
    }),
  removeFilteredTag: (tag) =>
    set((state) => {
      state.filteredTags.delete(tag);
      const newTags = new Set(state.filteredTags);
      return { filteredTags: newTags };
    }),
}));
