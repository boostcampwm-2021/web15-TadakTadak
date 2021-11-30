import styled, { css } from 'styled-components';

export interface LoaderProps {
  isWholeScreen?: boolean;
}

export const LoaderWrap = styled.div<LoaderProps>`
  ${({ theme }) => theme.flexCenter};
  width: 100%;
  height: 80%;
  ${({ isWholeScreen }) =>
    isWholeScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    `}
  text-align: center;
`;
