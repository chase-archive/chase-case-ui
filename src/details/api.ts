import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../constants';
import { ChaseCase } from '../types';

export function useGetCaseDetails(caseId: string | null) {
  return useQuery<ChaseCase>({
    queryKey: ['case-details', caseId],
    queryFn: () => getCaseDetails(caseId ?? ''),
    enabled: !!caseId,
  });
}

async function getCaseDetails(caseId: string) {
  const response = await fetch(`${API_BASE_URL}/cases/${caseId}`, {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}
