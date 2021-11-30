import { UserProps } from '@contexts/userContext';

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
