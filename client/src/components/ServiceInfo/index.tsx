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
      <MainTitle onClick={onClickTitle}>νλ₯νλ₯</MainTitle>
      <MainInfo>
        π₯μ΄μ  <span onClick={onClickFire}>λͺ¨λ₯λΆ</span>μ νΌμ΄ μ¬μ©μλ {visit}λͺμλλ€π₯
      </MainInfo>
    </>
  );
}

export default ServiceInfo;
