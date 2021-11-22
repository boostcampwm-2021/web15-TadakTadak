import React, { useCallback, useContext, useState } from 'react';

export interface DevFieldProps {
  id: string;
  name: string;
}

export interface DevFieldFnProps {
  registerDevField: (newDevField: DevFieldProps[]) => void;
}

interface DevFieldContextProps {
  devField: DevFieldProps[];
  fn: DevFieldFnProps;
}

const DevFieldContext = React.createContext<DevFieldContextProps>({
  devField: [],
  fn: {
    registerDevField: () => {},
  },
});

const DevFieldContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [devField, setDevField] = useState<DevFieldProps[]>([]);
  const registerDevField = useCallback((newDevField: DevFieldProps[]) => setDevField([...newDevField]), []);

  return <DevFieldContext.Provider value={{ devField, fn: { registerDevField } }}>{children}</DevFieldContext.Provider>;
};

export const useDevField = (): DevFieldProps[] => {
  const { devField } = useContext(DevFieldContext);
  return devField;
};

export const useDevFieldFns = (): DevFieldFnProps => {
  const { fn } = useContext(DevFieldContext);
  return fn;
};

export default DevFieldContextProvider;
