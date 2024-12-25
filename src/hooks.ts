import { useSearchCases } from './api';
import { useChaseCaseStore } from './store';

export function useCases(limit: number = 500) {
  const searchQuery = useChaseCaseStore((state) => state.searchQuery);
  const highlightedCaseId = useChaseCaseStore(
    (state) => state.highlightedCaseId
  );
  const filteredTags = useChaseCaseStore((state) => state.filteredTags);
  const cases = useSearchCases(searchQuery ?? '', [], limit, !!searchQuery);

  const queriedCases =
    cases.data?.filter(({ tags }) =>
      tags.some((tag) => (filteredTags.size > 0 ? filteredTags.has(tag) : true))
    ) ?? [];

  return {
    queriedCases,
    isLoading: cases.isLoading,
    isError: cases.isError,
    highlightedCase:
      queriedCases.find((c) => c.id === highlightedCaseId) ?? null,
  };
}
