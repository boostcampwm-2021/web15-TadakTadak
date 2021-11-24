import { useContext } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';

export const useTheme = (): DefaultTheme => {
  const theme = useContext(ThemeContext);
  return theme;
};
