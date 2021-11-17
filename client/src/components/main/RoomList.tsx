import { useState, useEffect } from 'react';
import styled from 'styled-components';

import ListGenerator from '@components/ListGenerator';
import RoomBox from '@components/RoomBox';

import { getRoom } from '@utils/apis';

const RoomListGrid = styled.div`
  padding: ${({ theme }) => theme.paddings.lg} 0;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 2rem;
`;

export interface RoomInfo {
  agoraAppId: string;
  agoraToken: string;
  uuid: string;
  ownerId: number;
  title: string;
  roomType: string;
  description: string;
  nowHeadcount: number;
  maxHeadcount: number;
}

const renderRoomList = (roomInfo: RoomInfo) => <RoomBox key={roomInfo.uuid} roomInfo={roomInfo} />;

function RoomList(): JSX.Element {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const getRoomList = async () => {
    const testQueryObj = {
      type: '타닥타닥',
      search: '',
      take: 15,
      page: 1,
    };
    const { isOk, data } = await getRoom(testQueryObj);
    if (isOk && data) {
      setRooms((prevState) => {
        return [...prevState, ...data.results];
      });
    }
  };
  useEffect(() => {
    getRoomList();
  }, []);
  return (
    <>
      <RoomListGrid>{rooms && <ListGenerator list={rooms} renderItem={renderRoomList} />}</RoomListGrid>
    </>
  );
}

export default RoomList;
