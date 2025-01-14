import { ActionIcon, Flex } from '@mantine/core';
import { LuMousePointerClick } from 'react-icons/lu';
import {
  Hodograph,
  InteractionMode,
  ParcelType,
  Profiles,
  SkewT,
} from 'upperair';
import 'upperair/core.css';
import 'upperair/tables.css';
import { useState } from 'react';
import { AiOutlineDrag } from 'react-icons/ai';
import { SoundingParameters } from './SoundingParameters';
import { useGetSounding } from './api';
import styles from './Soundings.module.css';
import { useMediaQuery } from '@mantine/hooks';

interface SoundingViewerProps {
  caseId: string;
}

export function SoundingViewer({ caseId }: SoundingViewerProps) {
  const { data: sounding } = useGetSounding(caseId);
  const [parcel, setParcel] = useState<ParcelType>('ML');
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>('select');

  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!sounding || !sounding.data) {
    return null;
  }

  const profile = sounding.data;

  return (
    <Flex direction='column' bg='dark' className={styles.soundingContainer}>
      <Flex direction='row' flex={1} justify='flex-end'>
        <ActionIcon
          size='lg'
          variant='filled'
          color={interactionMode === 'select' ? 'blue' : 'dark'}
          aria-label='Select'
          onClick={() => setInteractionMode('select')}
        >
          <LuMousePointerClick />
        </ActionIcon>
        <ActionIcon
          size='lg'
          variant='filled'
          color={interactionMode === 'pan' ? 'blue' : 'dark'}
          aria-label='Pan'
          onClick={() => setInteractionMode('pan')}
        >
          <AiOutlineDrag />
        </ActionIcon>
      </Flex>
      <Profiles profile={profile} interactive={!isMobile}>
        <Flex className={styles.soundingContent}>
          <SkewT mode={interactionMode}>
            <SkewT.ReferenceLines />
            <SkewT.ProfileData showParcel={parcel} />
          </SkewT>
          <Hodograph mode={interactionMode}>
            <Hodograph.ReferenceLines />
            <Hodograph.ProfileData />
          </Hodograph>
        </Flex>
        <SoundingParameters
          parcel={parcel}
          setParcel={setParcel}
          hideSelectedPoints={isMobile}
        />
      </Profiles>
    </Flex>
  );
}
