import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class DevFieldException {
  static devFieldNotFound(): HttpException {
    return new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: '해당되는 개발 분야를 찾을 수 없습니다.',
    });
  }
}
