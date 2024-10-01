import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #1D1D1D;
  padding: 20px;
  border-radius: 5px;
  max-width: 800px;
  max-height: 1000px;
  height: 100%;
  width: 100%;
`;

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode; // 자식 요소 타입
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement // modal-root가 필요
  );
};

export default Modal;
