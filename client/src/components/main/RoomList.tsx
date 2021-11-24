import { useState, useEffect, useCallback, useRef } from 'react';
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
import { DEBOUNCE, INFINITE_SCROLL } from '@src/utils/constant';

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

const renderRoomList = (roomInfo: RoomInfo) => <RoomBox key={roomInfo.uuid} roomInfo={roomInfo} />;

function RoomList(): JSX.Element {
  const [tabState, setTabState] = useState<TabState>({ tadak: true, campfire: false });
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, DEBOUNCE.TIME);
  const [isLoading, setLoading] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  const page = useRef(1);

  const onClickTadakTap = () => setTabState({ tadak: true, campfire: false });
  const onClickCampFireTap = () => setTabState({ tadak: false, campfire: true });
  const getRoomList = useCallback(
    async (searchStr: string) => {
      setLoading(true);
      page.current = 1;
      const type = tabState.tadak ? '타닥타닥' : '캠프파이어';
      const queryObj = getRoomQueryObj(type, searchStr, 1);
      const { isOk, data } = await getRoom(queryObj);
      console.log(data?.results);
      if (isOk && data) {
        setRooms([...data.results]);
      }
      setLoading(false);
    },
    [tabState],
  );
  const addRoomList = useCallback(
    async (searchStr: string) => {
      setLoading(true);
      const type = tabState.tadak ? '타닥타닥' : '캠프파이어';
      const queryObj = getRoomQueryObj(type, searchStr, page.current);
      const { isOk, data } = await getRoom(queryObj);
      console.log(data?.results);
      if (isOk && data) {
        setRooms((prevRooms) => [...prevRooms, ...data.results]);
      }
      setLoading(false);
    },
    [tabState, page],
  );

  const changeExtraTransaction = useCallback(() => {
    page.current += 1;
    console.log(page.current);
    addRoomList(debounceSearch);
  }, [addRoomList, debounceSearch]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && page.current < INFINITE_SCROLL.MAX_LENGTH) {
          observer.unobserve(entry.target);
          changeExtraTransaction();
        }
      });
    },
    [changeExtraTransaction],
  );

  useEffect(() => {
    getRoomList(debounceSearch);
  }, [getRoomList, debounceSearch, tabState]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect, rooms]);

  return (
    <>
      <TabWrapper>
        <Tab text="타닥타닥" isActive={tabState.tadak} onClick={onClickTadakTap} />
        <Tab text="캠프파이어" isActive={tabState.campfire} onClick={onClickCampFireTap} />
        <SearchBar search={search} setSearch={setSearch} />
      </TabWrapper>
      <RoomListGrid ref={target}>
        {rooms && <ListGenerator list={rooms} renderItem={renderRoomList} />}
        {isLoading && <Loader />}
      </RoomListGrid>
    </>
  );
}

export default RoomList;
