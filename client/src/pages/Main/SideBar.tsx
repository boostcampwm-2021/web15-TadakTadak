import React, { useState } from 'react';
import LoginModal from '../../components/LoginModal';
import { useUser, useUserFns } from '@contexts/userContext';
import { SideBarContainer, LoginBtn, CreateBtn, SideBarTopMenus, SideBarBottomMenus, UserInfoBtn } from './style';
import { IoLogOutOutline } from 'react-icons/io5';
import Button from '../../components/Button';
import Modal from '@components/Modal';
import CreateForm from './CreateForm';
import { setCookie } from '@utils/cookie';

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
        <CreateBtn onClick={onClickCreateBtn}>방 생성하기</CreateBtn>
        {createModal && <Modal title="방 생성하기" children={<CreateForm />} setModal={setCreateModal} />}
      </SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default SideBar;
