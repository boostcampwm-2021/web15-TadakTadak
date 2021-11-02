import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
