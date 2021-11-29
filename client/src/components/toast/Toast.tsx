import { useToastDispatchContext, MessageType } from '@contexts/ToastContext';
import styled, { keyframes } from 'styled-components';
import { TOAST } from '@utils/styleConstant';
import { MdDeleteForever } from 'react-icons/md';

interface ToastProps {
  type: MessageType;
  message: string;
  id: string;
}

const boxFade = keyframes`
  0%{
    opacity: 0;
  }3%{
    opacity: 1;
  }100%{
    opacity: 0;
  }
`;

const ToastDiv = styled.div`
  z-index: 100;
  ${({ theme }) => theme.flexCenter}
  position: absolute;
  left: 0;
  right: 0;
  top: ${TOAST.topPosition};
  animation: ${boxFade} ${TOAST.second} ease-in-out;
`;
const ToastWrapper = styled.div`
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

export default function Toast({ type, message, id }: ToastProps): JSX.Element {
  const dispatch = useToastDispatchContext();
  const onClickDispatch = () => {
    dispatch({ type: 'DELETE_TOAST', id });
  };
  return (
    <>
      {type == 'success' && (
        <ToastDiv>
          <ToastWrapper color="green">
            <div>{message}</div>
            <MdDeleteForever className="button" onClick={onClickDispatch} fill="white" />
          </ToastWrapper>
        </ToastDiv>
      )}
      {type == 'error' && (
        <ToastDiv>
          <ToastWrapper color="red">
            <div>{message}</div>
            <MdDeleteForever className="button" onClick={onClickDispatch} fill="white" />
          </ToastWrapper>
        </ToastDiv>
      )}
    </>
  );
}
