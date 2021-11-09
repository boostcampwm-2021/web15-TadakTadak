import React, { useState } from 'react';
import { SideBarContainer, LoginBtn, CreateBtn, SideBarTopMenus, SideBarBottomMenus } from './style';
import LoginModal from '@components/LoginModal';
import Modal from '@components/Modal';
import CreateForm from './CreateForm';

const SideBar: React.FC = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const onClick = () => setLoginModal(!loginModal);
  const onClickCreateBtn = () => setCreateModal(true);
  return (
    <SideBarContainer>
      <SideBarTopMenus>
        <LoginBtn onClick={onClick}>로그인</LoginBtn>
        {loginModal && <LoginModal modal={loginModal} setModal={setLoginModal} />}
      </SideBarTopMenus>
      <SideBarBottomMenus>
        <CreateBtn onClick={onClickCreateBtn}>방 생성하기</CreateBtn>
        {createModal && <Modal title="방 생성하기" children={<CreateForm />} setModal={setCreateModal} />}
      </SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default SideBar;
