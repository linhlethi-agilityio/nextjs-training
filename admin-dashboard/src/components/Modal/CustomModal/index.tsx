import { ReactNode, memo } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

interface CustomModalProps extends ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const CustomModalUI = ({
  isOpen,
  children,
  title,
  onClose,
  ...rest
}: CustomModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered {...rest}>
    <ModalOverlay />
    <ModalContent opacity={0.6}>
      <ModalHeader textAlign="center">{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
);

export const CustomModal = memo(CustomModalUI, isEqual);
