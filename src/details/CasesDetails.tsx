import { Anchor, Divider, Flex, Text } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { ChaseCase } from '../types';
import styles from './CasesDetails.module.css';
import { DateTime } from 'luxon';
import { Fragment, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Embed } from './Embed';
import { isTwitterLink, isYouTubeLink } from '../utils/socials';

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

  const [openedLink, setOpenedLink] = useState('');

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
        <LinkList
          links={chaseCase.documentation}
          onClickLink={(link) => {
            if (isYouTubeLink(link) || isTwitterLink(link)) {
              setOpenedLink(link);
            } else {
              window.open(link, '_blank', 'noopener noreferrer');
            }
          }}
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

function LinkList({
  links,
  onClickLink,
}: {
  links: string[];
  onClickLink?: (link: string) => void;
}) {
  const linkProps = (link: string) => {
    if (onClickLink) {
      return {
        href: '#',
        onClick: () => onClickLink(link),
      };
    } else {
      return {
        href: link,
        target: '_blank',
      };
    }
  };

  return (
    <>
      {links.length === 0 && <Text size='sm'>N/A</Text>}
      {links.map((link, idx) => (
        <Fragment key={idx}>
          <Anchor {...linkProps(link)} size='sm' underline='hover'>
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
