import { DevField } from 'src/user/dev-field.entity';
import { User } from 'src/user/user.entity';

export class LoginResponseDto {
  readonly id: number;
  readonly nickname: string;
  readonly email: string;
  readonly imageUrl: string;
  readonly introduction: string;
  readonly isSocial: boolean;
  readonly devField: DevField;
  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickName;
    this.email = user.email;
    this.imageUrl = user.imageUrl;
    this.introduction = user.introduction;
    this.isSocial = user.isSocial;
    this.devField = user.devField;
  }
}