import type { FC } from "react";
import { useModal } from "../shared/lib/context/ModalContext";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../shared/ui/Modal";

interface AboutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AboutModal: FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { isModalOpen, closeModal } = useModal();

  const modalIsOpen = isOpen !== undefined ? isOpen : isModalOpen;
  const handleClose = onClose || closeModal;

  return (
    <Modal isOpen={modalIsOpen} onClose={handleClose}>
      <ModalHeader>
        <h2>Modal header</h2>
      </ModalHeader>
      <ModalBody>
        <p>Modal body</p>
      </ModalBody>
      <ModalFooter>
        <p>Modal footer</p>
      </ModalFooter>
    </Modal>
  );
};
