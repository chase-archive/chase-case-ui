import {
  Box,
  Center,
  Divider,
  Flex,
  Loader,
  Text,
  CloseButton,
  VisuallyHidden,
} from '@mantine/core';
import { useCases } from '../hooks';
import { ChaseCase } from '../types';
import { DateTime } from 'luxon';
import { forwardRef, Fragment, HTMLProps } from 'react';
import { useChaseCaseStore } from '../store';
import { useScrollToEvent } from './context';
import { useMap } from 'react-map-gl';

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
                    setSelectedCaseId(chaseCase.id);
                  } else {
                    map?.flyTo({
                      center: [chaseCase.lon, chaseCase.lat],
                    });
                    setHighlightedCaseId(chaseCase.id);
                  }
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

interface ChaseCaseElementProps {
  chaseCase: ChaseCase;
  isHighlighted?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

const ChaseCaseElement = forwardRef<HTMLDivElement, ChaseCaseElementProps>(
  ({ chaseCase, isHighlighted, onClick, onClose }, ref) => {
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
        <Flex direction='row' gap={10}>
          <Text fw={600} lineClamp={3} flex={1}>
            {event_name}
          </Text>
          {onClose && isHighlighted && (
            <CloseButton size='sm' onClick={onClose}>
              <VisuallyHidden>Unhighlight Case</VisuallyHidden>
            </CloseButton>
          )}
        </Flex>
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
