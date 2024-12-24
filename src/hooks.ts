import { useSearchCases } from './api';
import { useChaseCaseStore } from './store';

export function useCases(limit: number = 500) {
  const searchQuery = useChaseCaseStore((state) => state.searchQuery);
  const highlightedCaseId = useChaseCaseStore(
    (state) => state.highlightedCaseId
  );
  const cases = useSearchCases(searchQuery ?? '', limit, !!searchQuery);

  return {
    queriedCases: cases.data ?? [],
    isLoading: cases.isLoading,
    isError: cases.isError,
    highlightedCase:
      cases.data?.find((c) => c.id === highlightedCaseId) ?? null,
  };
}
