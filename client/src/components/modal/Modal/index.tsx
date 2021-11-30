import React from 'react';
import { Container, BlackBackground, Content, Title } from './style';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setModal, children, title }: ModalProps): JSX.Element => {
  const onClickBlackBackground = () => setModal(false);
  const onClickContent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();

  return (
    <Container>
      <BlackBackground onClick={onClickBlackBackground}>
        <Content onClick={onClickContent}>
          {title && <Title>{title}</Title>}
          {children}
        </Content>
      </BlackBackground>
    </Container>
  );
};

export default Modal;
