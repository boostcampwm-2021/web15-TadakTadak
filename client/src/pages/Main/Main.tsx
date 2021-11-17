import { MainWrapper, MainContainer } from './style';

import SideBar from '@components/main/SideBar';
import RoomList from '@components/main/RoomList';
import ServiceInfo from '@components/main/ServiceInfo';

const Main = (): JSX.Element => {
  const getServiceInfo = async () => {
    const query = '';
    const { isOk, data } = await { isOk: true, data: 8 };
    if (isOk && data) {
    }
  };

  return (
    <MainWrapper>
      <SideBar />
      <MainContainer>
        <ServiceInfo />
        <RoomList />
      </MainContainer>
    </MainWrapper>
  );
};

export default Main;
