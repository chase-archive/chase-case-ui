import { Flex, CloseButton, Text, VisuallyHidden } from '@mantine/core';
import { DateTime } from 'luxon';
import { forwardRef } from 'react';
import { ChaseCase } from '../types';
import { TagList } from '../tags/TagList';

export interface ChaseCaseElementProps {
  chaseCase: ChaseCase;
  isHighlighted?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

export const CaseElement = forwardRef<HTMLDivElement, ChaseCaseElementProps>(
  ({ chaseCase, isHighlighted, onClick, onClose }, ref) => {
    const { event_name, time_start, lat, lon, tags } = chaseCase;
    const dateTimeStr = DateTime.fromISO(time_start, { zone: 'utc' }).toFormat(
      'yyyy-MM-dd HH:mm'
    );
    return (
      <Flex
        ref={ref}
        direction='column'
        gap={5}
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
        <TagList tags={tags} maxTagLength={4} />
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
