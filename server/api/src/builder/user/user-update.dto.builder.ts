import { BuilderCommon } from '../builder';
import { UserUpdateDto } from '../../domain/user/dto/user-update.dto';

export class UserUpdateDtoBuilder extends BuilderCommon<UserUpdateDto> {
  constructor() {
    super(UserUpdateDto);
  }

  setNickname(nickname: string): UserUpdateDtoBuilder {
    this.object.nickname = nickname;
    return this;
  }

  setDevField(devField: number): UserUpdateDtoBuilder {
    this.object.devField = devField;
    return this;
  }
}
