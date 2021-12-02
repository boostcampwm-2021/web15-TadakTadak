import { EntityRepository, Repository } from 'typeorm';
import { LocalDate } from 'js-joda';
import { HistoryBuilder } from '../../../builder';
import { History } from '../history.entity';
import { User } from '../../user/user.entity';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
  async addHistory(user: User) {
    const history: History = new HistoryBuilder().setCheckIn(LocalDate.now()).setUser(user).build();
    await this.save(history);
    return true;
  }

  async getYearHistoryByUser(user: User, year: number) {
    return await this.find({ where: { user: user } });
  }

  async getMonthHistoryByUser(user: User, year: number) {
    return await this.createQueryBuilder()
      .select('MONTH(check_in) as month')
      .addSelect('COUNT(*) as count')
      .where('YEAR(check_in) = :year AND user_id = :user', {
        year: year,
        user: user.id,
      })
      .groupBy('MONTH(check_in)')
      .getRawMany();
  }
}
