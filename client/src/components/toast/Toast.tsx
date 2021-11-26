import { useToastDispatchContext, MessageType } from '@contexts/ToastContext';
import styled from 'styled-components';

interface ToastProps {
  type: MessageType;
  message: string;
  id: string;
}

const ToastDiv = styled.div`
  z-index: 100;
  position: absolute;
  background-color: #333;
`;

export default function Toast({ type, message, id }: ToastProps): JSX.Element {
  const dispatch = useToastDispatchContext();
  return (
    <>
      {type == 'success' && (
        <ToastDiv>
          <div>{message}</div>
          <button
            onClick={() => {
              dispatch({ type: 'DELETE_TOAST', id });
            }}>
            xxx
          </button>
        </ToastDiv>
      )}
      {type == 'error' && (
        <ToastDiv>
          <div>{message}</div>
          <button
            onClick={() => {
              dispatch({ type: 'DELETE_TOAST', id });
            }}>
            xxx
          </button>
        </ToastDiv>
      )}
    </>
  );
}
