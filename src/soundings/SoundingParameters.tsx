import { Flex } from '@mantine/core';
import {
  KinematicTable,
  LayersTable,
  ParametersTable,
  ParcelTable,
  ParcelType,
  SelectedPointsTable,
} from 'upperair';
import styles from './SoundingModal.module.css';
import { useRef } from 'react';

interface SoundingParamters {
  parcel: ParcelType;
  setParcel: (parcel: ParcelType) => void;
  isDesktop: boolean;
}

export function SoundingParameters({
  isDesktop,
  parcel,
  setParcel,
}: SoundingParamters) {
  const flexRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Flex
        className={styles.datatables}
        direction={isDesktop ? 'row' : 'column'}
      >
        <ParcelTable
          selectedParcelType={parcel}
          onSelectParcelType={setParcel}
        />
        <KinematicTable />
      </Flex>
      <Flex
        className={styles.datatables}
        direction={isDesktop ? 'row' : 'column'}
      >
        <Flex direction='column' flex={1} ref={flexRef}>
          <LayersTable />
          <ParametersTable />
        </Flex>
        <Flex
          flex={2}
          className={styles.selectedTableContainer}
          style={{
            overflowY: 'auto',
            maxHeight: flexRef?.current?.offsetHeight,
          }}
        >
          <SelectedPointsTable />
        </Flex>
      </Flex>
    </>
  );
}
