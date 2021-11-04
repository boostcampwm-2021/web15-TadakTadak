import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LoginModal from './LoginModal';

const SideBarContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: flex;
  flex-direction: column;
  width: 23vw;
  height: 100%;
  background-color: #21272e;
`;

const LoginBtn = styled.button`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.primary};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.lg};
  `};
  width: 100%;
  text-align: center;
`;

const SideBar: React.FC = () => {
  const [loginModal, setLoginModal] = useState(false);

  const onClick = () => setLoginModal(!loginModal);
  return (
    <SideBarContainer>
      <LoginBtn onClick={onClick}>로그인</LoginBtn>
      {loginModal && <LoginModal modal={loginModal} setModal={setLoginModal} />}
    </SideBarContainer>
  );
};

export default SideBar;
