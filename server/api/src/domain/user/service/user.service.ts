import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException, DevFieldException } from '../../../exception';
import { User } from '../user.entity';
import { DevField } from '../../field/dev-field.entity';
import { ImageService } from '../../image/service/image.service';
import { DevFieldRepository } from '../../field/repository/dev-field.repository';
import { UserRepository } from '../repository/user.repository';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserResponseDto } from '../../auth/dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly authRepository: UserRepository,
    @InjectRepository(DevFieldRepository)
    private readonly devFieldRepository: DevFieldRepository,
    private readonly imageService: ImageService,
  ) {}

  async getUserInfo(nickname: string): Promise<UserResponseDto> {
    const user: User = await this.authRepository.findUserByNicknameWithDev(nickname);
    if (!user) throw UserException.userNotFound();
    return new UserResponseDto(user);
  }

  async updateUserInfo(nickname: string, userUpdateDto: UserUpdateDto) {
    const updateUser: User = await this.authRepository.findUserByNickname(nickname);
    if (!updateUser) throw UserException.userNotFound();
    const sameNickname: boolean = nickname === userUpdateDto.nickname;
    if (!sameNickname) {
      const existUser: User = await this.authRepository.findUserByNickname(userUpdateDto.nickname);
      if (existUser) throw UserException.userIsExist();
    }
    const newDevField: DevField = await this.devFieldRepository.findDevById(userUpdateDto.devField);
    if (!newDevField) throw DevFieldException.devFieldNotFound();
    updateUser.setNickname(userUpdateDto.nickname);
    updateUser.setDevField(newDevField);
    await this.authRepository.save(updateUser);
    //빌더 적용하기
    return new UserResponseDto(updateUser);
  }

  async updateImage(email: string, file) {
    const updateUser: User = await this.authRepository.findUserByEmailWithDev(email);
    if (!updateUser) throw UserException.userNotFound();
    if (updateUser.imageName) await this.imageService.deleteImage(updateUser.imageName);
    const imageInfo = await this.imageService.uploadImage(file);
    updateUser.setImageUrl(imageInfo.Location);
    updateUser.setImageName(imageInfo.key);
    await this.authRepository.save(updateUser);
    //빌더 적용 하기
    return new UserResponseDto(updateUser);
  }

  async deleteImage(email: string) {
    const updateUser: User = await this.authRepository.findUserByEmailWithDev(email);
    if (!updateUser) throw UserException.userNotFound();
    if (!updateUser.imageName) return true;
    await this.imageService.deleteImage(updateUser.imageName);
    updateUser.setImageUrl(process.env.DEFAULT_IMG);
    updateUser.setImageName('');
    await this.authRepository.save(updateUser);
    return new UserResponseDto(updateUser);
  }
}
