import { WsException } from '@nestjs/websockets';

export class ClientException {
  static clientNotFound(): WsException {
    return new WsException('해당되는 클라이언트 ID를 찾을 수 없습니다.');
  }

  static clientUnauthorized(): WsException {
    return new WsException('해당되는 클라이언트는 권한이 없습니다.');
  }
}
