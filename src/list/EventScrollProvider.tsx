import { PropsWithChildren, useRef } from 'react';
import { EventScrollContext } from './context';

export function EventScrollProvider({ children }: PropsWithChildren) {
  const eventRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToEvent = (id: string) => {
    const event = eventRefs.current[id];
    if (event) {
      event.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    }
  };

  return (
    <EventScrollContext.Provider value={{ scrollToEvent, eventRefs }}>
      {children}
    </EventScrollContext.Provider>
  );
}
