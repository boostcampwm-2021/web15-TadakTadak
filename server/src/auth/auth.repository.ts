import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async hi(): Promise<string> {
    //아무런 함수도 존재하지 않으면 eslint 때문에 컴파일이 되지 않아
    //우선 임의로 하나 넣었습니다.
    return 'hi';
  }
}
