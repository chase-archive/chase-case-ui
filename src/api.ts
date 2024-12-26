import { useQuery } from '@tanstack/react-query';
import { ChaseCase } from './types';
import { API_BASE_URL } from './constants';

export function useSearchCases(
  query: string,
  // TODO: the tags is not used here: want to do as much caching as possible
  tags: string[] = [],
  limit: number = 5,
  enabled: boolean = true
) {
  return useQuery<ChaseCase[]>({
    queryKey: ['search', query, limit, tags.join(',')],
    queryFn: () => getChaseCases(query, limit, tags),
    enabled: enabled && !!query,
  });
}

async function getChaseCases(query: string, limit: number, tags: string[]) {
  const response = await fetch(
    `${API_BASE_URL}/cases/search?q=${query}&limit=${limit}`,
    { headers: { accept: 'application/json' } }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const res = await response.json();
  if (tags.length > 0) {
    return res.filter((c: ChaseCase) =>
      c.tags.some((tag) => tags.includes(tag))
    );
  }
  return res;
}
