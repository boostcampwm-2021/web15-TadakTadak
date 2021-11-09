import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LoginModal from './LoginModal';
import { useUser, useUserFns } from '@contexts/userContext';
import { IoLogOutOutline } from 'react-icons/io5';
import Button from './Button';
import { setCookie } from '@utils/cookie';

const SIDEBAR_MIN_WIDTH = '33rem';

const SideBarContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: flex;
  flex-direction: column;
  width: 23vw;
  min-width: ${SIDEBAR_MIN_WIDTH};
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
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const UserInfoBtn = styled.button`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.primary};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.lg};
  `};
  width: 100%;
  text-align: center;
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SideBar: React.FC = () => {
  const [loginModal, setLoginModal] = useState(false);
  const user = useUser();
  const { logUserOut } = useUserFns();

  const onClickLoginBtn = () => setLoginModal(!loginModal);
  const onClickUserInfoBtn = () => {};
  const onClickLogoutBtn = () => {
    setCookie('access-token', '');
    logUserOut();
  };

  return (
    <SideBarContainer>
      {user?.nickname ? (
        <>
          <UserInfoBtn onClick={onClickUserInfoBtn}>사용자정보</UserInfoBtn>
          <Button icon={<IoLogOutOutline />} text={''} className={'Logout'} onClick={onClickLogoutBtn} />
        </>
      ) : (
        <LoginBtn onClick={onClickLoginBtn}>로그인</LoginBtn>
      )}
      {loginModal && <LoginModal modal={loginModal} setModal={setLoginModal} />}
    </SideBarContainer>
  );
};

export default SideBar;
