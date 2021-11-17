import { LocalDate } from 'js-joda';

export class UserResponseDto {
  id: number;
  nickName: string;
  email: string;
  imageUrl: string;
  imageName: string;
  introduction: string;
  isSocial: boolean;
  lastCheckIn: LocalDate;
}
