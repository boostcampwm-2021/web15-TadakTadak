import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import LoginModal from '../LoginModal';
import { useUser, useUserFns } from '@contexts/userContext';
import { IoHomeOutline, IoLogOutOutline } from 'react-icons/io5';
import SideBar from '@components/common/SideBar';
import Modal from '@components/common/Modal';
import CreateForm from './CreateForm';
import { Link, useHistory } from 'react-router-dom';
import { getDevField, postLogout } from '@src/apis';
import { FieldName } from '@contexts/userContext';
import { useDevFieldFns } from '@contexts/devFieldContext';
import { PAGE_NAME, PATH, TOAST_MESSAGE, TOAST_TIME } from '@utils/constant';
import { USER_AVATAR } from '@utils/styleConstant';
import { useToast } from '@src/hooks/useToast';

const CreateBtn = styled.button`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.borderGrey};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.lg};
  `};
  width: 100%;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgGreen};
    color: ${({ theme }) => theme.colors.white};
  }
  ${({ theme }) => theme.active};
`;

const LoginBtn = styled.button`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.borderGrey};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.xl};
  `};
  width: 100%;
  text-align: center;
  :hover {
    background-color: ${({ theme }) => theme.colors.bgGreen};
    color: ${({ theme }) => theme.colors.white};
  }
  ${({ theme }) => theme.active};
  ${({ theme }) => theme.transition};
`;

const UserInfoDiv = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.borderGrey};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.lg};
    ${theme.flexCenter};
  `};
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.bgGreen};
    color: ${({ theme }) => theme.colors.white};
  }
  ${({ theme }) => theme.active};
  ${({ theme }) => theme.transition};
`;

const LogoutBtn = styled.button`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.borderGrey};
    margin-top: ${theme.margins.lg};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.lg};
  `};
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  ${({ theme }) => theme.active};
  & span {
    margin-right: 2rem;
  }
  ${({ theme }) => theme.transition};
`;

const UserAvatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: ${USER_AVATAR.width};
  height: ${USER_AVATAR.height};
  border-radius: 50%;
  overflow: hidden;
`;

const UserNickname = styled.span``;

const UserDevField = styled.div<{ bgColor: FieldName }>`
  ${({ theme, bgColor }) => css`
    margin-left: ${theme.margins.base};
    background-color: ${theme.tagColors[bgColor]};
    padding: ${theme.paddings.xs};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

const MainLink = styled(Link)`
  width: 100%;
  height: ${USER_AVATAR.width};
  ${({ theme }) => theme.flexCenter};
  & span {
    margin-right: 2rem;
    margin-left: 1.3rem;
  }
`;

interface SideBarProps {
  page?: string;
}

const MainSideBar = ({ page }: SideBarProps): JSX.Element => {
  const [loginModal, setLoginModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const user = useUser();
  const toast = useToast();
  const { logUserOut } = useUserFns();
  const history = useHistory();
  const { registerDevField } = useDevFieldFns();

  const onClickLoginBtn = () => setLoginModal(!loginModal);
  const onClickCreateBtn = () => setCreateModal(true);
  const onClickUserInfoBtn = () => {
    history.push(PATH.profile);
  };
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
              <UserInfoDiv onClick={onClickUserInfoBtn}>
                <UserAvatar src={user.imageUrl}></UserAvatar>
                <UserNickname>{user.nickname}</UserNickname>
                <UserDevField bgColor={user?.devField?.name ?? 'None'}>{user?.devField?.name}</UserDevField>
              </UserInfoDiv>
            ) : (
              <UserInfoDiv>
                <MainLink to={PATH.main}>
                  <span>메인</span>
                  <IoHomeOutline />
                </MainLink>
              </UserInfoDiv>
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
          {user.login && <CreateBtn onClick={onClickCreateBtn}>방 생성하기</CreateBtn>}
          {createModal && <Modal title="방 생성하기" children={<CreateForm />} setModal={setCreateModal} />}
        </>
      }
    />
  );
};

export default MainSideBar;
