import styled, { keyframes } from 'styled-components';
import { TOAST } from '@utils/styleConstant';

const boxFade = keyframes`
  0%{
    opacity: 0;
  }3%{
    opacity: 1;
  }100%{
    opacity: 0;
  }
`;

export const ToastDiv = styled.div`
  z-index: 100;
  background: transparent;
  ${({ theme }) => theme.flexCenter}
  position: absolute;
  width: ${TOAST.width};
  left: calc((100vw - ${TOAST.width}) / 2);
  top: ${TOAST.topPosition};
`;
export const ToastWrapper = styled.div`
  animation: ${boxFade} ${TOAST.second} ease-in-out;
  z-index: 100;
  position: relative;
  ${({ theme }) => theme.flexCenter}
  background-color: ${(props) => props.color};
  width: ${TOAST.width};
  height: ${TOAST.height};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  div {
    color: ${({ theme }) => theme.colors.grey};
  }
  .button {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;
