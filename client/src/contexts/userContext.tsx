import React, { useContext, useState } from 'react';

export interface UserProps {
  user_id?: number;
  nickname?: string;
  email?: string;
  imageUrl?: string;
  introduction?: string;
  is_social?: boolean;
  dev_field?: {
    id: number;
    name: string;
  };
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
    logUserIn: (newUser: UserProps) => {},
    logUserOut: () => {},
  },
});

const UserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState({});
  const logUserIn = (newUser: UserProps) => setUser({ ...newUser, login: true });
  const logUserOut = () => setUser({});

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
