import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  borderRadius: {
    sm: '0.4rem',
    base: '1.0rem',
    lg: '2.0rem',
    xl: '3.0rem',
  },
  buttonSizes: {
    sm: '5rem',
    base: '7.5rem',
    lg: '10rem',
    xl: '15rem',
  },
  colors: {
    bold: '#009292',
    primary: '#ee7f6e',
    secondary: 'tomato',
    black: '#121212',
    white: `rgba(255,255,255,1)`,
    bgWhite: '#F1F1E6',
    bgGreen: '#1d4456',
    blue: '#51A9FE',
    blue2: '#1F90FF',
    grey: '#F5F8FA',
    borderGrey: '#D8DEE3',
    green: '#339933',
  },
  margins: {
    sm: '0.5rem',
    base: '1.0rem',
    lg: '2.0rem',
    xl: '3.0rem',
  },
  paddings: {
    sm: '.5rem',
    base: '1.0rem',
    lg: '2.0rem',
    xl: '3.0rem',
  },
  fontSizes: {
    sm: '1.4rem',
    base: '1.6rem',
    lg: '2.0rem',
    xl: '2.8rem',
    title: '3.2rem',
  },
  fontWeights: {
    light: 100,
    normal: 400,
    bold: 700,
  },
  flexCenter: `
    display:flex;
    justify-content:center;
    align-items:center;
  `,
};

export { theme };
