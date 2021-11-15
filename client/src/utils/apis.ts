import { UserProps } from '@contexts/userContext';
import { RoomInfo } from '@pages/Main/Main';
import { HTTPResponse, queryObjToString, fetchGet, fetchPost } from './apiUtils';

export const postJoin = async (email: string, nickname: string, password: string): Promise<boolean> => {
  const { isOk } = await fetchPost('/api/auth/join', { email, nickname, password });
  return isOk;
};

export const postLogin = async (email: string, password: string): Promise<HTTPResponse<UserProps>> => {
  const response = await fetchPost<UserProps>('/api/auth/login', { email, password });
  return response;
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

export const postRoom = async (body: PostRoom): Promise<HTTPResponse<RoomInfo>> => {
  const response = await fetchPost<RoomInfo>('/api/room', { ...body });
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
