import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LoginModal from '../LoginModal';
import { useUser, useUserFns } from '@contexts/userContext';
import { IoLogOutOutline } from 'react-icons/io5';
import Button from '../Button';
import Modal from '@components/Modal';
import CreateForm from './CreateForm';
import { setCookie } from '@utils/cookie';

const SIDEBAR_MIN_WIDTH = '33rem';

const CreateBtn = styled.button`
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

const SideBarContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 23vw;
  min-width: ${SIDEBAR_MIN_WIDTH};
  height: 100%;
  background-color: #21272e;
`;

const SideBarTopMenus = styled.div``;

const SideBarBottomMenus = styled.div``;

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
  const [createModal, setCreateModal] = useState(false);
  const user = useUser();
  const { logUserOut } = useUserFns();

  const onClickLoginBtn = () => setLoginModal(!loginModal);
  const onClickCreateBtn = () => setCreateModal(true);
  const onClickUserInfoBtn = () => {};
  const onClickLogoutBtn = () => {
    setCookie('access-token', '');
    logUserOut();
  };

  return (
    <SideBarContainer>
      <SideBarTopMenus>
        {user.login ? (
          <>
            <UserInfoBtn onClick={onClickUserInfoBtn}>사용자정보</UserInfoBtn>
            <Button icon={<IoLogOutOutline />} text={''} className={'Logout'} onClick={onClickLogoutBtn} />
          </>
        ) : (
          <LoginBtn onClick={onClickLoginBtn}>로그인</LoginBtn>
        )}
      </SideBarTopMenus>
      {loginModal && <LoginModal modal={loginModal} setModal={setLoginModal} />}
      <SideBarBottomMenus>
        {user.login && <CreateBtn onClick={onClickCreateBtn}>방 생성하기</CreateBtn>}
        {createModal && <Modal title="방 생성하기" children={<CreateForm />} setModal={setCreateModal} />}
      </SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default SideBar;
