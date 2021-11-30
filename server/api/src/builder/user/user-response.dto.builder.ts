import { BuilderCommon } from '../builder';
import { LocalDate } from 'js-joda';
import { DevField } from '../../domain/field/dev-field.entity';
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

  setLastCheckIn(date: LocalDate): UserResponseDtoBuilder {
    this.object.lastCheckIn = date;
    return this;
  }

  setDevField(devField: DevField): UserResponseDtoBuilder {
    this.object.devField = devField;
    return this;
  }
}
