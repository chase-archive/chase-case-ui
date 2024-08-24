import { useQuery } from '@tanstack/react-query';
import { ChaseCase } from './types';

export function useSearchCases(query: string) {
  return useQuery<ChaseCase[]>({
    queryKey: ['search', query],
    queryFn: () => getChaseCases(query),
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
