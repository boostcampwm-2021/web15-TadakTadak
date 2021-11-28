import { memo, useContext } from 'react';
import ReactLoading from 'react-loading';
import styled, { css } from 'styled-components';
import { ThemeContext } from 'styled-components';

interface LoaderProps {
  isWholeScreen?: boolean;
}

const LoaderWrap = styled.div<LoaderProps>`
  ${({ theme }) => theme.flexCenter};
  width: 100%;
  height: 80%;
  ${({ isWholeScreen }) =>
    isWholeScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    `}
  text-align: center;
`;

const Loader = ({ isWholeScreen = false }: LoaderProps): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  return (
    <LoaderWrap isWholeScreen={isWholeScreen}>
      <ReactLoading type="spin" color={themeContext.colors.blue2} />
    </LoaderWrap>
  );
};

export default memo(Loader);
