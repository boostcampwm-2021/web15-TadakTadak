import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import UserContextProvider from '@contexts/userContext';
import { theme } from './styles/theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
