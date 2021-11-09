import { MainWrapper, MainContainer, MainTitle, RoomListGrid } from './style';
import RoomBox from '@components/RoomBox';
import SideBar from '@components/SideBar';
import ListGenerator from '@components/ListGenerator';

const roomInfos = [
  {
    channelName: 'test',
    token:
      '006cbbbd145a11e47f4a2c3c184e7965500IAD8jW4RR3XhxEuIacGUgmABI3ZSNhp/JsI3cZm0LkwVYQx+f9gAAAAAEAD3dRUDESGLYQEAAQARIYth',
    roomName: 'test room',
    roomUid: 'blabla',
    roomHost: 'Narastr',
  },
]; //테스트용

export interface RoomInfo {
  channelName: string;
  token: string;
  roomName: string;
  roomUid: string;
  roomHost: string;
}

const renderRoomList = (roomInfo: RoomInfo) => <RoomBox key={roomInfo.channelName} roomInfo={roomInfo} />;

const Main = (): JSX.Element => {
  return (
    <MainWrapper>
      <SideBar />
      <MainContainer>
        <MainTitle className="heading">채널 목록</MainTitle>
        <RoomListGrid>{roomInfos && <ListGenerator list={roomInfos} renderItem={renderRoomList} />}</RoomListGrid>
      </MainContainer>
    </MainWrapper>
  );
};

export default Main;
