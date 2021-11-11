import { MainWrapper, MainContainer, MainTitle, RoomListGrid } from './style';
import RoomBox from '@components/RoomBox';
import SideBar from '@components/main/SideBar';
import ListGenerator from '@components/ListGenerator';

const roomInfos = [
  {
    appId: process.env.REACT_APP_AGORA_APP_ID || '',
    token: process.env.REACT_APP_AGORA_TOKEN || '',
    uuid: 'blabla',
    ownerId: 1,
    title: 'test',
    roomType: '타닥타닥',
    description: 'test room description',
    nowHeadcount: 1,
    maxHeadcount: 9,
  },
];

export interface RoomInfo {
  appId: string;
  token?: string;
  uuid: string;
  ownerId: number;
  title: string;
  roomType: string;
  description: string;
  nowHeadcount: number;
  maxHeadcount: number;
}

const renderRoomList = (roomInfo: RoomInfo) => <RoomBox key={roomInfo.uuid} roomInfo={roomInfo} />;

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
