import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
