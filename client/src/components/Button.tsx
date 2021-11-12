import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  color?: string;
  onClick?: () => void;
}

const StyledButton = styled.button`
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
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    ${theme.flexCenter}
  `}
  &:hover {
    background: ${({ theme }) => theme.colors.bold};
  }
  &:active {
    background: ${({ theme }) => theme.colors.secondary};
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

const Button: React.FC<ButtonProps> = (props) => {
  const { text, icon, className, color, onClick } = props;
  return (
    <StyledButton color={color} className={className} onClick={onClick}>
      {icon}
      {text}
    </StyledButton>
  );
};

export default Button;
