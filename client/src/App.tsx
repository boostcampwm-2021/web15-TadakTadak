import './styles/fonts.css';
import { useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import BGMContextProvider from './contexts/bgmContext';
import { useUser, useUserFns } from '@contexts/userContext';
import { getUserByToken } from '@src/apis';
import Introduction from '@pages/Introduction';
import Main from '@pages/Main';
import Tadak from '@pages/Tadak';
import CampFire from '@pages/Campfire';
import Profile from '@pages/Profile';

const App = (): JSX.Element => {
  const user = useUser();
  const { logUserIn } = useUserFns();

  const getUser = useCallback(async () => {
    const { data } = await getUserByToken();
    if (data) {
      logUserIn(data);
    }
  }, [logUserIn]);

  useEffect(() => {
    if (!user.login) {
      getUser();
    }
  }, [getUser, user]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/main" component={Main} />
          <Route path="/room/tadak" component={Tadak} />
          <BGMContextProvider>
            <Route path="/room/campfire" component={CampFire} />
          </BGMContextProvider>
          <Route path="/profile" component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
};

export default App;
