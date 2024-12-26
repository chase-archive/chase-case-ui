import { Box, Center, Divider, Loader, Text } from '@mantine/core';
import { useCases } from '../hooks';
import { Fragment, HTMLProps } from 'react';
import { useChaseCaseStore } from '../store';
import { useScrollToEvent } from './context';
import { useMap } from 'react-map-gl';
import { CaseElement } from './CaseElement';

export function CaseList({
  className,
}: Pick<HTMLProps<HTMLElement>, 'className'>) {
  const { queriedCases, isLoading, highlightedCase } = useCases();
  const [setHighlightedCaseId, setSelectedCaseId] = useChaseCaseStore(
    (state) => [state.setHighlightedCaseId, state.setSelectedCaseId]
  );
  const { eventRefs } = useScrollToEvent();
  const { current: map } = useMap();

  return (
    <Box className={className}>
      {isLoading ? (
        <Center>
          <Loader size='28' />
        </Center>
      ) : queriedCases.length == 0 ? (
        <Center>
          <Text fs='italic' size='sm'>
            No Cases Found
          </Text>
        </Center>
      ) : (
        <>
          {queriedCases.map((chaseCase) => (
            <Fragment key={chaseCase.id}>
              <CaseElement
                ref={(el) => {
                  if (eventRefs.current) {
                    eventRefs.current[chaseCase.id] = el;
                  }
                }}
                chaseCase={chaseCase}
                key={chaseCase.id}
                isHighlighted={chaseCase.id === highlightedCase?.id}
                onClick={() => {
                  if (highlightedCase?.id === chaseCase.id) {
                    setSelectedCaseId(chaseCase.id);
                  } else {
                    map?.flyTo({
                      center: [chaseCase.lon, chaseCase.lat],
                    });
                    setHighlightedCaseId(chaseCase.id);
                  }
                }}
                onClickTitle={() => {
                  setSelectedCaseId(chaseCase.id);
                  setHighlightedCaseId(chaseCase.id);
                  map?.flyTo({
                    center: [chaseCase.lon, chaseCase.lat],
                  });
                }}
                onClose={() => setHighlightedCaseId(null)}
              />
              <Divider my={5} />
            </Fragment>
          ))}
        </>
      )}
    </Box>
  );
}
