import { createContext, RefObject, useContext } from 'react';

export const EventScrollContext = createContext<
  | {
      scrollToEvent: (id: string) => void;
      eventRefs: RefObject<Record<string, HTMLDivElement | null>>;
    }
  | undefined
>(undefined);

export const useScrollToEvent = () => {
  const context = useContext(EventScrollContext);
  if (!context) {
    throw new Error(
      'useScrollToEvent must be used within a EventScrollProvider'
    );
  }
  return context;
};
