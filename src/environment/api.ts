import { useQuery } from '@tanstack/react-query';
import { EnvironmentData, EnvironmentOverview } from './types';
import { DateTime } from 'luxon';
import { Level } from '../types';

const BASE_URL = 'https://urchin-app-tpil4.ondigitalocean.app';

export function useEnvironmentData(
  caseId: string | null,
  timestamps: DateTime[] | null,
  level: Level
) {
  const timestampsKey = timestamps?.map((t) => t.toISO()).join(',') ?? '';
  return useQuery<EnvironmentData[]>({
    queryKey: ['environmentData', caseId, timestampsKey, level],
    queryFn: () => {
      const promises = (timestamps ?? []).map((timestamp) =>
        getEnvironmentData(caseId ?? '', timestamp, level)
      );
      return Promise.all(promises);
    },

    enabled: !!caseId && timestamps !== null && timestamps.length > 0,
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
    `${BASE_URL}/environment/data/${caseId}/${encodeURIComponent(
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
  const response = await fetch(`${BASE_URL}/environment/overview/${caseId}`, {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}
