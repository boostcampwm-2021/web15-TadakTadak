import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  onClick?: () => void;
}

const StyledButton = styled.button`
  margin: 0;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  font-family: 'Noto Sans KR', sans-serif;
  ${({ theme }) => css`
    width: ${theme.buttonSizes.lg};
    height: ${theme.buttonSizes.lg};
    font-size: ${theme.fontSizes.xl};
    padding: ${theme.fontSizes.sm};
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    ${theme.flexCenter}
  `}
  &:active {
    background: ${({ theme }) => theme.colors.secondary};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
  }
  &:focus {
  }
  &:disabled {
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
  const { text, icon, className, onClick } = props;
  return (
    <StyledButton className={className} onClick={onClick}>
      {icon}
      {text}
    </StyledButton>
  );
};

export default Button;
