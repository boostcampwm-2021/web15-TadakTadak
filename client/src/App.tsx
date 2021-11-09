import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Introduction from '@pages/Introduction';
import Main from '@pages/Main';

const App = (): JSX.Element => {
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
