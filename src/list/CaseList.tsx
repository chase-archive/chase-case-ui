import { Center, Divider, Text } from '@mantine/core';
import { useCases } from '../hooks';
import { Fragment } from 'react';
import { useChaseCaseStore } from '../store';
import { useScrollToEvent } from './context';
import { useMap } from 'react-map-gl';
import { CaseElement } from './CaseElement';
import { ListLoader } from './ListLoader';
import styles from './CasePanel.module.css';

export function CaseList() {
  const { queriedCases, isLoading, highlightedCase } = useCases();
  const [setHighlightedCaseId, setSelectedCaseId] = useChaseCaseStore(
    (state) => [state.setHighlightedCaseId, state.setSelectedCaseId]
  );
  const { eventRefs } = useScrollToEvent();
  const { current: map } = useMap();

  return (
    <>
      {isLoading ? (
        <ListLoader
          backgroundColor='#D3D3D3'
          backgroundOpacity={0.75}
          style={{ width: '90%', marginLeft: '1em', minHeight: '50vh' }}
        />
      ) : queriedCases.length == 0 ? (
        <Center className={styles.zeroState}>
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
                onClose={() => {
                  setHighlightedCaseId(null);
                  setSelectedCaseId(null);
                }}
              />
              <Divider my={5} />
            </Fragment>
          ))}
        </>
      )}
    </>
  );
}
