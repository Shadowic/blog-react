import type { FC, ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode;
}

export const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return <div>{children}</div>;
};
