import { EntityRepository, Repository } from 'typeorm';
import { LocalDate } from 'js-joda';
import { HistoryBuilder } from 'src/builder/history.builder';
import { History } from '../history.entity';
import { User } from 'src/domain/user/user.entity';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
  async addHistory(user: User) {
    const history: History = new HistoryBuilder().setCheckIn(LocalDate.now()).setUser(user).build();
    await this.save(history);
    return true;
  }

  async getHistoryByNickname(user: User) {
    return await this.find({ where: { user: user } });
  }
}
