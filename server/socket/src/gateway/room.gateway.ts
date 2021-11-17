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

@WebSocketGateway({ cors: true })
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  userList: { [key: string]: any } = {}; // = 공용 Redis

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, { roomId, message }: IMessage): void {
    this.server.to(roomId).emit('msgToClient', message);
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
