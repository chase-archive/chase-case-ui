import { Box, Center, Divider, Flex, Loader, Text } from '@mantine/core';
import { useCases } from '../hooks';
import { ChaseCase } from '../types';
import { DateTime } from 'luxon';
import { HTMLProps } from 'react';

export function CaseList({
  className,
}: Pick<HTMLProps<HTMLElement>, 'className'>) {
  const { queriedCases, isLoading } = useCases();

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
            <ChaseCaseElement chaseCase={chaseCase} key={chaseCase.id} />
          ))}
        </>
      )}
    </Box>
  );
}

export function ChaseCaseElement({ chaseCase }: { chaseCase: ChaseCase }) {
  const { event_name, time_start, lat, lon } = chaseCase;
  const dateTimeStr = DateTime.fromISO(time_start, { zone: 'utc' }).toFormat(
    'yyyy-MM-dd HH:mm'
  );
  return (
    <Flex direction='column' gap={5}>
      <Text fw={600} lineClamp={3}>
        {event_name}
      </Text>
      <Flex direction='row' gap={10}>
        <Text size='sm' flex={1}>{`${dateTimeStr}Z`}</Text>
        <Text size='sm' flex={1} fs='italic'>{`(${lat.toFixed(
          2
        )}, ${lon.toFixed(2)})`}</Text>
      </Flex>
      <Divider my={5} />
    </Flex>
  );
}
