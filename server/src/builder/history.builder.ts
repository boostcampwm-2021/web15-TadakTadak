import { BuilderCommon } from './builder';
import { User } from '../domain/user/user.entity';
import { History } from '../domain/history/history.entity';
import { LocalDate } from 'js-joda';

export class HistoryBuilder extends BuilderCommon<History> {
  constructor() {
    super(History);
  }

  setCheckIn(checkIn: LocalDate): HistoryBuilder {
    this.object.checkIn = checkIn;
    return this;
  }

  setUser(user: User): HistoryBuilder {
    this.object.user = user;
    return this;
  }
}
