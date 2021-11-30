import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import UserContextProvider from '@contexts/userContext';
import { ToastProvider } from '@contexts/toastContext';
import { theme } from './styles/theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ToastProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ToastProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
