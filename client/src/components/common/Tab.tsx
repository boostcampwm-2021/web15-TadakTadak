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
  border-bottom: 3px solid transparent;
  ${(props) =>
    props.isActive &&
    css`
      border-bottom: 3px solid transparent;
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
  :after {
    border-bottom: solid 3px #019fb6;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  & div:hover:after {
    transform: scaleX(1);
  }
`;

const Tab = ({ text, isActive, onClick }: TabProps): JSX.Element => {
  return (
    <StyledTab isActive={isActive} onClick={onClick}>
      {text}
    </StyledTab>
  );
};

export default Tab;
