import React from 'react';
import styled from 'styled-components';

const MODAL_WIDTH = 60;
const MODAL_HEIGHT = 40;

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
  width: ${MODAL_WIDTH}rem;
  height: ${MODAL_HEIGHT}rem;
  top: 30vh;
  left: calc((100vw - ${MODAL_HEIGHT}rem) / 2 - ${MODAL_HEIGHT}rem / 4);
  position: absolute;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 5rem;
  z-index: 5;
  & input {
    margin-bottom: 10px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    padding: 15px;
  }
  & input::placeholder {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
  & button {
    width: 100%;
  }
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.margins.xl};
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
