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
    return await this.findOne({ where: { nickName: nickname } });
  }

  async findUserByNicknameWithDev(nickname: string): Promise<User | undefined> {
    return await this.findOne({ where: { nickName: nickname }, relations: ['devField'] });
  }

  async exists(user): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user')
        .where('user.nick_name = :nickname OR user.email = :email', {
          nickname: user.nickname,
          email: user.email,
        })
        .getCount()) > 0
    );
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
