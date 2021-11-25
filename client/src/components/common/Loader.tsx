import { memo, useContext } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Loader = (): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color={themeContext.colors.blue2} />
    </LoaderWrap>
  );
};

export default memo(Loader);
