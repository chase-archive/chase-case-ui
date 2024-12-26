import { useQuery } from '@tanstack/react-query';
import { importProfile } from '@upperair/utilities';
import { Sounding } from './types';
import { API_BASE_URL } from '../constants';

export function useGetSounding(caseId: string | null) {
  return useQuery<Sounding>({
    queryKey: ['sounding', caseId],
    queryFn: () => getProfile(caseId ?? ''),
    enabled: !!caseId,
  });
}

async function getProfile(caseId: string) {
  const response = await fetch(`${API_BASE_URL}/soundings/${caseId}`, {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return {
    ...result,
    data: importProfile(result.data),
  };
}
