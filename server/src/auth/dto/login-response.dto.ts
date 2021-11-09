import { User } from 'src/user/user.entity';

export class LoginResponseDto {
  readonly id: number;
  readonly nickname: string;
  readonly email: string;
  readonly imageUrl: string;
  readonly introduction: string;
  readonly isSocial: boolean;
  readonly devFiled: string;
  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickName;
    this.email = user.email;
    this.imageUrl = user.imageUrl;
    this.introduction = user.introduction;
    this.isSocial = user.isSocial;
    this.devFiled = user.devField.name;
  }
}
