import { Box, Flex, Loader, Modal, Text } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { useGetCaseDetails } from './api';
import { TagList } from '../tags/TagList';
import { MediaSwiper } from './MediaSwiper';
import styles from './CasesDetails.module.css';

export function CaseDetailsModal() {
  const [selectedCaseId, setSelectedCaseId] = useChaseCaseStore((state) => [
    state.selectedCaseId,
    state.setSelectedCaseId,
  ]);
  const { data: caseDetails, isLoading } = useGetCaseDetails(selectedCaseId);

  const onClose = () => {
    setSelectedCaseId(null);
  };

  return (
    <Modal opened={!!selectedCaseId} onClose={onClose} size='90%'>
      {isLoading && !caseDetails ? (
        <Loader />
      ) : (
        <Flex direction='column' className={styles.caseDetailsContent} gap={15}>
          <Flex direction='row' gap={15} justify='center'>
            <Text size='xl' fw={700}>
              {caseDetails?.event_name}
            </Text>
            <TagList tags={caseDetails?.tags ?? []} />
          </Flex>
          <Box w='100%'>
            <MediaSwiper urls={caseDetails?.photo_video ?? []} />
          </Box>
        </Flex>
      )}
    </Modal>
  );
}
