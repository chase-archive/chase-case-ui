import { Divider, Flex, Text } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { ChaseCase } from '../types';
import styles from './CasesDetails.module.css';
import { DateTime } from 'luxon';
import { Fragment, useState } from 'react';
import { Embed } from './Embed';
import { LinkList } from './Link';

export default function CaseDetails() {
  const [queriedCases, highlightedCases, setHighlightedCases] =
    useChaseCaseStore((state) => [
      state.queriedCases,
      state.highlightedCases,
      state.setHighlightedCases,
    ]);

  const highlightedCasesIds = highlightedCases.map((chaseCase) => chaseCase.id);
  return (
    <div className={styles.casesDetailsPanel}>
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
              }
            }}
          />
          {idx < queriedCases.length - 1 && <Divider />}
        </Fragment>
      ))}
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
      direction='column'
      px='md'
      py='sm'
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      style={{
        cursor: 'pointer',
        ...(isHighlighted && { backgroundColor: 'rgba(255, 255, 0, 0.2)' }),
      }}
    >
      <Text fw={700}>{chaseCase.location}</Text>
      <Text size='sm' fs='italic'>
        {datetimeCST.toFormat('DDD HH:MM') + ' CST'}
      </Text>
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
