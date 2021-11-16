import styled from 'styled-components';
import { useUser } from '@contexts/userContext';
import { useEffect, useState } from 'react';
import FireAnimation from '@components/FireAnimation';

const IntroContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.paddings.base};
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
    <IntroContainer>
      <FireAnimation setFireOn={setFireOn} />
    </IntroContainer>
  );
};

export default Introduction;
