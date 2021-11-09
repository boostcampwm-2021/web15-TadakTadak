import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Introduction from '@pages/Introduction';
import Main from '@pages/Main';
import UserContextProvider from '@contexts/userContext';

const App = (): JSX.Element => {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Introduction} />
            <Route path="/main" component={Main} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
        <GlobalStyles />
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default App;
