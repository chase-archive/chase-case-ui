import { Divider, Flex, Text } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { ChaseCase } from '../types';
import styles from './CasesDetails.module.css';
import { DateTime } from 'luxon';

export default function CaseDetails() {
  const queriedCases = useChaseCaseStore((state) => state.queriedCases);
  return (
    <div className={styles.casesDetailsPanel}>
      {queriedCases.map((chaseCase, idx) => (
        <>
          <SingleCaseDetails key={idx} chaseCase={chaseCase} />
          {idx < queriedCases.length - 1 && <Divider my='md' />}
        </>
      ))}
    </div>
  );
}

function SingleCaseDetails({ chaseCase }: { chaseCase: ChaseCase }) {
  const datetime = DateTime.fromISO(chaseCase.timestamp, { zone: 'utc' });
  const datetimeCST = datetime.setZone('America/Chicago');
  return (
    <Flex direction='column' mx='md' my='md'>
      <Text fw={700}>{chaseCase.location}</Text>
      <Text size='sm' fs='italic'>
        {datetimeCST.toFormat('DDD')}
      </Text>
    </Flex>
  );
}
