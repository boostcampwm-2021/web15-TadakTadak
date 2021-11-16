import { LocalDate } from 'js-joda';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { User } from '../user/user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
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

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email: email }, relations: ['devField'] });
  }

  async findUserByNickname(nickname: string): Promise<User | undefined> {
    return await this.findOne({ where: { nickName: nickname }, relations: ['devField'] });
  }

  async getLastVisitCount() {
    const yesterDay = LocalDate.now().minusDays(1);
    return await this.createQueryBuilder('user')
      .where('user.last_check_in >= :dateS AND user.last_check_in <= :dateE', {
        dateS: `${yesterDay['_year']}${yesterDay['_month']}${yesterDay['_day']} 00:00:00`,
        dateE: `${yesterDay['_year']}${yesterDay['_month']}${yesterDay['_day']} 23:59:59`,
      })
      .getCount();
  }
}
