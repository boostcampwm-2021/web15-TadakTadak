import { MainWrapper, MainContainer } from './style';

import SideBar from '@components/main/SideBar';
import RoomList from '@components/main/RoomList';
import ServiceInfo from '@components/main/ServiceInfo';

const Main = (): JSX.Element => {
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
