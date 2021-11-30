import React, { useContext, useState } from 'react';
import { UserInfoType } from '@src/types';

interface UserFnProps {
  logUserIn: (newUser: UserInfoType) => void;
  changeUserInfo: (newUser: UserInfoType) => void;
  logUserOut: () => void;
}

interface UserContextProps {
  user: UserInfoType;
  fn: UserFnProps;
}

const UserContext = React.createContext<UserContextProps>({
  user: {},
  fn: {
    logUserIn: () => {},
    logUserOut: () => {},
    changeUserInfo: () => {},
  },
});

const UserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const initialState = { login: false };
  const [user, setUser] = useState(initialState);
  const logUserIn = (newUser: UserInfoType) => setUser({ ...newUser, login: true });
  const changeUserInfo = (info: UserInfoType) =>
    setUser((prev) => {
      return { ...prev, ...info };
    });
  const logUserOut = () => setUser(initialState);

  return (
    <UserContext.Provider value={{ user, fn: { logUserIn, logUserOut, changeUserInfo } }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserInfoType => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserFns = (): UserFnProps => {
  const { fn } = useContext(UserContext);
  return fn;
};

export default UserContextProvider;
