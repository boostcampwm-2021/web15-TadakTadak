import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/auth.repository';
import { DevFieldRepository } from '../dev-field.repository';
import { UserUpdateDto } from '../dto/user-update.dto';
import { Bcrypt } from 'src/utils/bcrypt';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    @InjectRepository(DevFieldRepository)
    private readonly devFileldRepository: DevFieldRepository,
  ) {}
  async getUserInfo(id: string) {
    return await this.authRepository.findOneOrFail({ where: { nickName: id }, relations: ['devField'] });
  }
}
