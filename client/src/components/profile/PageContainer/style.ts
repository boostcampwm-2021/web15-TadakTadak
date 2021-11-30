import styled, { css } from 'styled-components';
import { CANVAS } from '@utils/constant';
import { PAGE_TITLE, PROFILE } from '@utils/styleConstant';

export const Wrapper = styled.div`
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  height: ${PROFILE.containerHeight};
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
  :last-child {
    margin-top: ${({ theme }) => theme.margins.base};
  }
`;

export const Title = styled.h1`
  height: ${PAGE_TITLE.profileHeight};
  font-size: ${PAGE_TITLE.profileFontSize};
  color: ${({ theme }) => theme.colors.bgGreen};
`;

export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export const InfoContainer = styled.div`
  ${({ theme }) => theme.flexColumn};
  justify-content: space-between;
  width: 100%;
  margin-right: 4rem;
`;

export const InfoSet = styled.fieldset`
  width: 100%;
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.base};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
    ${theme.flexCenter};
  `};
`;

export const Legend = styled.legend`
  font-size: ${CANVAS.legendFontSize};
  color: ${({ theme }) => theme.colors.bgGreen};
`;
