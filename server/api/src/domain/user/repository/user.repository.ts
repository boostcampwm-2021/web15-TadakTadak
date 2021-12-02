import { LocalDate } from 'js-joda';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(userId: number): Promise<User | undefined> {
    return this.findOne({ where: { id: userId } });
  }

  async findUserByUserEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email: email } });
  }

  async findUserByEmailWithDev(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email: email }, relations: ['devField'] });
  }

  async findUserByNickname(nickname: string): Promise<User | undefined> {
    return await this.findOne({ where: { nickname: nickname } });
  }

  async findUserByNicknameWithDev(nickname: string): Promise<User | undefined> {
    return await this.findOne({ where: { nickname: nickname }, relations: ['devField'] });
  }

  async isExistNickname(nickname: string): Promise<boolean> {
    return (await this.createQueryBuilder('user').where('user.nickname = :nickname', { nickname }).getCount()) > 0;
  }

  async isExistEmail(email: string): Promise<boolean> {
    return (await this.createQueryBuilder('user').where('user.email = :email', { email }).getCount()) > 0;
  }

  async getLastVisitCount() {
    const yesterDay = LocalDate.now().minusDays(1);
    return await this.createQueryBuilder('user')
      .where('user.last_check_in >= :dateS AND user.last_check_in <= :dateE', {
        dateS: `${yesterDay['_year']}-${yesterDay['_month']}-${yesterDay['_day']} 00:00:00`,
        dateE: `${yesterDay['_year']}-${yesterDay['_month']}-${yesterDay['_day']} 23:59:59`,
      })
      .getCount();
  }
}
