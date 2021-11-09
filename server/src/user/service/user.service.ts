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

  async updateUserInfo(id: string, userUpdateDto: UserUpdateDto) {
    const user: User = await this.authRepository.findOneOrFail({ where: { nickName: id } });
    user.nickName = userUpdateDto.nickname;
    user.introduction = userUpdateDto.introduction;
    user.devField = await this.devFileldRepository.findOneOrFail({ where: { id: userUpdateDto.devField } });
    if (user.password !== userUpdateDto.password) user.password = Bcrypt.hash(userUpdateDto.password);
    await this.authRepository.save(user);
    return true;
  }
}
