import { DevFieldType } from './devField';

export default interface ParticipantType {
  nickname: string;
  field: { id: number; name: DevFieldType };
  img: string;
}
