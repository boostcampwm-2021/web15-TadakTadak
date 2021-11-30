import React from 'react';
import { StyledButton } from './style';

interface CircleButtonProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  color?: string;
  onClick?: () => void;
}

const CircleButton = ({ text, icon, className, color, onClick }: CircleButtonProps): JSX.Element => {
  return (
    <StyledButton color={color} className={className} onClick={onClick}>
      {icon}
      {text}
    </StyledButton>
  );
};

export default CircleButton;
