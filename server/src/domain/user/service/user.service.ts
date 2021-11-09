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
