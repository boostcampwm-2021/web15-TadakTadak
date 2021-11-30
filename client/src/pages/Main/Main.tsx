import { MainWrapper, MainContainer } from './style';
import MainSideBar from '@components/sideBar/Main';
import RoomList from '@components/room/RoomList';
import ServiceInfo from '@components/ServiceInfo';
import DevFieldContextProvider from '@src/contexts/devFieldContext';
import { PAGE_NAME } from '@utils/constant';

const Main = (): JSX.Element => {
  return (
    <MainWrapper>
      <DevFieldContextProvider>
        <MainSideBar page={PAGE_NAME.main} />
      </DevFieldContextProvider>
      <MainContainer>
        <ServiceInfo />
        <RoomList />
      </MainContainer>
    </MainWrapper>
  );
};

export default Main;
