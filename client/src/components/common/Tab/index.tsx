import { StyledTab, TabProps } from './style';

const Tab = ({ text, isActive, onClick, children }: TabProps): JSX.Element => {
  return (
    <StyledTab isActive={isActive} onClick={onClick}>
      {text}
      {children}
    </StyledTab>
  );
};

export default Tab;
