import { UserProps } from '@contexts/userContext';
import { RoomInfo } from '@components/main/RoomList';
import { HTTPResponse, queryObjToString, fetchGet, fetchPost, fetchPatch, fetchDelete } from './utils/apiUtils';

interface PostLogin {
  email: string;
  password: string;
}

export const postLogin = async (body: PostLogin): Promise<HTTPResponse<UserProps>> => {
  const response = await fetchPost<UserProps>('/api/auth/login', { ...body });
  return response;
};

export const postLogout = async (): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>('/api/auth/logout');
  return response;
};

interface PostJoin extends PostLogin {
  nickname: string;
}

export const postJoin = async (body: PostJoin): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>('/api/auth/join', { ...body });
  return response;
};

interface PatchUpdate {
  originalName: string;
  nickname: string;
  devField?: number;
}

export const patchUpdate = async (body: PatchUpdate): Promise<HTTPResponse<UserProps>> => {
  const response = await fetchPatch<UserProps>(`/api/user/${body.originalName}`, { ...body });
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

export const getRoomByUuid = async (uuid: string): Promise<HTTPResponse<RoomInfo>> => {
  const response = await fetchGet<RoomInfo>(`/api/room/${uuid}`);
  return response;
};

interface DeleteRoom {
  uuid: string;
}

export const deleteRoom = ({ uuid }: DeleteRoom): void => fetchDelete(`/api/room/${uuid}`);

export const postEnterRoom = async (uuid: string): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>(`/api/room/${uuid}/join`);
  return response;
};

export const postLeaveRoom = async (uuid: string): Promise<HTTPResponse<boolean>> => {
  const response = await fetchPost<boolean>(`/api/room/${uuid}/leave`);
  return response;
};

interface GetDevField {
  id: string;
  name: string;
}

export const getDevField = async (): Promise<HTTPResponse<GetDevField[]>> => {
  const response = await fetchGet<GetDevField[]>(`/api/field`);
  return response;
};
