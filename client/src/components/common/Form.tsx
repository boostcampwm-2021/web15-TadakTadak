import React from 'react';
import styled, { css } from 'styled-components';

interface FormProps {
  width: string;
  height: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StyledForm = styled.form<FormProps>`
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

const Form = ({ onSubmit, width, height, children }: FormProps): JSX.Element => {
  return (
    <StyledForm onSubmit={onSubmit} width={width} height={height}>
      {children}
    </StyledForm>
  );
};

export default Form;
