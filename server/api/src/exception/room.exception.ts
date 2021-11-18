import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class RoomException {
  static roomNotFound(): HttpException {
    return new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: '해당되는 방을 찾을 수 없습니다.',
    });
  }

  static roomExistError(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '현재 계정으로 생성된 방이 존재합니다.',
    });
  }

  static roomCreateError(): HttpException {
    return new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '방 생성중 오류가 발생했습니다.',
    });
  }

  static roomDeleteError(): HttpException {
    return new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '방 삭제중 오류가 발생했습니다.',
    });
  }

  static roomJoinError(): HttpException {
    return new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '방 참여중 오류가 발생했습니다.',
    });
  }

  static roomLeaveError(): HttpException {
    return new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '방 퇴장중 오류가 발생했습니다.',
    });
  }

  static roomFullError(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '방의 참여자가 가득찼습니다.',
    });
  }
}
