import { useQuery } from '@tanstack/react-query';
import { ChaseCase } from './types';

export function useSearchCases(
  query: string,
  limit: number = 5,
  enabled: boolean = true
) {
  return useQuery<ChaseCase[]>({
    queryKey: ['search', query, limit],
    queryFn: () => getChaseCases(query, limit),
    enabled: enabled && !!query,
  });
}

async function getChaseCases(query: string, limit: number) {
  const response = await fetch(
    `http://localhost:8000/cases/search?q=${query}&limit=${limit}`,
    { headers: { accept: 'application/json' } }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}
