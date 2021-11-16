import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException, DevFieldException } from '../../../exception';
import { User } from '../user.entity';
import { DevField } from '../dev-field.entity';
import { ImageService } from '../../image/service/image.service';
import { DevFieldRepository } from '../repository/dev-field.repository';
import { AuthRepository } from '../../auth/auth.repository';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserResponseDto } from 'src/domain/auth/dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    @InjectRepository(DevFieldRepository)
    private readonly devFieldRepository: DevFieldRepository,
    private readonly imageService: ImageService,
  ) {}

  async getUserInfo(nickname: string): Promise<UserResponseDto> {
    const user: User = await this.authRepository.findUserByNickname(nickname);
    if (!user) throw UserException.userNotFound();
    return new UserResponseDto(user);
  }

  async updateUserInfo(nickname: string, userUpdateDto: UserUpdateDto) {
    const updateUser: User = await this.authRepository.findUserByNickname(nickname);
    if (!updateUser) throw UserException.userNotFound();
    const newDevField: DevField = await this.devFieldRepository.findDevById(userUpdateDto.devField);
    if (!newDevField) throw DevFieldException.devFieldNotFound();
    updateUser.setNickname(userUpdateDto.nickname);
    updateUser.setPassword(userUpdateDto.password);
    updateUser.setIntroduction(userUpdateDto.introduction);
    updateUser.setDevField(newDevField);
    await this.authRepository.save(updateUser);
    return true;
  }

  async updateImage(nickname: string, file) {
    const updateUser: User = await this.authRepository.findUserByNickname(nickname);
    if (!updateUser) throw UserException.userNotFound();
    if (updateUser.imageName) await this.imageService.deleteImage(updateUser.imageName);
    const imageInfo = await this.imageService.uploadImage(file);
    updateUser.setImageUrl(imageInfo.Location);
    updateUser.setImageName(imageInfo.key);
    await this.authRepository.save(updateUser);
    return updateUser.imageUrl;
  }

  async deleteImage(nickname: string) {
    const updateUser: User = await this.authRepository.findUserByNickname(nickname);
    if (!updateUser) throw UserException.userNotFound();
    if (!updateUser.imageName) return true;
    await this.imageService.deleteImage(updateUser.imageName);
    updateUser.setImageUrl('');
    updateUser.setImageName('');
    await this.authRepository.save(updateUser);
    return true;
  }
}
