import { useState, useEffect } from 'react';
import { MainTitle, MainInfo } from './style';
import { getVisitCount } from '@src/apis';

function ServiceInfo(): JSX.Element {
  const [visit, setVisit] = useState<number>();

  const getServiceInfo = async () => {
    const { isOk, data } = await getVisitCount();
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
