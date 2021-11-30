import { memo, useContext } from 'react';
import ReactLoading from 'react-loading';
import { LoaderProps, LoaderWrap } from './style';
import { ThemeContext } from 'styled-components';

const Loader = ({ isWholeScreen = false }: LoaderProps): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  return (
    <LoaderWrap isWholeScreen={isWholeScreen}>
      <ReactLoading type="spin" color={themeContext.colors.blue2} />
    </LoaderWrap>
  );
};

export default memo(Loader);
