import { MainWrapper, MainContainer } from './style';

import MainSideBar from '@src/components/main/MainSideBar';
import RoomList from '@components/main/RoomList';
import ServiceInfo from '@components/main/ServiceInfo';
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
