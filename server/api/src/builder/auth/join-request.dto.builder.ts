import { BuilderCommon } from '../builder';
import { JoinRequestDto } from '../../domain/auth/dto/join-request.dto';

export class JoinRequestDtoBuilder extends BuilderCommon<JoinRequestDto> {
  constructor() {
    super(JoinRequestDto);
  }

  setNickname(nickname: string): JoinRequestDtoBuilder {
    this.object.nickname = nickname;
    return this;
  }

  setEmail(email: string): JoinRequestDtoBuilder {
    this.object.email = email;
    return this;
  }

  setPassword(password: string): JoinRequestDtoBuilder {
    this.object.password = password;
    return this;
  }

  setIntroduction(introduction: string): JoinRequestDtoBuilder {
    this.object.introduction = introduction;
    return this;
  }

  setDevField(devField: number): JoinRequestDtoBuilder {
    this.object.devField = devField;
    return this;
  }
}
