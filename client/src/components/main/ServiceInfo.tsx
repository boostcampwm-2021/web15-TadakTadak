import styled from 'styled-components';

const MainTitle = styled.h1`
  font-size: 15rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

const MainInfo = styled.div`
  font-size: 4rem;
`;

function ServiceInfo(): JSX.Element {
  return (
    <>
      <MainTitle>타닥타닥</MainTitle>
      <MainInfo>어제 모닥불을 피운 사용자는</MainInfo>
    </>
  );
}

export default ServiceInfo;
