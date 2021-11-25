import styled, { css } from 'styled-components';
import { SIDEBAR } from '@utils/styleConstant';

const SideBarContainer = styled.div`
  ${({ theme }) => css`
    ${theme.flexColumn};
    padding: ${theme.paddings.lg};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.borderGrey};
  `};
  position: fixed;
  left: 0;
  justify-content: space-between;
  width: ${SIDEBAR.minWidth};
  min-width: ${SIDEBAR.minWidth};
  height: ${SIDEBAR.height};
  z-index: 10;
`;

const SideBarTopMenus = styled.div``;

const SideBarBottomMenus = styled.div<{ bottomMenuHeight?: string }>`
  height: ${({ bottomMenuHeight }) => bottomMenuHeight};
`;

interface SideBarProps {
  topMenus: React.ReactNode;
  bottomMenus: React.ReactNode;
  bottomMenuHeight?: string;
}

const SideBar = ({ topMenus, bottomMenus, bottomMenuHeight }: SideBarProps): JSX.Element => {
  return (
    <SideBarContainer>
      <SideBarTopMenus>{topMenus}</SideBarTopMenus>
      <SideBarBottomMenus bottomMenuHeight={bottomMenuHeight}>{bottomMenus}</SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default SideBar;
