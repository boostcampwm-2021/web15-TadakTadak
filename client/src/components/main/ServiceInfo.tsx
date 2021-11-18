import styled from 'styled-components';
import { useState, useEffect } from 'react';

const MainTitle = styled.h1`
  font-size: 15rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

const MainInfo = styled.div`
  font-size: 4rem;
`;

function ServiceInfo(): JSX.Element {
  const [visit, setVisit] = useState<number>();

  const getServiceInfo = async () => {
    // const query = '';
    const { isOk, data } = await { isOk: true, data: 32 };
    if (isOk && data) {
      setVisit(data);
    }
  };

  useEffect(() => {
    getServiceInfo();
  }, []);

  return (
    <>
      <MainTitle>타닥타닥</MainTitle>
      <MainInfo>🔥어제 모닥불을 피운 사용자는 {visit}명입니다🔥</MainInfo>
    </>
  );
}

export default ServiceInfo;
