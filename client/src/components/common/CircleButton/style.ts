import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 50%;
  font-family: 'Noto Sans KR', sans-serif;
  ${({ theme }) => css`
    margin: 0 ${theme.margins.lg};
    width: ${theme.buttonSizes.base};
    height: ${theme.buttonSizes.base};
    font-size: ${theme.fontSizes.xl};
    padding: ${theme.fontSizes.sm};
    background: ${theme.colors.blue};
    color: ${theme.colors.white};
    ${theme.flexCenter}
  `}
  &:hover {
    background: ${({ theme }) => theme.colors.blue2};
  }
  &:active {
    background: ${({ theme }) => theme.colors.blue2};
    transform: scale(0.9);
    transition: background 0.1s;
  }
  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
      &:hover,
      &:active {
        background-color: ${color};
        opacity: 0.7;
      }
    `}
  &:focus {
  }
  &:disabled {
  }
`;
