import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${({ theme }) => css`
    * {
      color: ${theme.colors.black};
    }
    body {
      background-color: ${theme.colors.bgWhite};
      font-size: ${theme.fontSizes.base};
      font-weight: ${theme.fontWeights.normal};
      height: 100vh;
    }
  `}
  * {
    box-sizing: border-box;
  }
  html{
    font-size : 62.5%; // 1rem === 10px
  }
  body {
    font-family: 'Dongle';
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button,
  input,
  select {
    outline: none;
    background-color:transparent;
    border:none;
    font-family: 'Dongle', sans-serif;
  }
  button {
    cursor: pointer;
    border:1px solid rgba(0,0,0,0.2);
  }
  ul {
    -ms-overflow-style: none;
  }
  ul::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
