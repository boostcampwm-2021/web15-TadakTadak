import styled, { css } from 'styled-components';
import { MODAL } from '@utils/styleConstant';

export const Container = styled.div`
  width: 100%;
  top: ${MODAL.topPosition};
  display: block;
`;

export const BlackBackground = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 5rem 4rem 5rem;
  width: ${MODAL.width};
  height: ${MODAL.height};
  top: 20vh;
  left: calc((100vw - ${MODAL.width}) / 2);
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  z-index: 5;
  & input {
    ${({ theme }) => css`
      width: 100%;
      padding: ${theme.paddings.sm};
      border: 1px solid ${theme.colors.borderGrey};
      background-color: ${theme.colors.white};
      border-radius: ${theme.borderRadius.base};
      font-size: ${theme.fontSizes.lg};
      margin-top: ${theme.margins.sm};
    `}
  }
  & select {
    ${({ theme }) => css`
      width: 100%;
      padding: ${theme.paddings.sm};
      border: 1px solid ${theme.colors.borderGrey};
      background-color: ${theme.colors.white};
      border-radius: ${theme.borderRadius.base};
      font-size: ${theme.fontSizes.lg};
      margin-top: ${theme.margins.sm};
    `}
  }
  & button {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-top: ${({ theme }) => theme.margins.sm};
  }
  & button:hover {
    opacity: 0.8;
  }
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.margins.xl};
`;
