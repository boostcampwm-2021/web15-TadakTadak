import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  userList = {};
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(payload);
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, payload): void {
    client.join(payload.roomId);
    this.logger.log(`${payload.nickname}님이 ${payload.roomId}에 입장!! 🎉✨🎊`);
    if (!this.userList[payload.roomId]) this.userList[payload.roomId] = {};
    const userInfo = {
      field: payload.field,
      img: payload.img,
    };
    this.userList[payload.roomId][payload.nickname] = userInfo;
    this.server.to(payload.roomId).emit('user-list', this.userList[payload.roomId]);
  }
  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, payload): void {
    client.leave(payload.roomId);
    this.logger.log(`${payload.nickname}님이 ${payload.roomId}에서 퇴장!! 😭😥😫`);
    delete this.userList[payload.roomId][payload.nickname];
    this.server.to(payload.roomId).emit('user-list', this.userList[payload.roomId]);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
