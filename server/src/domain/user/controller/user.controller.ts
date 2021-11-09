import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/:userId')
  getUserInfo(@Param('userId') id): string {
    return this.userService.getUserInfo();
  }

  @Patch('/:userId')
  patchUserInfo(@Param('userId') id): void {
    return;
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
