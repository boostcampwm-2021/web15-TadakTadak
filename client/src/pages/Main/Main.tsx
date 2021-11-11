import { useEffect, useState } from 'react';
import { MainWrapper, MainContainer, MainTitle, RoomListGrid } from './style';
import RoomBox from '@components/RoomBox';
import SideBar from '@components/main/SideBar';
import ListGenerator from '@components/ListGenerator';
import { getRoom } from '@utils/apis';

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
  const [rooms, setRooms] = useState<RoomInfo[]>([]);

  useEffect(() => {
    async function getRoomList() {
      const testQueryObj = {
        type: '타닥타닥',
        search: '',
        take: 15,
        page: 1,
      };
      const { status, data } = await getRoom(testQueryObj);
      setRooms((prevState) => {
        return [...prevState, ...data.results];
      });
    }
    getRoomList();
  }, []);

  return (
    <MainWrapper>
      <SideBar />
      <MainContainer>
        <MainTitle className="heading">채널 목록</MainTitle>
        <RoomListGrid>{rooms && <ListGenerator list={rooms} renderItem={renderRoomList} />}</RoomListGrid>
      </MainContainer>
    </MainWrapper>
  );
};

export default Main;
