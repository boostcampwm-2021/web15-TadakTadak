import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(userId: number): Promise<User> {
    return this.findOneOrFail({ where: { id: userId } });
  }
}
