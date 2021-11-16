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

  updateCheckIn() {
    getConnection()
      .createQueryBuilder()
      .update(User)
      // .set({ isToday: false }) 이 부분은 변경 예정이라 일단 주석처리 했습니다. 오늘처리 해서 올릴게영
      .where('isToday = :checkIn', { checkIn: true })
      .execute();
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email: email }, relations: ['devField'] });
  }

  async findUserByNickname(nickname: string): Promise<User | undefined> {
    return await this.findOne({ where: { nickName: nickname }, relations: ['devField'] });
  }
}
