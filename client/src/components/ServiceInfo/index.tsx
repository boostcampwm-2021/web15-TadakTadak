import { useState, useEffect } from 'react';
import { MainTitle, MainInfo } from './style';
import { getVisitCount } from '@src/apis';
import { useToast } from '@hooks/useToast';
import { TOAST_MESSAGE } from '@utils/constant';

function ServiceInfo(): JSX.Element {
  const [visit, setVisit] = useState<number>();
  const toast = useToast();

  const getServiceInfo = async () => {
    const { isOk, data } = await getVisitCount();
    if (isOk && data) {
      setVisit(data);
    }
  };

  const onClickTitle = () => toast('easterEgg', TOAST_MESSAGE.introduceEasterEgg);
  const onClickFire = () => toast('easterEgg', TOAST_MESSAGE.introduceFire);

  useEffect(() => {
    getServiceInfo();
  }, []);

  return (
    <>
      <MainTitle onClick={onClickTitle}>타닥타닥</MainTitle>
      <MainInfo>
        🔥어제 <span onClick={onClickFire}>모닥불</span>을 피운 사용자는 {visit}명입니다🔥
      </MainInfo>
    </>
  );
}

export default ServiceInfo;
