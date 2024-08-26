import { Anchor, Divider, Flex, Text } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { ChaseCase } from '../types';
import styles from './CasesDetails.module.css';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function CaseDetails() {
  const queriedCases = useChaseCaseStore((state) => state.queriedCases);
  return (
    <div className={styles.casesDetailsPanel}>
      {queriedCases.map((chaseCase, idx) => (
        <Fragment key={idx}>
          <SingleCaseDetails chaseCase={chaseCase} />
          {idx < queriedCases.length - 1 && <Divider />}
        </Fragment>
      ))}
    </div>
  );
}

function SingleCaseDetails({ chaseCase }: { chaseCase: ChaseCase }) {
  const datetime = DateTime.fromISO(chaseCase.timestamp, { zone: 'utc' });
  const datetimeCST = datetime.setZone('America/Chicago');
  // const youtubeLinks = chaseCase.documentation.filter((doc) =>
  //   doc.includes('youtube.com/watch')
  // );

  return (
    <Flex direction='column' mx='md' my='sm'>
      <Text fw={700}>{chaseCase.location}</Text>
      <Text size='sm' fs='italic'>
        {datetimeCST.toFormat('DDD HH:MM') + ' CST'}
      </Text>
      <Flex direction='row' mt={6} align='flex-start'>
        <Text fw={700} size='sm' mr={8}>
          Documentation:
        </Text>
        <LinkList links={chaseCase.documentation} onClick={console.log} />
      </Flex>
    </Flex>
  );
}

function LinkList({
  links,
  onClick,
}: {
  links: string[];
  onClick: (link: string) => void;
}) {
  return (
    <>
      {links.length === 0 && <Text size='sm'>N/A</Text>}
      {links.map((link, idx) => (
        <Fragment key={idx}>
          <Anchor onClick={() => onClick(link)} size='sm'>
            {idx + 1} <FaExternalLinkAlt />
          </Anchor>
          {idx < links.length - 1 && (
            <Text size='sm' mr={8}>
              ,
            </Text>
          )}
        </Fragment>
      ))}
    </>
  );
}
