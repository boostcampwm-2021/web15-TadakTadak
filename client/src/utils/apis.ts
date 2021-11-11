import { UserProps } from '@contexts/userContext';
import { RoomInfo } from '@pages/Main/Main';

export const postJoin = async (email: string, nickname: string, password: string): Promise<boolean> => {
  const response = await fetch('/api/auth/join', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, nickname, password }),
  });
  if (response.ok) {
    return true;
  }
  return false;
};

export const postLogin = async (email: string, password: string): Promise<{ status: number; data: UserProps }> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { status } = response;
  let data;
  if (response.ok) {
    data = await response.json();
  }
  return { status, data };
};

export const getUserByToken = async (): Promise<{ statusCode: number; data: UserProps }> => {
  const response = await fetch('/api/auth/token');
  const { statusCode, data } = await response.json();
  return { statusCode, data };
};

interface PostRoom {
  userId?: number;
  title: string;
  description: string | null;
  maxHeadcount: number;
  roomType: string;
}

export const postRoom = async (inputData: PostRoom): Promise<{ status: number; data: RoomInfo }> => {
  const response = await fetch('/api/room', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(inputData),
  });
  const { status } = response;
  let data;
  if (response.ok) {
    data = await response.json();
  }
  return { status, data };
};

interface GetRoomQueryObj {
  type: string;
  search?: string;
  take: number;
  page: number;
}

interface ResponseGetRoomData {
  pageTotal: number;
  results: RoomInfo[];
  total: number;
}

function queryObjToString(queryObj: GetRoomQueryObj): string {
  return Object.entries(queryObj)
    .map((e) => e.join('='))
    .join('&');
}

export const getRoom = async (queryObj: GetRoomQueryObj): Promise<{ status: number; data: ResponseGetRoomData }> => {
  const queryString = queryObjToString(queryObj);
  const response = await fetch(`/api/room?${queryString}`);
  const { status } = response;
  let data;
  if (response.ok) {
    data = await response.json();
  }
  return { status, data: data.data };
};
