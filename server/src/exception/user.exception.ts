import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class UserException {
  static userNotFound(): HttpException {
    return new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: '사용자를 찾을 수 없습니다.',
    });
  }

  static userLoginInfoNotCorrect(): HttpException {
    return new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '입력하신 사용자 정보가 올바르지 않습니다.',
    });
  }

  static userIsExist(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '이미 존재하는 회원입니다.',
    });
  }
}
