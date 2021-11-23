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
import { pubClient, subClient } from '../redis.adapter';
import { pubClient } from '../redis.adapter';

@WebSocketGateway({ cors: true })
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
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
    this.server.to(roomId).emit(RoomEvent.MsgToClient, emitMessage);
  }

  @SubscribeMessage('join-room')
    this.server.to(roomId).emit('user-list', this.userList[roomId]['list']);
  handleJoinRoom(client: Socket, { field, img, nickname, uuid, maxHead }: IRoomRequest): void {
    client.leave(client.id);
    client.join(uuid);
    pubClient.get(uuid, (err, data) => {
      if (err) throw WsException;
      const newRoom = Object({ maxHead: maxHead, userList: {} });
      newRoom.userList = Object({ [nickname]: { img, field } });
      if (!data) {
        pubClient.set(uuid, JSON.stringify(newRoom));
      } else {
        const prevRoom = JSON.parse(data);
        prevRoom.userList[nickname] = Object({ img, field });
        pubClient.set(uuid, JSON.stringify(prevRoom));
      }
      pubClient.get(uuid, (err, data) => {
        if (typeof data === 'string') {
        }
      });
      return;
    });
  }

  @SubscribeMessage('leave-room')
    this.server.to(roomId).emit('user-list', this.userList[roomId]['list']);
  handleLeaveRoom(client: Socket, { nickname, uuid }: IRoomRequest): void {
    client.leave(uuid);
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw WsException;
      const prevRoom: any = JSON.parse(data);
      const numberOfUsers: number = Object.keys(prevRoom['userList']).length;
      if (numberOfUsers == 1) {
        pubClient.del(uuid);
        return;
      }
      delete prevRoom['userList'][nickname];
      pubClient.set(uuid, JSON.stringify(prevRoom));
      pubClient.get(uuid, (err, data) => {
        if (typeof data === 'string') {
        }
      });
      return;
    });
  }

  @SubscribeMessage('kick-room')
  handleKickRoom(client: Socket, { uuid, kickNickname }: IRoomRequest): void {
    if (!kickNickname) return;
    this.server.to(roomId).emit('user-list', this.userList[roomId]['list']);
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw WsException;
      const prevRoom = JSON.parse(data);
      delete prevRoom['userList'][kickNickname];
      pubClient.set(uuid, JSON.stringify(prevRoom));
      pubClient.get(uuid, (err, data) => {
        if (typeof data === 'string') {
        }
      });
      return;
    });
  }

  @SubscribeMessage('verify-room')
      this.server.to(client.id).emit('is-verify', true);
      this.server.to(client.id).emit('is-verify', true);
  handleRemoveRoom(client: Socket, { uuid }: IRoomRequest): void {
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw WsException;
      pubClient.del(uuid);
    });
  }

    this.server.to(client.id).emit('is-verify', false);
  handleVerifyRoom(client: Socket, { uuid }: IRoomRequest): void {
    client.join(client.id);
    pubClient.get(uuid, (err, data) => {
      if (err) return WsException;
      if (!data) {
        return;
      }
      const room: any = JSON.parse(data);
      const numberOfUsers: number = Object.keys(room['userList']).length;
      if (numberOfUsers < room.maxHead) {
        return;
      }
    });
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
