import { Flex, Modal, ActionIcon } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { Hodograph, ParcelType, ProfileProvider, SkewT } from 'upperair';
import { useGetSounding } from './api';
import { useState } from 'react';
import { LuMousePointerClick } from 'react-icons/lu';
import { AiOutlineDrag } from 'react-icons/ai';
import { TbCancel } from 'react-icons/tb';
import { SoundingParameters } from './SoundingParameters';

export function SoundingModal({ isDesktop }: { isDesktop: boolean }) {
  const [soundingCaseId, setSoundingCaseId] = useChaseCaseStore((state) => [
    state.soundingCaseId,
    state.setSoundingCaseId,
  ]);

  const [parcel, setParcel] = useState<ParcelType>('ML');
  const [interactioneMode, setInteractionMode] = useState<
    'none' | 'pan' | 'select'
  >('none');

  const onClose = () => setSoundingCaseId(null);

  const { data } = useGetSounding(soundingCaseId);

  if (!data) {
    return null;
  }

  const interactionProps = {
    interactive: interactioneMode !== 'none',
    mode: interactioneMode === 'none' ? undefined : interactioneMode,
  };

  return (
    <Modal opened={!!soundingCaseId} onClose={onClose} size='85%'>
      <Flex direction='column' bg='dark'>
        <Flex direction='row' flex={1} justify='flex-end'>
          <ActionIcon
            size='lg'
            color='dark'
            aria-label='Remove interactivity'
            onClick={() => setInteractionMode('none')}
          >
            <TbCancel />
          </ActionIcon>
          <ActionIcon
            size='lg'
            color='dark'
            aria-label='Select'
            onClick={() => setInteractionMode('select')}
          >
            <LuMousePointerClick />
          </ActionIcon>
          <ActionIcon
            size='lg'
            color='dark'
            aria-label='Pan'
            onClick={() => setInteractionMode('pan')}
          >
            <AiOutlineDrag />
          </ActionIcon>
        </Flex>
        <ProfileProvider profile={data.data}>
          <Flex direction={isDesktop ? 'row' : 'column'}>
            <SkewT {...interactionProps}>
              <SkewT.ReferenceLines />
              <SkewT.ProfileData showParcel={parcel} />
            </SkewT>
            <Hodograph {...interactionProps}>
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
