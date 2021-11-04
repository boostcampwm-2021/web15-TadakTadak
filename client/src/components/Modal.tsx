import React from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 100%;
  top: -15vh;
  display: block;
`;

export const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

export const ModalWrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  padding: 2rem 2rem 1.5rem 2rem;
  width: 50vw;
  height: 40vh;
  top: 30vh;
  left: 25vw;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 1rem;
  z-index: 5;
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

interface ModalProps {
  title?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setModal, children, title }) => {
  const onClickModalBackground = () => setModal(false);
  return (
    <ModalContainer>
      <ModalBackground onClick={onClickModalBackground}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          {title && <Title>{title}</Title>}
          {children}
        </ModalWrapper>
      </ModalBackground>
    </ModalContainer>
  );
};

export default Modal;
