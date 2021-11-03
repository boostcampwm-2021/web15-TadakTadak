import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 16px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button,
  input {
    outline: none;
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
