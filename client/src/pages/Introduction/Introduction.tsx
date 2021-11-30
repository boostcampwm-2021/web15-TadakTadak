import styled, { css } from 'styled-components';
import { useUser } from '@contexts/userContext';
import { useEffect, useState } from 'react';
import FireAnimation from '@src/components/FireAnimation';

interface IntroContainerProps {
  fireOn: boolean;
}

const IntroContainer = styled.div<IntroContainerProps>`
  ${({ theme }) => theme.flexCenter};
  position: fixed;
  left: 0;
  top: 0;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgGreen};
  ${(props) =>
    props.fireOn &&
    css`
      background-color: ${({ theme }) => theme.colors.bgWhite};
    `}
  transition: background-color 1500ms linear;
  padding: ${({ theme }) => theme.paddings.base};
  font-family: 'Dongle';
`;

const IntroTitle = styled.div`
  z-index: 2;
  color: white;
  font-size: 250px;
`;
const IntroDescription = styled.div`
  z-index: 2;
  color: white;
  font-size: 40px;
  margin-bottom: ${({ theme }) => theme.margins.xl};
`;
const IntroButtonDescription = styled.div`
  z-index: 2;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-top: 70px;
`;

const Introduction = (props: { history: { push(url: string): void } }): JSX.Element => {
  const user = useUser();
  const [fireOn, setFireOn] = useState(false);
  const { push } = props.history;

  useEffect(() => {
    if (user.login) {
      push('/main');
    }
  }, [user, push]);

  useEffect(() => {
    if (fireOn) {
      setTimeout(() => push('/main'), 1500);
    }
  }, [fireOn, push]);

  return (
    <IntroContainer fireOn={fireOn}>
      <IntroTitle>타닥타닥</IntroTitle>
      <IntroDescription>개발자들을 위한 아늑한 공간</IntroDescription>
      <FireAnimation setFireOn={setFireOn} />
      <IntroButtonDescription>모닥불을 피워 주세요</IntroButtonDescription>
    </IntroContainer>
  );
};

export default Introduction;
