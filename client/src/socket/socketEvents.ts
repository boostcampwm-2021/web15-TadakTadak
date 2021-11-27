export enum SocketEvents {
  sendMsg = 'msgToServer',
  receiveMsg = 'msgToClient',
  kickUser = 'kick-room',
  joinRoom = 'join-room',
  leaveRoom = 'leave-room',
  receiveUserList = 'user-list',
  canIEnter = 'verify-room',
  youCanEnter = 'is-verify',
  deleteRoom = 'remove-room',
}
