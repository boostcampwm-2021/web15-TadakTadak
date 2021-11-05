import styled from 'styled-components';

const IntroContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  padding: ${({ theme }) => theme.paddings.base};
`;

const IntroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.title};
  margin-bottom: ${({ theme }) => theme.margins.lg};
`;

const TitleText = styled.span`
  color: ${(props) => props.color};
`;

const MainBtn = styled.button`
  width: 30rem;
  height: 20rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  :hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Introduction = (props: {
  history: {
    push(url: string): void;
  };
}): JSX.Element => {
  console.log(props);
  const onClick = () => props.history.push('/main');
  return (
    <IntroContainer>
      <IntroTitle>
        <TitleText color={'red'}>타</TitleText>
        <TitleText color={'orange'}>닥</TitleText>
        <TitleText color={'red'}>타</TitleText>
        <TitleText color={'yellow'}>닥</TitleText> 🔥
      </IntroTitle>
      <MainBtn onClick={onClick}>메인으로 가기</MainBtn>
    </IntroContainer>
  );
};

export default Introduction;
