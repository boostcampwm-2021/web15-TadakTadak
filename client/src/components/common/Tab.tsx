import styled, { css } from 'styled-components';
import React from 'react';

interface TabProps {
  text?: string;
  isActive: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const StyledTab = styled.div<TabProps>`
  ${({ theme }) => css`
    padding: ${theme.paddings.sm};
    font-size: ${theme.fontSizes.lg};
  `};
  width: 100%;
  text-align: center;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  background-color: transparent;
  ${(props) =>
    props.isActive &&
    css`
      border-bottom: 3px solid transparent;
      border-bottom: 3px solid ${props.theme.colors.blue};
    `}

  :hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }
  :active {
  }
  :focus {
  }
  :disabled {
  }
  transition: background-color 0.4s ease-in-out, border-color 0.3s ease-in-out;
`;

const Tab = ({ text, isActive, onClick, children }: TabProps): JSX.Element => {
  return (
    <StyledTab isActive={isActive} onClick={onClick}>
      {text}
      {children}
    </StyledTab>
  );
};

export default Tab;
