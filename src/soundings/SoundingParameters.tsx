import { Flex } from '@mantine/core';
import {
  KinematicTable,
  LayersTable,
  ParametersTable,
  ParcelTable,
  ParcelType,
  SelectedPointsTable,
} from 'upperair';
import styles from './Soundings.module.css';
import { useEffect, useRef, useState } from 'react';

interface SoundingParametersProps {
  parcel: ParcelType;
  setParcel: (parcel: ParcelType) => void;
  hideSelectedPoints?: boolean;
}

export function SoundingParameters({
  parcel,
  setParcel,
  hideSelectedPoints,
}: SoundingParametersProps) {
  const [tblMaxHght, setTblMaxHght] = useState<number | null>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flexRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      if (flexRef.current?.offsetHeight !== tblMaxHght) {
        setTblMaxHght(flexRef.current?.offsetHeight ?? null);
      }
    });
    resizeObserver.observe(flexRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [tblMaxHght]);

  return (
    <>
      <Flex className={styles.datatables}>
        <ParcelTable
          selectedParcelType={parcel}
          onSelectParcelType={setParcel}
        />
        <KinematicTable />
      </Flex>
      <Flex className={styles.datatables} ref={flexRef}>
        <Flex direction='column' flex={1}>
          <LayersTable />
          <ParametersTable />
        </Flex>
        {!hideSelectedPoints && (
          <Flex
            flex={2}
            className={styles.selectedTableContainer}
            style={{
              overflowY: 'auto',
              maxHeight: tblMaxHght ? `${tblMaxHght}px` : 'auto',
            }}
          >
            <SelectedPointsTable />
          </Flex>
        )}
      </Flex>
    </>
  );
}
