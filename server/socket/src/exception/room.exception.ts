import { WsException } from '@nestjs/websockets';

export class RoomException {
  static roomCreateError(): WsException {
    return new WsException('방 생성중 오류가 발생했습니다.');
  }

  static roomVerifyError(): WsException {
    return new WsException('방 검증중 오류가 발생했습니다.');
  }

  static roomNotFound(): WsException {
    return new WsException('해당되는 방을 찾을 수 없습니다.');
  }
}
