import {
  Body,
  Controller,
  Req,
  Delete,
  Get,
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
import { HistoryService } from '../../history/service/history.service';
import { UserUpdateDto } from '../dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly historyService: HistoryService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  async patchUserInfo(@Req() req: Request, @Body() userUpdateDto: UserUpdateDto) {
    return { result: await this.userService.updateUserInfo(req.user['email'], userUpdateDto) };
  }

  @Get('/log/year')
  @UseGuards(JwtAuthGuard)
  async getUserLogYearly(@Req() req: Request) {
    return { result: await this.historyService.getYearHistory(req.user['email']) };
  }

  @Get('/log/month')
  @UseGuards(JwtAuthGuard)
  async getUserLogMonthly(@Req() req: Request) {
    return { result: await this.historyService.getMonthHistory(req.user['email']) };
  }

  @Post('/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    return { result: await this.userService.updateImage(req.user['email'], file) };
  }

  @Delete('/image')
  @UseGuards(JwtAuthGuard)
  async deleteUserImage(@Req() req: Request) {
    return { result: await this.userService.deleteImage(req.user['email']) };
  }
}
