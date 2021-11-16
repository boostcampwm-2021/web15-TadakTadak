import React from 'react';
import styled, { css } from 'styled-components';

interface TabProps {
  text?: string;
  isActive: boolean;
  onClick?: () => void;
}

const StyledTab = styled.div<TabProps>`
  ${({ theme }) => css`
    padding: ${theme.paddings.sm};
    font-size: ${theme.fontSizes.lg};
  `};
  width: 100%;
  text-align: center;
  cursor: pointer;
  ${(props) =>
    props.isActive &&
    css`
      border-bottom: 3px solid ${props.theme.colors.blue};
      background-color: ${props.theme.colors.grey};
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
`;

const Tab: React.FC<TabProps> = (props) => {
  const { text, isActive, onClick } = props;
  return (
    <StyledTab isActive={isActive} onClick={onClick}>
      {text}
    </StyledTab>
  );
};

export default Tab;
