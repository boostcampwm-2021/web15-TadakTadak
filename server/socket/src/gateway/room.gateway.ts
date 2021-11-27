import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { IMessage, IRoomRequest } from './room.interface';
import { LocalDateTime } from '@js-joda/core';
import { pubClient, subClient } from '../redis.adapter';
import { RoomEvent } from './room.event';

@WebSocketGateway({ cors: true })
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage(RoomEvent.MsgToServer)
  handleMessage(client: Socket, { uuid, message, nickname }: IMessage): void {
    const emitMessage: IMessage = {
      message: message + process.env.NODE_PORT,
      time: LocalDateTime.now(),
      nickname: nickname,
      uuid: uuid,
    };
    this.server.to(uuid).emit(RoomEvent.MsgToClient, emitMessage);
  }

  @SubscribeMessage(RoomEvent.JoinRoom)
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
          this.server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
        }
      });
      return;
    });
  }

  @SubscribeMessage(RoomEvent.LeaveRoom)
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
          this.server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
        }
      });
      return;
    });
  }

  @SubscribeMessage(RoomEvent.KickRoom)
  handleKickRoom(client: Socket, { uuid, kickNickname }: IRoomRequest): void {
    if (!kickNickname) return;
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw WsException;
      const prevRoom = JSON.parse(data);
      delete prevRoom['userList'][kickNickname];
      pubClient.set(uuid, JSON.stringify(prevRoom));
      pubClient.get(uuid, (err, data) => {
        if (typeof data === 'string') {
          this.server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
        }
      });
      return;
    });
  }

  @SubscribeMessage(RoomEvent.RemoveRoom)
  handleRemoveRoom(client: Socket, { uuid }: IRoomRequest): void {
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw WsException;
      pubClient.del(uuid);
      this.server.to(uuid).emit(RoomEvent.UserList, {});
    });
  }

  @SubscribeMessage(RoomEvent.VerifyRoom)
  handleVerifyRoom(client: Socket, { uuid }: IRoomRequest): void {
    client.join(client.id);
    pubClient.get(uuid, (err, data) => {
      if (err) return WsException;
      if (!data) {
        this.server.to(client.id).emit(RoomEvent.IsVerify, true);
        return;
      }
      const room: any = JSON.parse(data);
      const numberOfUsers: number = Object.keys(room['userList']).length;
      if (numberOfUsers < room.maxHead) {
        this.server.to(client.id).emit(RoomEvent.IsVerify, true);
        return;
      }
      this.server.to(client.id).emit(RoomEvent.IsVerify, false);
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    subClient.on('message', (channel: string, message: string) => {
      client.emit(channel, message);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
