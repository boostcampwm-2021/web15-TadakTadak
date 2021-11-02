import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
