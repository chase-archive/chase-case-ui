import { Flex, Modal } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { Hodograph, ProfileProvider, SkewT } from 'upperair';
import { useGetSounding } from './api';

export function SoundingModal({ isDesktop }: { isDesktop: boolean }) {
  const [soundingCaseId, setSoundingCaseId] = useChaseCaseStore((state) => [
    state.soundingCaseId,
    state.setSoundingCaseId,
  ]);

  const onClose = () => setSoundingCaseId(null);

  const { data } = useGetSounding(soundingCaseId);

  if (!data) {
    return null;
  }

  return (
    <Modal opened={!!soundingCaseId} onClose={onClose} size='90%'>
      <ProfileProvider profile={data.data}>
        <Flex direction={isDesktop ? 'row' : 'column'} bg='dark'>
          <SkewT>
            <SkewT.ReferenceLines />
            <SkewT.ProfileData showParcel='ML' />
          </SkewT>
          <Hodograph>
            <Hodograph.ReferenceLines />
            <Hodograph.ProfileData />
          </Hodograph>
        </Flex>
      </ProfileProvider>
    </Modal>
  );
}
