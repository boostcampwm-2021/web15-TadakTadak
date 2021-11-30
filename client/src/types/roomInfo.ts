import UserInfoType from './userInfo';

export default interface RoomInfoType {
  agoraAppId: string;
  agoraToken: string;
  uuid: string;
  owner?: UserInfoType;
  title: string;
  roomType: string;
  description: string;
  nowHeadcount: number;
  maxHeadcount: number;
}
