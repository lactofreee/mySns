// src/components/modal/modalPortal.tsx
import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const modalRoot = document.getElementById("modal-portal") as HTMLElement;
  return createPortal(children, modalRoot);
};

export default ModalPortal;
