import { Flex, Modal } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import {
  Hodograph,
  KinematicTable,
  LayersTable,
  ParametersTable,
  ParcelTable,
  ProfileProvider,
  SelectedPointsTable,
  SkewT,
} from 'upperair';
import { useGetSounding } from './api';
import styles from './SoundingModal.module.css';

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
    <Modal opened={!!soundingCaseId} onClose={onClose} size='85%'>
      <Flex direction='column' bg='dark'>
        <ProfileProvider profile={data.data}>
          <Flex direction={isDesktop ? 'row' : 'column'}>
            <SkewT interactive mode='pan'>
              <SkewT.ReferenceLines />
              <SkewT.ProfileData showParcel='ML' />
            </SkewT>
            <Hodograph interactive mode='pan'>
              <Hodograph.ReferenceLines />
              <Hodograph.ProfileData />
            </Hodograph>
          </Flex>
          <Flex
            className={styles.datatables}
            direction={isDesktop ? 'row' : 'column'}
          >
            <ParcelTable />
            <KinematicTable />
          </Flex>
          <Flex
            className={styles.datatables}
            direction={isDesktop ? 'row' : 'column'}
          >
            <Flex direction='column' flex={1}>
              <LayersTable />
              <ParametersTable />
            </Flex>
            <Flex flex={2}>
              <SelectedPointsTable />
            </Flex>
          </Flex>
        </ProfileProvider>
      </Flex>
    </Modal>
  );
}
