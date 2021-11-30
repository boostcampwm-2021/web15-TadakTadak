import styled from 'styled-components';

export const TooltipTarget = styled.span`
  cursor: pointer;
`;

export const TooltipBox = styled.div`
  position: absolute;
  top: calc(100% - 5px);
  left: calc(100% - 55px);
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  width: 200px;
  padding: 5px 5px;
  border-radius: 4px;
  z-index: 1;
  transition: visibility 0.3s, color 0.3s, background-color 0.3s, width 0.3s, padding 0.3s ease-in-out;
`;

export const StyledTabInfo = styled.span`
  margin-left: 1rem;
  vertical-align: middle;
  position: relative;

  & ${TooltipTarget}:hover + ${TooltipBox} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 8px 8px;

    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.8) rgba(0, 0, 0, 0.8);
    }
  }
`;
