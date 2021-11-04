import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${({ theme }) => css`
    * {
      color: ${theme.colors.white};
    }
    body {
      background-color: ${theme.colors.black};
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
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button,
  input {
    outline: none;
    background-color:transparent;
    border:none;
  }
  button {
    cursor: pointer;
  }
  ul {
    -ms-overflow-style: none;
  }
  ul::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
