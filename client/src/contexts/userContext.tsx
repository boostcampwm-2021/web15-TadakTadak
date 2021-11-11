import React, { useContext, useState } from 'react';

export interface UserProps {
  id?: number;
  nickname?: string;
  email?: string;
  imageUrl?: string;
  introduction?: string;
  isSocial?: boolean;
  dev_field?: {
    id: number;
    name: string;
  };
  login?: boolean;
}

export interface UserFnProps {
  logUserIn: (newUser: UserProps) => void;
  logUserOut: () => void;
}

interface UserContextProps {
  user: UserProps;
  fn: UserFnProps;
}

const UserContext = React.createContext<UserContextProps>({
  user: {},
  fn: {
    logUserIn: () => {},
    logUserOut: () => {},
  },
});

const UserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const initialState = { login: false };
  const [user, setUser] = useState(initialState);
  const logUserIn = (newUser: UserProps) => setUser({ ...newUser, login: true });
  const logUserOut = () => setUser(initialState);

  return <UserContext.Provider value={{ user, fn: { logUserIn, logUserOut } }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserProps => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserFns = (): UserFnProps => {
  const { fn } = useContext(UserContext);
  return fn;
};

export default UserContextProvider;
