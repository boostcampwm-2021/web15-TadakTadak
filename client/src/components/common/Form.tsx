import React from 'react';
import styled, { css } from 'styled-components';
import { FORM } from '@utils/constant';

const StyledForm = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
  width: ${FORM.JOIN_WIDTH}rem;
  height: ${FORM.JOIN_HEIGHT}rem;
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ onSubmit, children }: FormProps): JSX.Element => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default Form;
