import React, { createContext, useReducer, useContext, Dispatch } from 'react';

export type ActionType = 'ADD_TOAST' | 'DELETE_TOAST';
export type MessageType = 'success' | 'error';
interface Toast {
  id: string;
  message: string;
  type: MessageType;
}
interface State {
  toasts: Toast[];
}
type Action = { type: 'ADD_TOAST'; toast: Toast } | { type: 'DELETE_TOAST'; id: string };
type InitDispatch = Dispatch<Action>;

const initialState = {
  toasts: [],
};

const ToastStateContext = createContext<State>(initialState);
const ToastDispatchContext = createContext<InitDispatch>(() => null);

function ToastReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    }
    case 'DELETE_TOAST': {
      const updatedToasts = state.toasts.filter((e) => e.id != action.id);
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      throw new Error('unhandled action');
    }
  }
}

interface ToastProviderProps {
  children: React.ReactNode;
}
export function ToastProvider({ children }: ToastProviderProps) {
  const [state, dispatch] = useReducer(ToastReducer, initialState);

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>{children}</ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

export const useToastStateContext = (): State => useContext(ToastStateContext);
export const useToastDispatchContext = (): InitDispatch => useContext(ToastDispatchContext);
