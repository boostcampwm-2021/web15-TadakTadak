import { LocalDate } from 'js-joda';
import { BuilderCommon } from '../builder';
import { User } from '../../domain/user/user.entity';
import { DevField } from '../../domain/field/dev-field.entity';
import { History } from '../../domain/history/history.entity';

export class UserBuilder extends BuilderCommon<User> {
  constructor() {
    super(User);
  }

  setNickname(nickname: string): UserBuilder {
    this.object.nickname = nickname;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.object.email = email;
    return this;
  }

  setPassword(password: string): UserBuilder {
    this.object.password = password;
    return this;
  }

  setImageURL(imageUrl: string): UserBuilder {
    this.object.imageUrl = imageUrl;
    return this;
  }

  setImageName(imageName: string): UserBuilder {
    this.object.imageName = imageName;
    return this;
  }

  setIntroduction(text: string): UserBuilder {
    this.object.introduction = text;
    return this;
  }

  setIsSocial(isSocial: boolean): UserBuilder {
    this.object.isSocial = isSocial;
    return this;
  }

  setDevField(devField: DevField): UserBuilder {
    this.object.devField = devField;
    return this;
  }

  setHistorys(historys: History[]): UserBuilder {
    this.object.historys = historys;
    return this;
  }

  setLastCheckIn(lastCheckIn: LocalDate): UserBuilder {
    this.object.lastCheckIn = lastCheckIn;
    return this;
  }
}
