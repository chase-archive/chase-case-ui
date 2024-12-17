import { Flex, Modal, ActionIcon } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import {
  InteractionMode,
  Hodograph,
  ParcelType,
  ProfileProvider,
  SkewT,
  useResetSelection,
} from 'upperair';
import { useGetSounding } from './api';
import { useState } from 'react';
import { LuMousePointerClick } from 'react-icons/lu';
import { AiOutlineDrag } from 'react-icons/ai';
import { SoundingParameters } from './SoundingParameters';

export function SoundingModal({ isDesktop }: { isDesktop: boolean }) {
  const [soundingCaseId, setSoundingCaseId] = useChaseCaseStore((state) => [
    state.soundingCaseId,
    state.setSoundingCaseId,
  ]);

  const [parcel, setParcel] = useState<ParcelType>('ML');
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>('select');

  const resetSelection = useResetSelection();

  const onClose = () => {
    setSoundingCaseId(null);
    resetSelection();
  };

  const { data } = useGetSounding(soundingCaseId);

  if (!data) {
    return null;
  }

  return (
    <Modal opened={!!soundingCaseId} onClose={onClose} size='90%'>
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
        <ProfileProvider profile={data.data}>
          <Flex direction={isDesktop ? 'row' : 'column'}>
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
            isDesktop={isDesktop}
            parcel={parcel}
            setParcel={setParcel}
          />
        </ProfileProvider>
      </Flex>
    </Modal>
  );
}
