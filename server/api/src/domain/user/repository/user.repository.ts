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
}
