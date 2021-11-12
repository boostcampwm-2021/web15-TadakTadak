import 'styled-components';

interface BorderRadius {
  sm: string;
  base: string;
  lg: string;
  xl: string;
  button?: string;
}

interface BtnSizes {
  sm: string;
  base: string;
  lg: string;
  xl: string;
}

interface Sizes {
  sm: string;
  base: string;
  lg: string;
  xl: string;
  title?: string;
}

interface Colors {
  bold: string;
  primary: string;
  secondary: string;
  tertiary: string;
  black: string;
  white: string;
  red: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: BorderRadius;
    buttonSizes: BtnSizes;
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
