import { IoMdClose } from 'react-icons/io';
import { ToastDiv, ToastDivRoom, ToastWrapper } from './style';
import { useToastDispatchContext, MessageType } from '@contexts/toastContext';
import { useTheme } from '@contexts/themeContext';

interface ToastProps {
  type: MessageType;
  message: string;
  id: string;
}

export default function Toast({ type, message, id }: ToastProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useToastDispatchContext();
  const onClickDispatch = () => {
    dispatch({ type: 'DELETE_TOAST', id });
  };
  return (
    <>
      {type === 'success' && (
        <ToastDiv>
          <ToastWrapper color="green">
            <div>{message}</div>
            <IoMdClose className="button" onClick={onClickDispatch} fill="white" />
          </ToastWrapper>
        </ToastDiv>
      )}
      {type === 'error' && (
        <ToastDiv>
          <ToastWrapper color="red">
            <div>{message}</div>
            <IoMdClose className="button" onClick={onClickDispatch} fill="white" />
          </ToastWrapper>
        </ToastDiv>
      )}
      {type === 'easterEgg' && (
        <ToastDiv>
          <ToastWrapper color={theme.colors.blue2}>
            <div>{message}</div>
            <IoMdClose className="button" onClick={onClickDispatch} fill="white" />
          </ToastWrapper>
        </ToastDiv>
      )}
      {type === 'easterEggRoom' && (
        <ToastDivRoom>
          <ToastWrapper color={theme.colors.blue2}>
            <div>{message}</div>
            <IoMdClose className="button" onClick={onClickDispatch} fill="white" />
          </ToastWrapper>
        </ToastDivRoom>
      )}
    </>
  );
}
