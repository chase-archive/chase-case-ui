import { useQuery } from '@tanstack/react-query';
import { importProfile } from 'upperair';
import { Sounding } from './types';

export function useGetSounding(caseId: string | null) {
  return useQuery<Sounding>({
    queryKey: ['sounding', caseId],
    queryFn: () => getProfile(caseId ?? ''),
    enabled: !!caseId,
  });
}

async function getProfile(caseId: string) {
  const response = await fetch(
    `https://urchin-app-tpil4.ondigitalocean.app/soundings/${caseId}`,
    // `http://localhost:8000/soundings/${caseId}`,
    { headers: { accept: 'application/json' } }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return {
    ...result,
    data: importProfile(result.data),
  };
}
