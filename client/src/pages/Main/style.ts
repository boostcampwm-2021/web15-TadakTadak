import styled, { css } from 'styled-components';

const SIDEBAR_MIN_WIDTH = '33rem';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const MainContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  height: 100%;
`;

export const MainTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const RoomListGrid = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 2rem;
`;

export const CreateBtn = styled.button`
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

export const SideBarContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 23vw;
  min-width: ${SIDEBAR_MIN_WIDTH};
  height: 100%;
  background-color: #21272e;
`;

export const SideBarTopMenus = styled.div``;

export const SideBarBottomMenus = styled.div``;

export const LoginBtn = styled.button`
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
