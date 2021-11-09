import { MainWrapper, MainContainer, MainTitle, RoomListGrid } from './style';
import RoomBox from '@components/RoomBox';
import SideBar from '@pages/Main/SideBar';
import ListGenerator from '@components/ListGenerator';

const roomInfos = [
  {
    channelName: 'test',
    token: process.env.REACT_APP_AGORA_TOKEN || '',
    roomName: 'test room',
    roomUid: 'blabla',
    roomHost: 'Narastro',
  },
];

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
