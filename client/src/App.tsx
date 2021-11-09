import { useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Introduction from '@pages/Introduction';
import Main from '@pages/Main';
import { useUser, useUserFns } from '@contexts/userContext';
import { getUserByToken } from '@utils/apis';

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
    if (!user?.nickname) {
      getUser();
    }
  }, [getUser, user]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/main" component={Main} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
};

export default App;
