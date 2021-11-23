import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { IMessage, IRoomRequest } from './room.interface';
import { LocalDateTime } from '@js-joda/core';

@WebSocketGateway({ cors: true })
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  userList: { [key: string]: any } = {}; // = 공용 Redis

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, { roomId, message, nickname }: IMessage): void {
    const emitMessage: IMessage = {
      message: message,
      time: LocalDateTime.now(),
      nickname: nickname,
      roomId: roomId,
    };
    this.server.to(roomId).emit('msgToClient', emitMessage);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, { field, img, nickname, roomId, maxHead }: IRoomRequest): void {
    client.leave(client.id); //verify-room에서 생성한 룸을 삭제합니다. 이제 사용될 일이 없어서..
    client.join(roomId);
    if (!this.userList[roomId]) this.userList[roomId] = { list: {}, maxHead: maxHead };
    this.userList[roomId]['list'][nickname] = {
      field: field,
      img: img,
    };
    this.server.to(roomId).emit('user-list', this.userList[roomId]['list']);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, { nickname, roomId }: IRoomRequest): void {
    client.leave(roomId);
    delete this.userList[roomId]['list'][nickname];
    this.server.to(roomId).emit('user-list', this.userList[roomId]['list']);
  }

  @SubscribeMessage('kick-room')
  handleKickRoom(client: Socket, { roomId, kickNickname }: IRoomRequest): void {
    if (!kickNickname) return;
    delete this.userList[roomId]['list'][kickNickname];
    this.server.to(roomId).emit('user-list', this.userList[roomId]['list']);
  }

  @SubscribeMessage('verify-room')
  handleVerifyRoom(client: Socket, { roomId }: IRoomRequest): void {
    client.join(client.id); //해당 사용자한테만 전송될 수 있게
    if (!this.userList[roomId]) {
      this.server.to(client.id).emit('is-verify', true);
      return;
    }
    if (Object.keys(this.userList[roomId]['list']).length < this.userList[roomId]['maxHead']) {
      this.server.to(client.id).emit('is-verify', true);
      return;
    }

    this.server.to(client.id).emit('is-verify', false);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
