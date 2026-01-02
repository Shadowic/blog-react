import { useState } from "react";
import type { FC } from "react";
import { ModalContext } from "./ModalContext";
import type { ModalProviderProps } from "./ModalContext";

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
