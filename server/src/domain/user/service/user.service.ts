import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bcrypt } from 'src/utils/bcrypt';
import { User } from '../user.entity';
import { DevFieldRepository } from '../repository/dev-field.repository';
import { AuthRepository } from '../../auth/auth.repository';
import { UserUpdateDto } from '../dto/user-update.dto';
import { ImageService } from '../../image/service/image.service';
import { DevField } from '../dev-field.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    @InjectRepository(DevFieldRepository)
    private readonly devFileldRepository: DevFieldRepository,
    private readonly imageService: ImageService,
  ) {}

  async getUserInfo(id: string): Promise<User> {
    return await this.authRepository.findUserByNickname(id);
  }

  async updateUserInfo(id: string, userUpdateDto: UserUpdateDto) {
    console.log(123);
    const updateUser: User = await this.authRepository.findUserByNickname(id);
    console.log(updateUser);
    const newDevField: DevField = await this.devFileldRepository.findDevById(userUpdateDto.devField);
    // //추가 작업 필요
    // updateUser.setNickname(userUpdateDto.nickname);
    // updateUser.setPassword(userUpdateDto.password);
    // updateUser.setIntroduction(userUpdateDto.introduction);
    // updateUser.setDevField(newDevField);
    // await this.authRepository.save(updateUser);
    return true;
  }

  async updateImage(id: string, file) {
    const updateUser: User = await this.authRepository.findUserByNickname(id);
    if (!updateUser) throw new UnauthorizedException();
    const imageUrl = await this.imageService.uploadImage(file);
    updateUser.setImageUrl(imageUrl.Location);
    await this.authRepository.save(updateUser);
    return imageUrl.Location;
  }
}
