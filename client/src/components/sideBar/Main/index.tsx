import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoHomeOutline, IoLogOutOutline } from 'react-icons/io5';
import { UserInfo, LoginBtn, MakeRoomBtn, UserAvatar, UserNickname, UserDevField, MainLink, LogoutBtn } from './style';
import MakeRoomForm from '@components/form/MakeRoom';
import LoginModal from '@components/modal/Login';
import SideBar from '@components/sideBar/SideBar';
import Modal from '@components/modal/Modal';
import { useUser, useUserFns } from '@contexts/userContext';
import { useDevFieldFns } from '@contexts/devFieldContext';
import { useToast } from '@hooks/useToast';
import { getDevField, postLogout } from '@src/apis';
import { PAGE_NAME, PATH, TOAST_MESSAGE } from '@utils/constant';

interface SideBarProps {
  page?: string;
}

const MainSideBar = ({ page }: SideBarProps): JSX.Element => {
  const [loginModal, setLoginModal] = useState(false);
  const [makeRoomModal, setMakeRoomModal] = useState(false);
  const user = useUser();
  const toast = useToast();
  const { logUserOut } = useUserFns();
  const history = useHistory();
  const { registerDevField } = useDevFieldFns();

  const onClickLoginBtn = () => setLoginModal(!loginModal);
  const onClickMakeRoomBtn = () => setMakeRoomModal(true);
  const onClickUserInfoBtn = () => history.push(PATH.profile);
  const onClickLogoutBtn = async () => {
    const { isOk } = await postLogout();
    if (isOk) {
      logUserOut();
      if (history.location.pathname === PATH.profile) location.href = PATH.main;
      toast('success', TOAST_MESSAGE.logoutSuccess);
    }
  };

  useEffect(() => {
    async function initDevField() {
      const { isOk, data } = await getDevField();
      if (isOk && data) {
        const changeToSelectData = data.map((obj) => {
          const newObj = {
            value: obj.id,
            label: obj.name,
          };
          return newObj;
        });
        registerDevField(changeToSelectData);
      }
    }
    initDevField();
  }, [registerDevField]);

  return (
    <SideBar
      topMenus={
        user.login ? (
          <>
            {page === PAGE_NAME.main ? (
              <UserInfo onClick={onClickUserInfoBtn}>
                <UserAvatar src={user.imageUrl}></UserAvatar>
                <UserNickname>{user.nickname}</UserNickname>
                <UserDevField bgColor={user?.devField?.name ?? 'None'}>{user?.devField?.name}</UserDevField>
              </UserInfo>
            ) : (
              <UserInfo>
                <MainLink to={PATH.main}>
                  <span>메인</span>
                  <IoHomeOutline />
                </MainLink>
              </UserInfo>
            )}
            <LogoutBtn onClick={onClickLogoutBtn}>
              <span>로그아웃</span>
              <IoLogOutOutline />
            </LogoutBtn>
          </>
        ) : (
          <>
            <LoginBtn onClick={onClickLoginBtn}>로그인</LoginBtn>
            {loginModal && <LoginModal modal={loginModal} setModal={setLoginModal} />}
          </>
        )
      }
      bottomMenus={
        <>
          {user.login && <MakeRoomBtn onClick={onClickMakeRoomBtn}>방 생성하기</MakeRoomBtn>}
          {makeRoomModal && <Modal title="방 생성하기" children={<MakeRoomForm />} setModal={setMakeRoomModal} />}
        </>
      }
    />
  );
};

export default MainSideBar;
