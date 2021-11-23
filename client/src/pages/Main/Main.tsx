import { MainWrapper, MainContainer } from './style';

import SideBar from '@components/main/SideBar';
import RoomList from '@components/main/RoomList';
import ServiceInfo from '@components/main/ServiceInfo';
import DevFieldContextProvider from '@src/contexts/devFieldContext';

const Main = (): JSX.Element => {
  return (
    <MainWrapper>
      <DevFieldContextProvider>
        <SideBar />
      </DevFieldContextProvider>
      <MainContainer>
        <ServiceInfo />
        <RoomList />
      </MainContainer>
    </MainWrapper>
  );
};

export default Main;
