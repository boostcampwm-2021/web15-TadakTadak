import 'styled-components';

interface Sizes {
  sm: string;
  base: string;
  lg: string;
  xl: string;
  title?: string;
}

interface Colors {
  primary: string;
  secondary: string;
  tertiary: string;
  black: string;
  white: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: Colors;
    margins: Sizes;
    paddings: Sizes;
    fontSizes: Sizes;
    fontWeights: {
      light: number;
      normal: number;
      bold: number;
    };
    flexCenter: string;
  }
}
