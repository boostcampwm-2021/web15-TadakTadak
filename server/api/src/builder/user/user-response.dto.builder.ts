import { BuilderCommon } from '../builder';
import { LocalDate } from 'js-joda';
import { UserResponseDto } from '../../domain/user/dto/user-response.dto';

export class UserResponseDtoBuilder extends BuilderCommon<UserResponseDto> {
  constructor() {
    super(UserResponseDto);
  }

  setId(id: number): UserResponseDtoBuilder {
    this.object.id = id;
    return this;
  }

  setNickname(nickname: string): UserResponseDtoBuilder {
    this.object.nickname = nickname;
    return this;
  }

  setEmail(email: string): UserResponseDtoBuilder {
    this.object.email = email;
    return this;
  }

  setImageUrl(imageUrl: string): UserResponseDtoBuilder {
    this.object.imageUrl = imageUrl;
    return this;
  }

  setImageName(imageName: string): UserResponseDtoBuilder {
    this.object.imageName = imageName;
    return this;
  }

  setIntroduction(introduction: string): UserResponseDtoBuilder {
    this.object.introduction = introduction;
    return this;
  }

  setIsSocial(isSocial: boolean): UserResponseDtoBuilder {
    this.object.isSocial = isSocial;
    return this;
  }

  setLastCheckIn(date: LocalDate): UserResponseDtoBuilder {
    this.object.lastCheckIn = date;
    return this;
  }
}
