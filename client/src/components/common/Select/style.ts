import styled, { css } from 'styled-components';

export const StyledSelect = styled.select`
  width: 100%;
  height: 4rem;
  font-family: 'Dongle', sans-serif;
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.bold};
    padding: ${theme.paddings.sm};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
    background-color: ${theme.colors.white};
    ${theme.flexCenter}
  `}
  &:hover {
  }
  &:active {
  }
  &:focus {
  }
  &:disabled {
  }
`;
