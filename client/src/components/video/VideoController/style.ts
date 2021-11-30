import styled, { css } from 'styled-components';

export const ButtonContainer = styled.div`
  position: relative;
`;
export const Controls = styled.div`
  position: fixed;
  ${({ theme }) => css`
    ${theme.flexCenter}
    bottom: ${theme.margins.xl};
    left: 29rem;
    right: 0;
  `}
`;

export const Getout = styled.div`
  position: fixed;
  ${({ theme }) => css`
    top: ${theme.margins.xl};
    right: ${theme.margins.sm};
  `}
`;
