import { UserInfoType, RoomInfoType, HTTPResponse } from '@src/types';
import { queryObjToString, getUrl } from './apiUtils';
import { fetchGet, fetchPost, fetchPatch, fetchDelete, fetchDeleteImage } from './fetchFns';
import fetcher from './fetcher';

interface PostLogin {
  email: string;
  password: string;
}

export const postLogin = async (body: PostLogin): Promise<HTTPResponse<UserInfoType>> => {
  const response = await fetchPost<UserInfoType>('/api/auth/login', { ...body });
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

export const getVisitCount = async (): Promise<HTTPResponse<number>> => {
  const response = await fetchGet<number>('/api/history');
  return response;
};

interface PatchUpdate {
  originalName: string;
  nickname: string;
  devField?: number;
}

export const patchUpdate = async (body: PatchUpdate): Promise<HTTPResponse<UserInfoType>> => {
  const response = await fetchPatch<UserInfoType>(`/api/user/${body.originalName}`, { ...body });
  return response;
};

export const postAvatar = async (formData: FormData): Promise<HTTPResponse<UserInfoType>> => {
  const url = getUrl('/api/user/image');
  const response = await fetcher<UserInfoType>(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return response;
};

export const deleteImage = async (): Promise<HTTPResponse<UserInfoType>> => {
  const response = await fetchDeleteImage<UserInfoType>('/api/user/image');
  return response;
};

export const getUserByToken = async (): Promise<HTTPResponse<UserInfoType>> => {
  const response = await fetchGet<UserInfoType>('/api/auth/token');
  return response;
};

interface PostRoom {
  userId?: number;
  title: string;
  description: string | null;
  maxHeadcount: number;
  roomType: string;
}

export const postRoom = async (body: PostRoom): Promise<HTTPResponse<RoomInfoType>> => {
  const response = await fetchPost<RoomInfoType>('/api/room', { ...body });
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
  results: RoomInfoType[];
  total: number;
}

export const getRoom = async (queryObj: GetRoomQueryObj): Promise<HTTPResponse<ResponseGetRoomData>> => {
  const queryString = queryObjToString(queryObj);
  const response = await fetchGet<ResponseGetRoomData>('/api/room', queryString);
  return response;
};

export const getRoomByUuid = async (uuid: string): Promise<HTTPResponse<RoomInfoType>> => {
  const response = await fetchGet<RoomInfoType>(`/api/room/${uuid}`);
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

interface UserLogList {
  id: number;
  checkIn: string;
}

export const getUserLogList = async (): Promise<HTTPResponse<UserLogList[]>> => {
  const response = await fetchGet<UserLogList[]>('/api/user/log/year');
  return response;
};

interface UserLogListPerMonth {
  [key: string]: number;
}

export const getUserLogListPerMonth = async (): Promise<HTTPResponse<UserLogListPerMonth>> => {
  const response = await fetchGet<UserLogListPerMonth>('/api/user/log/month');
  return response;
};
