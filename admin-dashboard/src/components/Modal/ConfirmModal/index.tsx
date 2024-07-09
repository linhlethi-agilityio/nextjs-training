import { memo, MouseEvent } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

// Components
import { CustomModal } from '@/components';

interface ConfirmModalProps {
  isOpen: boolean;
  description: string;
  buttonLabel: string;
  title: string;
  isLoading?: boolean;
  onConfirm?: (event: MouseEvent<HTMLElement>) => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  description,
  buttonLabel,
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => (
  <CustomModal isOpen={isOpen} onClose={onCancel} title={title}>
    <Box pb={30} textAlign="center">
      <Text size="xmd">{description}</Text>
      <Flex gap={5} justifyContent="space-between" mt={5}>
        <Button
          isLoading={isLoading}
          colorScheme="brand"
          aria-label="button-label"
          onClick={onConfirm}
          flex={1}
        >
          {buttonLabel}
        </Button>
        <Button
          isLoading={isLoading}
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
