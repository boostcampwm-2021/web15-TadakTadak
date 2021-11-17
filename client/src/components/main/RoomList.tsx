import { useState, useEffect } from 'react';
import styled from 'styled-components';

import ListGenerator from '@components/ListGenerator';
import RoomBox from '@components/RoomBox';
import Tab from '@components/common/Tab';

import { getRoom } from '@utils/apis';

const RoomListGrid = styled.div`
  padding: ${({ theme }) => theme.paddings.lg} 0;
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3 - 1.5rem));
  gap: 2rem;
`;

const TabWrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  margin-top: ${({ theme }) => theme.margins.xl};
  width: 100%;

  & div {
    transition: background-color 0.4s ease-in-out;
  }
  & div:hover {
    background-color: ${({ theme }) => theme.colors.borderGrey};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
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

interface TabState {
  tadak: boolean;
  campfire: boolean;
}

enum RoomType {
  tadak = '타닥타닥',
  campfire = '캠프파이어',
}

const renderRoomList = (roomInfo: RoomInfo) => <RoomBox key={roomInfo.uuid} roomInfo={roomInfo} />;

function RoomList(): JSX.Element {
  const [tabState, setTabState] = useState<TabState>({ tadak: true, campfire: false });
  const [rooms, setRooms] = useState<RoomInfo[]>([]);

  const onClickTadakTap = () => setTabState({ tadak: true, campfire: false });
  const onClickCampFireTap = () => setTabState({ tadak: false, campfire: true });

  const getRoomList = async (roomType: keyof typeof RoomType) => {
    console.log(roomType);
    const testQueryObj = {
      type: RoomType[roomType],
      search: '',
      take: 15,
      page: 1,
    };
    const { isOk, data } = await getRoom(testQueryObj);
    if (isOk && data) {
      setRooms([...data.results]);
    }
  };
  useEffect(() => {
    getRoomList(tabState.tadak ? 'tadak' : 'campfire');
  }, [tabState]);
  return (
    <>
      <TabWrapper>
        <Tab text="타닥타닥" isActive={tabState.tadak} onClick={onClickTadakTap} />
        <Tab text="캠프파이어" isActive={tabState.campfire} onClick={onClickCampFireTap} />
      </TabWrapper>
      <RoomListGrid>{rooms && <ListGenerator list={rooms} renderItem={renderRoomList} />}</RoomListGrid>
    </>
  );
}

export default RoomList;
