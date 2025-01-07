import { ActionIcon, Flex } from '@mantine/core';
import { LuMousePointerClick } from 'react-icons/lu';
import {
  Hodograph,
  InteractionMode,
  ParcelType,
  ProfileProvider,
  SkewT,
} from 'upperair';
import 'upperair/core.css';
import 'upperair/tables.css';
import { useState } from 'react';
import { AiOutlineDrag } from 'react-icons/ai';
import { SoundingParameters } from './SoundingParameters';
import { useGetSounding } from './api';

interface SoundingViewerProps {
  caseId: string;
}

export function SoundingViewer({ caseId }: SoundingViewerProps) {
  const { data: sounding } = useGetSounding(caseId);
  const [parcel, setParcel] = useState<ParcelType>('ML');
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>('select');

  if (!sounding || !sounding.data) {
    return null;
  }

  const profile = sounding.data;

  return (
    <Flex direction='column' bg='dark'>
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
      <ProfileProvider profile={profile}>
        <Flex direction='row'>
          <SkewT interactive mode={interactionMode}>
            <SkewT.ReferenceLines />
            <SkewT.ProfileData showParcel={parcel} />
          </SkewT>
          <Hodograph interactive mode={interactionMode}>
            <Hodograph.ReferenceLines />
            <Hodograph.ProfileData />
          </Hodograph>
        </Flex>
        <SoundingParameters
          isDesktop={true}
          parcel={parcel}
          setParcel={setParcel}
        />
      </ProfileProvider>
    </Flex>
  );
}
