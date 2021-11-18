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
  handleJoinRoom(client: Socket, { field, img, nickname, roomId }: IRoomRequest): void {
    client.join(roomId);
    if (!this.userList[roomId]) this.userList[roomId] = {};
    this.userList[roomId][nickname] = {
      field: field,
      img: img,
      socket: client,
    };
    this.server.to(roomId).emit('user-list', this.userList[roomId]);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, { nickname, roomId }: IRoomRequest): void {
    client.leave(roomId);
    delete this.userList[roomId][nickname];
    this.server.to(roomId).emit('user-list', this.userList[roomId]);
  }

  @SubscribeMessage('kick-room')
  handleKickRoom(client: Socket, { roomId, kickNickname }: IRoomRequest): void {
    if (!kickNickname) return;
    delete this.userList[roomId][kickNickname];
    this.userList[roomId][kickNickname].socket.emit('kicked');
    this.server.to(roomId).emit('user-list', this.userList[roomId]);
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
