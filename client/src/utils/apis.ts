import { UserProps } from '@contexts/userContext';
import { RoomInfo } from '@pages/Main/Main';
import { HTTPResponse, queryObjToString, fetchGet, fetchPost } from './apiUtils';

interface PostLogin {
  email: string;
  password: string;
}

export const postLogin = async (body: PostLogin): Promise<HTTPResponse<UserProps>> => {
  const response = await fetchPost<UserProps>('/api/auth/login', { ...body });
  return response;
};

interface PostJoin extends PostLogin {
  nickname: string;
}

export const postJoin = async (body: PostJoin): Promise<boolean> => {
  const { isOk } = await fetchPost('/api/auth/join', { ...body });
  return isOk;
};

export const getUserByToken = async (): Promise<HTTPResponse<UserProps>> => {
  const response = await fetchGet<UserProps>('/api/auth/token');
  return response;
};

interface PostRoom {
  userId?: number;
  title: string;
  description: string | null;
  maxHeadcount: number;
  roomType: string;
}

export const postRoom = async (body: PostRoom): Promise<HTTPResponse<{ room: RoomInfo }>> => {
  const response = await fetchPost<{ room: RoomInfo }>('/api/room', { ...body });
  return response;
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

export const getRoom = async (queryObj: GetRoomQueryObj): Promise<HTTPResponse<ResponseGetRoomData>> => {
  const queryString = queryObjToString(queryObj);
  const response = await fetchGet<ResponseGetRoomData>('/api/room', queryString);
  return response;
};
