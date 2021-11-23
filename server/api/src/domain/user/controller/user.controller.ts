import {
  Body,
  Controller,
  Req,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { UserService } from '../service/user.service';
import { HistoryService } from 'src/domain/history/service/history.service';
import { UserUpdateDto } from '../dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly historyService: HistoryService) {}

  @Get('/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Param('userId') nickname: string) {
    return { result: await this.userService.getUserInfo(nickname) };
  }

  @Patch('/:userId')
  @UseGuards(JwtAuthGuard)
  async patchUserInfo(@Param('userId') nickname: string, @Body() userUpdateDto: UserUpdateDto) {
    return { result: await this.userService.updateUserInfo(nickname, userUpdateDto) };
  }

  @Get('/:userId/log')
  @UseGuards(JwtAuthGuard)
  async getUserLog(@Param('userId') nickname: string) {
    return { result: await this.historyService.getHistory(nickname) };
  }

  @Post('/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    return { result: await this.userService.updateImage(req.user['email'], file) };
  }

  @Patch('/:userId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async patchUserImage(@Param('userId') nickname: string, @UploadedFile() file: Express.Multer.File) {
    return { result: await this.userService.updateImage(nickname, file) };
  }

  @Delete('/:userId/image')
  @UseGuards(JwtAuthGuard)
  async deleteUserImage(@Param('userId') nickname: string) {
    return { result: await this.userService.deleteImage(nickname) };
  }

  @Post('/:userId/time')
  @UseGuards(JwtAuthGuard)
  addUserPlayTime(@Param('userId') id: string): void {
    return;
  }

  @Get('/:userId/follows')
  @UseGuards(JwtAuthGuard)
  getUserFollowList(@Param('userId') id: string): void {
    return;
  }

  @Post('/:userId/follows')
  @UseGuards(JwtAuthGuard)
  addUserFollow(@Param('userId') id: string): void {
    return;
  }

  @Delete('/:userId/follows')
  @UseGuards(JwtAuthGuard)
  deleteUserFollow(@Param('userId') id: string): void {
    return;
  }
}
