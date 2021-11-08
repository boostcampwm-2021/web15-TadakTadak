import { Link } from 'react-router-dom';
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

const Introduction = (): JSX.Element => {
  return (
    <IntroContainer>
      <IntroTitle>
        <TitleText color={'red'}>타</TitleText>
        <TitleText color={'orange'}>닥</TitleText>
        <TitleText color={'red'}>타</TitleText>
        <TitleText color={'yellow'}>닥</TitleText> 🔥
      </IntroTitle>
      <MainLink to="/main">메인으로 가기</MainLink>
    </IntroContainer>
  );
};

export default Introduction;
