import { useQuery } from '@tanstack/react-query';
import { ChaseCase } from './types';

export function useSearchCases(query: string, limit: number = 5) {
  return useQuery<ChaseCase[]>({
    queryKey: ['search', query, limit],
    queryFn: () => getChaseCases(query),
  });
}

export function useGetCasesByYear(year: number | null) {
  return useQuery<ChaseCase[]>({
    queryKey: ['get-by-year', year],
    queryFn: () => getChaseCasesByYear(year ?? 2024),
    enabled: year !== null,
  });
}

async function getChaseCases(query: string) {
  const response = await fetch(
    `https://urchin-app-tpil4.ondigitalocean.app/cases/search?q=${query}&limit=5`,
    { headers: { accept: 'application/json' } }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}

async function getChaseCasesByYear(year: number) {
  const response = await fetch(
    `https://urchin-app-tpil4.ondigitalocean.app/cases/year/${year}`,
    { headers: { accept: 'application/json' } }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}
