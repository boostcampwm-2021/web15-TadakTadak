import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bcrypt } from 'src/utils/bcrypt';
import { User } from '../user.entity';
import { DevFieldRepository } from '../repository/dev-field.repository';
import { AuthRepository } from '../../auth/auth.repository';
import { UserUpdateDto } from '../dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    @InjectRepository(DevFieldRepository)
    private readonly devFileldRepository: DevFieldRepository,
  ) {}

  async getUserInfo(id: string): Promise<User> {
    return await this.authRepository.findUserByNickname(id);
  }

  async updateUserInfo(id: string, userUpdateDto: UserUpdateDto) {
    const updateUser: User = await this.authRepository.findUserByNickname(id);
    //추가 작업 필요
    updateUser.nickName = userUpdateDto.nickname;
    updateUser.introduction = userUpdateDto.introduction;
    updateUser.devField = await this.devFileldRepository.findDevById(userUpdateDto.devField);
    if (updateUser.password !== userUpdateDto.password) updateUser.password = Bcrypt.hash(userUpdateDto.password);
    await this.authRepository.save(updateUser);
    return true;
  }
}
