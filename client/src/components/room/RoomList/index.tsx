import { useState, useEffect, useCallback, useRef } from 'react';
import { RoomListGrid, TabWrapper } from './style';
import Loader from '@components/common/Loader';
import Tab from '@components/common/Tab';
import RoomCard from '@components/room/RoomCard';
import SearchBar from '@components/SearchBar';
import TabInfo from '@components/room/TabInfo';
import useDebounce from '@hooks/useDebounce';
import useInput from '@hooks/useInput';
import { getRoom } from '@src/apis';
import { getRoomQueryObj } from '@src/apis/apiUtils';
import { DEBOUNCE, INFINITE_SCROLL, ROOM_DESCRIPTION } from '@utils/constant';
import { RoomInfoType, TabStateType } from '@src/types';

interface ListGeneratorProps<T> {
  list: T[];
  renderItem: (item: T) => React.ReactNode;
}

const ListGenerator = <T extends unknown>({ list, renderItem }: ListGeneratorProps<T>): JSX.Element => {
  return <>{list.map((item) => renderItem(item))}</>;
};

const renderRoomList = (roomInfo: RoomInfoType) => <RoomCard key={roomInfo.uuid} roomInfo={roomInfo} />;

function RoomList(): JSX.Element {
  const [tabState, setTabState] = useState<TabStateType>({ tadak: true, campfire: false });
  const [rooms, setRooms] = useState<RoomInfoType[]>([]);
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
      const type = tabState.tadak ? '타닥타닥' : '캠프파이어';
      const queryObj = getRoomQueryObj({ type, search: searchStr, page: page.current });
      const { isOk, data } = await getRoom(queryObj);
      if (isOk && data) setRooms([...data.results]);
      setLoading(false);
    },
    [tabState],
  );

  const addNewPage = useCallback(() => {
    page.current += 1;
    getRoomList(debounceSearch);
  }, [getRoomList, debounceSearch]);

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
    page.current = 1;
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
          <TabInfo text={ROOM_DESCRIPTION.tadak} />
        </Tab>
        <Tab text="캠프파이어" isActive={tabState.campfire} onClick={onClickCampFireTap}>
          <TabInfo text={ROOM_DESCRIPTION.campfire} />
        </Tab>
        <SearchBar search={search} onChange={onChangeSearch} onReset={onResetSearch} />
      </TabWrapper>
      <RoomListGrid ref={target}>{rooms && <ListGenerator list={rooms} renderItem={renderRoomList} />}</RoomListGrid>
      {isLoading && <Loader />}
    </>
  );
}

export default RoomList;
