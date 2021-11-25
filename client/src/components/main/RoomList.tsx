import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { getRoom } from '@src/apis';
import { UserProps } from '@contexts/userContext';
import useDebounce from '@hooks/useDebounce';
import useInput from '@hooks/useInput';
import Loader from '@components/common/Loader';
import Tab from '@components/common/Tab';
import ListGenerator from '@components/ListGenerator';
import RoomBox from '@components/RoomBox';
import SearchBar from './SearchBar';
import { getRoomQueryObj } from '@utils/apiUtils';
import { DEBOUNCE, INFINITE_SCROLL, ROOM_DESCRIPTION } from '@utils/constant';
import QuestionButton from '@components/main/QuestionButton';

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
  const [search, onChangeSearch, onResetSearch] = useInput('');
  const debounceSearch = useDebounce(search, DEBOUNCE.time);
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
      if (isOk && data) {
        setRooms((prevRooms) => [...prevRooms, ...data.results]);
      }
      setLoading(false);
    },
    [tabState, page],
  );

  const addNewPage = useCallback(() => {
    page.current += 1;
    addRoomList(debounceSearch);
  }, [addRoomList, debounceSearch]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && rooms.length === page.current * INFINITE_SCROLL.unit) {
          observer.unobserve(entry.target);
          addNewPage();
        }
      });
    },
    [addNewPage, rooms],
  );

  useEffect(() => {
    getRoomList(debounceSearch);
  }, [getRoomList, debounceSearch, tabState]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current?.lastElementChild) {
      observer = new IntersectionObserver(onIntersect, { threshold: INFINITE_SCROLL.threshold });
      observer.observe(target.current.lastElementChild);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect, rooms]);

  return (
    <>
      <TabWrapper>
        <Tab text="타닥타닥" isActive={tabState.tadak} onClick={onClickTadakTap}>
          <QuestionButton text={ROOM_DESCRIPTION.tadak} />
        </Tab>
        <Tab text="캠프파이어" isActive={tabState.campfire} onClick={onClickCampFireTap}>
          <QuestionButton text={ROOM_DESCRIPTION.campfire} />
        </Tab>
        <SearchBar search={search} onChange={onChangeSearch} onReset={onResetSearch} />
      </TabWrapper>
      <RoomListGrid ref={target}>{rooms && <ListGenerator list={rooms} renderItem={renderRoomList} />}</RoomListGrid>
      {isLoading && <Loader />}
    </>
  );
}

export default RoomList;
