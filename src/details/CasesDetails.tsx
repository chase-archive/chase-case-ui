import { Center, Divider, Flex, Text, Title } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { ChaseCase } from '../types';
import styles from './CasesDetails.module.css';
import { DateTime } from 'luxon';
import { Fragment, useState } from 'react';
import { Embed } from './Embed';
import { LinkList } from './Link';
import { useMap } from 'react-map-gl';

export default function CaseDetails() {
  const [
    queriedCases,
    highlightedCases,
    setHighlightedCases,
    savedSearchQuery,
    savedYearQuery,
  ] = useChaseCaseStore((state) => [
    state.queriedCases,
    state.highlightedCases,
    state.setHighlightedCases,
    state.savedSearchQuery,
    state.savedYearQuery,
  ]);

  const { current: map } = useMap();

  const highlightedCasesIds = highlightedCases.map((chaseCase) => chaseCase.id);

  return (
    <div className={styles.casesDetailsPanel}>
      <Center className={styles.caseDetailsPanelTitle} py={6} px={10}>
        <Title order={4}>
          Cases for:{' '}
          {savedSearchQuery || savedYearQuery
            ? savedSearchQuery ?? savedYearQuery
            : '--'}
        </Title>
      </Center>
      <div className={styles.casesDetailsList}>
        {queriedCases.length === 0 && (
          <Center py={6} className={styles.singleCaseDetails}>
            <Text size='sm'>No cases found</Text>
          </Center>
        )}
        {queriedCases.map((chaseCase, idx) => (
          <Fragment key={idx}>
            <SingleCaseDetails
              chaseCase={chaseCase}
              isHighlighted={highlightedCasesIds.includes(chaseCase.id)}
              onClick={() => {
                if (highlightedCasesIds.includes(chaseCase.id)) {
                  setHighlightedCases([]);
                } else {
                  setHighlightedCases([chaseCase]);
                  map?.flyTo({
                    center: [chaseCase.lon, chaseCase.lat],
                    zoom: 8,
                  });
                }
              }}
            />
            {idx < queriedCases.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function SingleCaseDetails({
  chaseCase,
  isHighlighted,
  onClick,
}: {
  chaseCase: ChaseCase;
  isHighlighted?: boolean;
  onClick?: () => void;
}) {
  const datetime = DateTime.fromISO(chaseCase.timestamp, { zone: 'utc' });
  const datetimeCST = datetime.setZone('America/Chicago');
  const [openedLink, setOpenedLink] = useState('');

  return (
    <Flex
      className={styles.singleCaseDetails}
      direction='column'
      px='md'
      py='sm'
      style={{
        ...(isHighlighted && { backgroundColor: 'rgba(255, 255, 224, 0.75)' }),
      }}
    >
      <Flex
        direction='column'
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <Text fw={700}>{chaseCase.location}</Text>
        <Text size='sm' fs='italic'>
          {datetimeCST.toFormat('DDD HH:MM') + ' CST'}
        </Text>
      </Flex>
      <Flex direction='row' mt={6} align='flex-start'>
        <Text fw={700} size='sm' mr={8}>
          Documentation:
        </Text>
        <LinkList
          links={chaseCase.documentation}
          onClickSocialLink={(link) => setOpenedLink(link)}
        />
        <Embed
          title={chaseCase.location}
          link={openedLink}
          isOpen={openedLink !== ''}
          onClose={() => setOpenedLink('')}
        />
      </Flex>
    </Flex>
  );
}
