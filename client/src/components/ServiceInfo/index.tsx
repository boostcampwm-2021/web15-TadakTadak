import { useState, useEffect } from 'react';
import { MainTitle, MainInfo } from './style';
import { getVisitCount } from '@src/apis';
import { useToast } from '@hooks/useToast';

function ServiceInfo(): JSX.Element {
  const [visit, setVisit] = useState<number>();
  const toast = useToast();

  const getServiceInfo = async () => {
    const { isOk, data } = await getVisitCount();
    if (isOk && data) {
      setVisit(data);
    }
  };

  const onClickTitle = () => {
    toast('easterEgg', '안녕하세요 TadakTadak팀입니다.　　숨겨진 이스터에그를 찾아보세요...!');
  };

  useEffect(() => {
    getServiceInfo();
  }, []);

  return (
    <>
      <MainTitle onClick={onClickTitle}>타닥타닥</MainTitle>
      <MainInfo>🔥어제 모닥불을 피운 사용자는 {visit}명입니다🔥</MainInfo>
    </>
  );
}

export default ServiceInfo;
