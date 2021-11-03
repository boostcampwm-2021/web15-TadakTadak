import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './pages/Login';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
