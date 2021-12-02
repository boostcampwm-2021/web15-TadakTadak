import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { DevFieldType } from '@src/types';
import { USER_AVATAR, SIDEBAR } from '@utils/styleConstant';

export const MakeRoomBtn = styled.button`
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

export const LoginBtn = styled.button`
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

export const UserInfo = styled.div`
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

export const LogoutBtn = styled.button`
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

export const UserAvatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: ${USER_AVATAR.width};
  height: ${USER_AVATAR.height};
  border-radius: 50%;
  overflow: hidden;
`;

export const UserNickname = styled.div`
  max-width: ${SIDEBAR.userNicknameMaxWidth};
`;

export const UserDevField = styled.div<{ bgColor: DevFieldType }>`
  ${({ theme, bgColor }) => css`
    margin-left: ${theme.margins.base};
    background-color: ${theme.tagColors[bgColor]};
    padding: ${theme.paddings.xs};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

export const MainLink = styled(Link)`
  width: 100%;
  height: ${USER_AVATAR.width};
  ${({ theme }) => theme.flexCenter};
  & span {
    margin-right: 2rem;
    margin-left: 1.3rem;
  }
`;
