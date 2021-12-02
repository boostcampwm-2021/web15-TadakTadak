import { useState, useEffect } from 'react';
import { MainTitleLink, MainInfo } from './style';
import { getVisitCount } from '@src/apis';
import { PATH } from '@src/utils/constant';

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
      <MainTitleLink to={PATH.main}>타닥타닥</MainTitleLink>
      <MainInfo>🔥어제 모닥불을 피운 사용자는 {visit}명입니다🔥</MainInfo>
    </>
  );
}

export default ServiceInfo;
