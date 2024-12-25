import { Box, Center, Divider, Flex, Loader, Text } from '@mantine/core';
import { useCases } from '../hooks';
import { ChaseCase } from '../types';
import { DateTime } from 'luxon';
import { forwardRef, Fragment, HTMLProps } from 'react';
import { useChaseCaseStore } from '../store';
import { useScrollToEvent } from './context';

export function CaseList({
  className,
}: Pick<HTMLProps<HTMLElement>, 'className'>) {
  const { queriedCases, isLoading, highlightedCase } = useCases();
  const setHighlightedCaseId = useChaseCaseStore(
    (state) => state.setHighlightedCaseId
  );
  const { eventRefs } = useScrollToEvent();

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
              <ChaseCaseElement
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
                    setHighlightedCaseId(null);
                  } else {
                    setHighlightedCaseId(chaseCase.id);
                  }
                }}
              />
              <Divider my={5} />
            </Fragment>
          ))}
        </>
      )}
    </Box>
  );
}

interface ChaseCaseElementProps {
  chaseCase: ChaseCase;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const ChaseCaseElement = forwardRef<HTMLDivElement, ChaseCaseElementProps>(
  ({ chaseCase, isHighlighted, onClick }, ref) => {
    const { event_name, time_start, lat, lon } = chaseCase;
    const dateTimeStr = DateTime.fromISO(time_start, { zone: 'utc' }).toFormat(
      'yyyy-MM-dd HH:mm'
    );
    return (
      <Flex
        ref={ref}
        direction='column'
        px='xs'
        py='xs'
        style={{
          ...(isHighlighted && {
            backgroundColor: 'rgba(255, 255, 224, 0.6)',
            borderRadius: 8,
          }),
          ...(onClick && { cursor: 'pointer' }),
        }}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <Text fw={600} lineClamp={3}>
          {event_name}
        </Text>
        <Flex direction='row' gap={10}>
          <Text size='sm' flex={1}>{`${dateTimeStr}Z`}</Text>
          <Text size='sm' flex={1} fs='italic'>{`(${lat.toFixed(
            2
          )}, ${lon.toFixed(2)})`}</Text>
        </Flex>
      </Flex>
    );
  }
);
