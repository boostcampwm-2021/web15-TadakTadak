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
  xs?: string;
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
  black: string;
  white: string;
  bgWhite: string;
  bgGreen: string;
  blue: string;
  blue2: string;
  borderGrey: string;
  grey: string;
  green: string;
}

interface TagColors {
  'Front-end': string;
  'Back-end': string;
  IOS: string;
  Android: string;
  None: string;
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
    flexColumn: string;
    active: string;
    transition: string;
    tagColors: TagColors;
  }
}
