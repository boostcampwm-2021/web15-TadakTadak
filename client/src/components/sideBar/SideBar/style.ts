import styled, { css } from 'styled-components';
import { SIDEBAR } from '@utils/styleConstant';

export const Container = styled.div<{ bgColor?: string; borderColor?: string }>`
  ${({ theme, bgColor, borderColor }) => css`
    ${theme.flexColumn};
    padding: ${theme.paddings.base};
    background-color: ${bgColor || theme.colors.white};
    border: 1px solid ${borderColor || theme.colors.borderGrey};
  `};
  position: fixed;
  left: 0;
  justify-content: space-between;
  width: ${SIDEBAR.minWidth};
  min-width: ${SIDEBAR.minWidth};
  height: ${SIDEBAR.height};
  z-index: ${SIDEBAR.zIndex};
`;

export const TopMenus = styled.div``;

export const BottomMenus = styled.div<{ bottomMenuHeight?: string }>`
  height: ${({ bottomMenuHeight }) => bottomMenuHeight};
`;
