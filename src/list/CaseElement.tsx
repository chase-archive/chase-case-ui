import { Flex, CloseButton, Text, VisuallyHidden } from '@mantine/core';
import { DateTime } from 'luxon';
import { forwardRef, useState } from 'react';
import { ChaseCase } from '../types';
import { TagList } from '../tags/TagList';
import { useChaseCaseStore } from '../store';

export interface ChaseCaseElementProps {
  chaseCase: ChaseCase;
  isHighlighted?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  onClickTitle?: () => void;
}

export const CaseElement = forwardRef<HTMLDivElement, ChaseCaseElementProps>(
  ({ chaseCase, isHighlighted, onClick, onClose, onClickTitle }, ref) => {
    const addFilteredTag = useChaseCaseStore((state) => state.addFilteredTag);
    const [isTitleHovered, setIsTitleHovered] = useState(false);
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
            backgroundColor: 'rgba(255, 255, 143, 0.6)',
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
        <Flex direction='row' gap={10} justify='space-between'>
          <Text
            component='a'
            fw={600}
            lineClamp={3}
            // flex={1}
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
            onClick={() => {
              if (onClickTitle) {
                onClickTitle();
              }
            }}
            style={{
              ...(isTitleHovered &&
                onClickTitle && { textDecoration: 'underline' }),
            }}
          >
            {event_name}
          </Text>
          {onClose && isHighlighted && (
            <CloseButton
              size='sm'
              onClick={(e) => {
                onClose();
                e.stopPropagation();
              }}
            >
              <VisuallyHidden>Unhighlight Case</VisuallyHidden>
            </CloseButton>
          )}
        </Flex>
        <TagList
          tags={tags}
          maxTagLength={4}
          onTagClick={(tag) => addFilteredTag(tag)}
        />
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
