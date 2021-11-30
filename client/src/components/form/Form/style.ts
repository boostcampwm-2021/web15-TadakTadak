import styled, { css } from 'styled-components';

interface StyledFormProps {
  width: string;
  height: string;
}

export const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;
