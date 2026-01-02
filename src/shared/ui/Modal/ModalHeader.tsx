import type { FC, ReactNode } from "react";

interface ModalHeaderProps {
  children: ReactNode;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ children }) => {
  return <header>{children}</header>;
};
