import { memo, MouseEvent } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

// Components
import { CustomModal } from '@/components';

interface ConfirmModalProps {
  isOpen: boolean;
  description: string;
  buttonLabel: string;
  title: string;
  onConfirm?: (event: MouseEvent<HTMLElement>) => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  description,
  buttonLabel,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => (
  <CustomModal isOpen={isOpen} onClose={onCancel} title={title}>
    <Box pb={30} textAlign="center">
      <Text size="xmd">{description}</Text>
      <Flex gap={5} justifyContent="space-between" mt={5}>
        <Button
          colorScheme="brand"
          aria-label="button-label"
          onClick={onConfirm}
          flex={1}
        >
          {buttonLabel}
        </Button>
        <Button
          aria-label="button-center"
          onClick={onCancel}
          variant="outline"
          borderColor="brand"
          flex={1}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  </CustomModal>
);

export default memo(ConfirmModal);
