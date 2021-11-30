import { AiFillQuestionCircle } from 'react-icons/all';
import { TooltipTarget, TooltipBox, StyledTabInfo } from './style';

interface ToolTipProps {
  text?: string;
}

const TabInfo = ({ text }: ToolTipProps): JSX.Element => {
  return (
    <StyledTabInfo>
      <TooltipTarget>
        <AiFillQuestionCircle />
      </TooltipTarget>
      <TooltipBox>{text}</TooltipBox>
    </StyledTabInfo>
  );
};

export default TabInfo;
