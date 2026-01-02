import { createContext } from "react";
import type { ReactNode } from "react";

export interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export interface ModalProviderProps {
  children: ReactNode;
}
