import { User } from '../../user/user.entity';
import { DevField } from '../../field/dev-field.entity';

export class UserResponseDto {
  readonly id: number;
  readonly nickname: string;
  readonly email: string;
  readonly imageUrl: string;
  readonly introduction: string;
  readonly isSocial: boolean;
  readonly devField: DevField;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.email = user.email;
    this.imageUrl = user.imageUrl;
    this.introduction = user.introduction;
    this.isSocial = user.isSocial;
    this.devField = user.devField;
  }
}
