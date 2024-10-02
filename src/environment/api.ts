import { useQuery } from '@tanstack/react-query';
import { EnvironmentData, EnvironmentOverview } from './types';
import { DateTime } from 'luxon';
import { Level } from '../types';

export function useEnvironmentData(
  caseId: string | null,
  timestamp: DateTime | null,
  level: Level
) {
  return useQuery<EnvironmentData>({
    queryKey: ['environmentData', caseId, timestamp, level],
    queryFn: () =>
      getEnvironmentData(caseId ?? '', timestamp ?? DateTime.now(), level),
    enabled: !!caseId && !!timestamp,
  });
}

export function useEnvironmentOverviews(caseId: string | null) {
  return useQuery<EnvironmentOverview[]>({
    queryKey: ['environmentOverview', caseId],
    queryFn: () => getEnvironmentOverviews(caseId ?? ''),
    enabled: !!caseId,
  });
}

async function getEnvironmentData(
  caseId: string,
  timestamp: DateTime,
  level: Level
) {
  const response = await fetch(
    `https://urchin-app-tpil4.ondigitalocean.app/environment/data/${caseId}/${encodeURIComponent(
      timestamp.toISO() ?? ''
    )}/${level}`,
    { headers: { accept: 'application/json' } }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}

async function getEnvironmentOverviews(caseId: string) {
  const response = await fetch(
    `https://urchin-app-tpil4.ondigitalocean.app/environment/overview/${caseId}`,
    { headers: { accept: 'application/json' } }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}
