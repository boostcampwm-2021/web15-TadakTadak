import React from 'react';
import { StyledForm } from './style';

interface FormProps {
  width: string;
  height: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ onSubmit, width, height, children }: FormProps): JSX.Element => {
  return (
    <StyledForm onSubmit={onSubmit} width={width} height={height}>
      {children}
    </StyledForm>
  );
};

export default Form;
