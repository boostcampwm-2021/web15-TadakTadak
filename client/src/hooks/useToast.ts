import { useToastDispatchContext, MessageType } from '@contexts/ToastContext';

type ReturnType = (type: MessageType, message: string) => void;

export function useToast(delay: number): ReturnType {
  const dispatch = useToastDispatchContext();

  function toast(type: MessageType, message: string) {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_TOAST',
      toast: {
        type,
        message,
        id,
      },
    });

    setTimeout(() => {
      dispatch({ type: 'DELETE_TOAST', id });
    }, delay);
  }

  return toast;
}
