import React, { useContext, useState } from 'react';

const UserContext = React.createContext({
  user: {},
  logUserIn: (newUser: any) => {},
});

const UserContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState({});
  const logUserIn = (newUser: any) => setUser({ ...newUser, login: true });

  return <UserContext.Provider value={{ user, logUserIn }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserFns = () => {
  const { logUserIn } = useContext(UserContext);
  return logUserIn;
};

export default UserContextProvider;
