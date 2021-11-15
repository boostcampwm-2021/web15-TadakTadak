import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(userId: number): Promise<User> {
    return this.findOne({ where: { id: userId } });
  }

  async findUserByUserEmail(email: string): Promise<User> {
    return this.findOne({ where: { email: email } });
  }
}
