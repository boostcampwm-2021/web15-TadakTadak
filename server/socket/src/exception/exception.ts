export enum Exception {
  // CLIENT Exception
  clientNotFound = '해당되는 클라이언트 ID를 찾을 수 없습니다.',
  clientUnauthorized = '해당되는 클라이언트는 권한이 없습니다.',

  // ROOM Exception
  roomCreateError = '방 생성중 오류가 발생했습니다.',
  roomVerifyError = '방 검증중 오류가 발생했습니다.',
  roomNotFound = '해당되는 방을 찾을 수 없습니다.',
}
