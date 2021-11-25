import { LocalDate } from 'js-joda';
import { DevField } from '../../field/dev-field.entity';

export class UserResponseDto {
  id: number;
  nickname: string;
  email: string;
  imageUrl: string;
  imageName: string;
  introduction: string;
  isSocial: boolean;
  lastCheckIn: LocalDate;
  devField: DevField;
}
