import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ListGenerator from '@components/ListGenerator';
import RoomBox from '@components/RoomBox';
import Tab from '@components/common/Tab';
import SearchBar from './SearchBar';
import { getRoomQueryObj } from '@src/utils/apiUtils';
import { UserProps } from '@src/contexts/userContext';
import { getRoom } from '@src/apis';
import Loader from '@components/common/Loader';
import useDebounce from '@src/hooks/useDebounce';
import { DEBOUNCE } from '@src/utils/constant';

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
  position: relative;

  & div {
    transition: background-color 0.4s ease-in-out, border-color 0.3s ease-in-out;
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
  owner?: UserProps;
  title: string;
  roomType: string;
  description: string;
  nowHeadcount: number;
  maxHeadcount: number;
}

export interface TabState {
  tadak: boolean;
  campfire: boolean;
}

export enum RoomType {
  tadak = '타닥타닥',
  campfire = '캠프파이어',
}

const renderRoomList = (roomInfo: RoomInfo) => <RoomBox key={roomInfo.uuid} roomInfo={roomInfo} />;

function RoomList(): JSX.Element {
  const [tabState, setTabState] = useState<TabState>({ tadak: true, campfire: false });
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, DEBOUNCE.TIME);
  const [isLoading, setLoading] = useState(false);
  const onClickTadakTap = () => setTabState({ tadak: true, campfire: false });
  const onClickCampFireTap = () => setTabState({ tadak: false, campfire: true });

  const getRoomList = useCallback(
    async (searchStr: string) => {
      setLoading(true);
      const type = tabState.tadak ? '타닥타닥' : '캠프파이어';
      const queryObj = getRoomQueryObj(type, searchStr, 1);
      const { isOk, data } = await getRoom(queryObj);
      if (isOk && data) {
        setRooms([...data.results]);
      }
      setLoading(false);
    },
    [tabState],
  );

  useEffect(() => {
    getRoomList(debounceSearch);
  }, [getRoomList, debounceSearch, tabState]);
  return (
    <>
      <TabWrapper>
        <Tab text="타닥타닥" isActive={tabState.tadak} onClick={onClickTadakTap} />
        <Tab text="캠프파이어" isActive={tabState.campfire} onClick={onClickCampFireTap} />
        <SearchBar search={search} setSearch={setSearch} setTabState={setTabState} />
      </TabWrapper>
      {isLoading && <Loader />}
      <RoomListGrid>{rooms && <ListGenerator list={rooms} renderItem={renderRoomList} />}</RoomListGrid>
    </>
  );
}

export default RoomList;
