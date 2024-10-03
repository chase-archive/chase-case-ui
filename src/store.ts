import { create } from 'zustand';
import { ChaseCase, DisplayVar, Level } from './types';

const DEFAULT_ENVIRONMENT_VARS: DisplayVar[] = ['height', 'isotachs', 'barbs'];

export type ChaseCaseStore = {
  savedSearchQuery: string | null;
  setSavedSearchQuery: (savedSearchQuery: string | null) => void;
  highlightedCases: ChaseCase[];
  setHighlightedCases: (highlightedCases: ChaseCase[]) => void;
  queriedCases: ChaseCase[];
  setQueriedCases: (queriedCases: ChaseCase[]) => void;
  environmentEventId: string | null;
  setEnvironmentEventId: (environmentEventId: string | null) => void;
  // environmentTimestamp: DateTime | null;
  // setEnvironmentTimestamp: (envTimestamp: DateTime | null) => void;
  environmentDisplayVars: DisplayVar[];
  setEnvironmentDisplayVars: (envDisplayVars: DisplayVar[]) => void;
  resetEnvironment: () => void;
  environmentLevel: Level;
  setEnvironmentLevel: (envLevel: Level) => void;
  environmentTimeIndex: number;
  setEnvironmentTimeIndex: (envTimeIndex: number) => void;
};

export const useChaseCaseStore = create<ChaseCaseStore>((set) => ({
  savedSearchQuery: null,
  setSavedSearchQuery: (savedSearchQuery) => set({ savedSearchQuery }),
  highlightedCases: [],
  setHighlightedCases: (highlightedCases) => set({ highlightedCases }),
  queriedCases: [],
  setQueriedCases: (queriedCases) => set({ queriedCases }),
  environmentEventId: null,
  setEnvironmentEventId: (environmentEventId) => set({ environmentEventId }),
  environmentTimestamp: null,
  // setEnvironmentTimestamp: (envTimestamp) =>
  //   set({ environmentTimestamp: envTimestamp }),
  environmentDisplayVars: DEFAULT_ENVIRONMENT_VARS,
  setEnvironmentDisplayVars: (envDisplayVars) =>
    set({ environmentDisplayVars: envDisplayVars }),
  resetEnvironment: () => {
    set({
      environmentEventId: null,
      // environmentTimestamp: null,
      environmentTimeIndex: 0,
      environmentLevel: 500,
      environmentDisplayVars: DEFAULT_ENVIRONMENT_VARS,
    });
  },
  environmentLevel: 500,
  setEnvironmentLevel: (envLevel) => set({ environmentLevel: envLevel }),
  environmentTimeIndex: 0,
  setEnvironmentTimeIndex: (envTimeIndex) =>
    set({ environmentTimeIndex: envTimeIndex }),
}));
