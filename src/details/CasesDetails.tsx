import { Center, Divider, Flex, Text, Title } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { ChaseCase } from '../types';
import styles from './CasesDetails.module.css';
import { DateTime } from 'luxon';
import { Fragment, useState } from 'react';
import { Embed } from './Embed';
import { LinkList } from './Link';
import { useCases } from '../hooks';

export default function CaseDetails() {
  const searchQuery = useChaseCaseStore((state) => state.searchQuery);
  const [highlightedCaseId, setHighlightedCaseId] = useChaseCaseStore(
    (state) => [state.highlightedCaseId, state.setHighlightedCaseId]
  );
  const { queriedCases } = useCases();

  return (
    <div className={styles.casesDetailsPanel}>
      <Center className={styles.caseDetailsPanelTitle} py={6} px={10}>
        <Title order={4}>Cases for: {searchQuery || '--'}</Title>
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
              isHighlighted={chaseCase.id === highlightedCaseId}
              onClick={() => {
                if (highlightedCaseId === chaseCase.id) {
                  setHighlightedCaseId(null);
                } else {
                  setHighlightedCaseId(chaseCase.id);
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
  const datetime = DateTime.fromISO(chaseCase.time_start, { zone: 'utc' });
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
        <Text fw={700}>{chaseCase.event_name}</Text>
        <Text size='sm' fs='italic'>
          {datetimeCST.toFormat('DDD HH:MM') + ' CST'}
        </Text>
      </Flex>
      <Flex direction='row' mt={6} align='flex-start'>
        <Text fw={700} size='sm' mr={8}>
          Documentation:
        </Text>
        <LinkList
          links={chaseCase.photo_video}
          onClickSocialLink={(link) => setOpenedLink(link)}
        />
        <Embed
          title={chaseCase.event_name}
          link={openedLink}
          isOpen={openedLink !== ''}
          onClose={() => setOpenedLink('')}
        />
      </Flex>
    </Flex>
  );
}
