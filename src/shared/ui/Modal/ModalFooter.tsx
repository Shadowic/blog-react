import type { FC, ReactNode } from "react";

interface ModalFooterProps {
  children: ReactNode;
}

export const ModalFooter: FC<ModalFooterProps> = ({ children }) => {
  return <footer>{children}</footer>;
};
