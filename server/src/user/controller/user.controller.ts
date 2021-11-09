import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async getUserInfo(@Param('userId') id) {
    return { result: await this.userService.getUserInfo(id) };
  }

  @Patch('/:userId')
  async patchUserInfo(@Param('userId') id, @Body() userUpdateDto: UserUpdateDto) {
    return { result: await this.userService.updateUserInfo(id, userUpdateDto) };
  }

  @Get('/:userId/log')
  getUserLog(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/log')
  addUserLog(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/image')
  uploadUserImage(@Param('userId') id): void {
    return;
  }

  @Patch('/:userId/image')
  patchUserImage(@Param('userId') id): void {
    return;
  }

  @Delete('/:userId/image')
  deleteUserImage(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/time')
  addUserPlayTime(@Param('userId') id): void {
    return;
  }

  @Get('/:userId/follows')
  getUserFollowList(@Param('userId') id): void {
    return;
  }

  @Post('/:userId/follows')
  addUserFollow(@Param('userId') id): void {
    return;
  }

  @Delete('/:userId/follows')
  deleteUserFollow(@Param('userId') id): void {
    return;
  }
}
