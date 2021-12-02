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

  static userEmailIsExist(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '이미 존재하는 이메일입니다.',
    });
  }

  static userNicknameIsExist(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '이미 존재하는 닉네임입니다.',
    });
  }

  static userUnauthorized(): HttpException {
    return new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '해당 유저에 권한이 없습니다.',
    });
  }
}
