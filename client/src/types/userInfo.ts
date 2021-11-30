import { DevFieldType } from './devField';

export default interface UserInfoType {
  id?: number;
  nickname?: string;
  email?: string;
  imageUrl?: string;
  introduction?: string;
  isSocial?: boolean;
  devField?: {
    id: number;
    name: DevFieldType;
  };
  login?: boolean;
}
