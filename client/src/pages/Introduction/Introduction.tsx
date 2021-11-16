import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '@contexts/userContext';
import { useEffect } from 'react';
import FireAnimation from '@components/FireAnimation';

const IntroContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: ${({ theme }) => theme.paddings.base};
`;

const MainLink = styled(Link)`
  width: 30rem;
  height: 20rem;
  ${({ theme }) => theme.flexCenter};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  :hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Introduction = (props: { history: { push(url: string): void } }): JSX.Element => {
  const user = useUser();
  const { push } = props.history;

  useEffect(() => {
    if (user.login) {
      push('/main');
    }
  }, [user, push]);

  return (
    <IntroContainer>
      <FireAnimation />
      <MainLink to="/main">메인으로 가기</MainLink>
    </IntroContainer>
  );
};

export default Introduction;
