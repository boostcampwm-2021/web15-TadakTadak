import 'dotenv/config';

const baseUrl = process.env.REACT_APP_SERVER_URL ?? '';

export function getUrl(url: string): string {
  return baseUrl + url;
}

export function queryObjToString<T>(queryObj: T): string {
  return Object.entries(queryObj)
    .map((e) => e.join('='))
    .join('&');
}

type TypeRoom = '타닥타닥' | '캠프파이어';
interface QueryObj {
  type: TypeRoom;
  search: string;
  take: number;
  page: number;
}
const TAKE_ROOM_UNIT = 15;

export function getRoomQueryObj(type: TypeRoom, search: string, page: number): QueryObj {
  const queryObj = {
    type,
    search,
    take: TAKE_ROOM_UNIT,
    page,
  };
  return queryObj;
}
