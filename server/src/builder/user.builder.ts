import { BuilderCommon } from './builder';
import { User } from '../domain/user/user.entity';
import { DevField } from '../domain/user/dev-field.entity';
import { Follow } from '../domain/user/follow.entity';
import { History } from '../domain/user/history.entity';

export class UserBuilder extends BuilderCommon<User> {
  constructor() {
    super(User);
  }

  setNickName(nickName: string): UserBuilder {
    this.object.nickName = nickName;
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

  setFollows(follows: Follow[]): UserBuilder {
    this.object.follows = follows;
    return this;
  }

  setHistorys(historys: History[]): UserBuilder {
    this.object.historys = historys;
    return this;
  }
}
