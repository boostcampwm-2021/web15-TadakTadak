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
import { pubClient } from '../redis.adapter';
import { RoomEvent } from './room.event';
import axios from 'axios';
import { baseURL } from '../constant/url.constant';
import { RoomException } from '../exception/room.exception';
import { ClientException } from '../exception/client.exception';

@WebSocketGateway({ cors: true })
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage(RoomEvent.MsgToServer)
  handleMessage(client: Socket, { uuid, message, nickname }: IMessage): void {
    const emitMessage: IMessage = {
      message: `${message} from ${process.env.NODE_PORT}`,
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
      if (err) throw RoomException.roomCreateError();
      if (!data) {
        // Create new Room
        const newRoom = Object({ maxHead: maxHead, owner: client.id, userList: {}, kickList: {} });
        newRoom.userList = Object({ [client.id]: { nickname, img, field } });
        pubClient.set(uuid, JSON.stringify(newRoom));
      } else {
        // Update Room
        const findRoom = JSON.parse(data);
        findRoom.userList[client.id] = Object({ nickname, img, field });
        pubClient.set(uuid, JSON.stringify(findRoom));
      }
      pubClient.set(client.id, uuid);
      pubClient.get(uuid, (err, data) => {
        if (typeof data === 'string') {
          this.server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
        }
      });
      return;
    });
  }

  @SubscribeMessage(RoomEvent.LeaveRoom)
  handleLeaveRoom(client: Socket, { uuid }: IRoomRequest): void {
    client.leave(uuid);
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw RoomException.roomNotFound();
      const findRoom = JSON.parse(data);
      const findMyNickname = findRoom['userList'][client.id].nickname;
      const numberOfUsers = Object.keys(findRoom['userList']).length;
      if (numberOfUsers === 1 || findRoom.owner === findMyNickname) {
        pubClient.del(uuid);
        return;
      }
      delete findRoom['userList'][client.id];
      pubClient.set(uuid, JSON.stringify(findRoom));
      pubClient.del(client.id);
      pubClient.get(uuid, (err, data) => {
        if (err || !data) throw RoomException.roomNotFound();
        this.server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
      });
      return;
    });
  }

  @SubscribeMessage(RoomEvent.KickRoom)
  handleKickRoom(client: Socket, { uuid, kickNickname }: IRoomRequest): void {
    if (!kickNickname) return;
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw RoomException.roomNotFound();
      const findRoom = JSON.parse(data);
      const findOwnerNickname = findRoom['userList'][findRoom.owner].nickname;
      const findMyNickname = findRoom['userList'][client.id].nickname;
      if (findOwnerNickname !== findMyNickname) throw ClientException.clientUnauthorized();
      for (const userInfo of Object.entries(findRoom.userList)) {
        const socketId: string = userInfo[0];
        const socketData: any = userInfo[1];
        if (socketData.nickname === kickNickname) {
          delete findRoom['userList'][socketId];
          findRoom.kickList[kickNickname] = Object({ time: LocalDateTime.now() });
          pubClient.del(socketId);
          break;
        }
      }
      pubClient.set(uuid, JSON.stringify(findRoom));
      pubClient.get(uuid, (err, data) => {
        if (err || !data) throw RoomException.roomNotFound();
        this.server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
      });
      return;
    });
  }

  @SubscribeMessage(RoomEvent.RemoveRoom)
  handleRemoveRoom(client: Socket, { uuid }: IRoomRequest): void {
    client.leave(uuid);
    pubClient.get(uuid, (err, data) => {
      if (err || !data) throw RoomException.roomNotFound();
      const findRoom = JSON.parse(data);
      const findMyNickname = findRoom['userList'][client.id].nickname;
      if (findRoom.owner === findMyNickname) {
        for (const userInfo of Object.entries(findRoom.userList)) {
          const socketId: string = userInfo[0];
          pubClient.del(socketId);
        }
        pubClient.del(uuid);
        this.server.to(uuid).emit(RoomEvent.UserList, {});
      }
    });
  }

  @SubscribeMessage(RoomEvent.VerifyRoom)
  handleVerifyRoom(client: Socket, { uuid, nickname }: IRoomRequest): void {
    client.join(client.id);
    pubClient.get(client.id, (err, data) => {
      if (err) throw RoomException.roomVerifyError();
      if (data) {
        this.server.to(client.id).emit(RoomEvent.IsVerify, false);
        return;
      }
      pubClient.get(uuid, (err, data) => {
        if (err) throw RoomException.roomVerifyError();
        if (!data) {
          this.server.to(client.id).emit(RoomEvent.IsVerify, true);
          return;
        }
        const findRoom: any = JSON.parse(data);
        const isKickUser = findRoom.kickList[nickname];
        if (isKickUser) {
          this.server.to(client.id).emit(RoomEvent.IsVerify, false);
          return;
        }
        const numberOfUsers: number = Object.keys(findRoom['userList']).length;
        if (numberOfUsers < findRoom.maxHead) {
          this.server.to(client.id).emit(RoomEvent.IsVerify, true);
          return;
        }
        this.server.to(client.id).emit(RoomEvent.IsVerify, false);
      });
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
    pubClient.get(client.id, (err, uuid) => {
      if (err || !uuid) throw ClientException.clientNotFound();
      pubClient.get(uuid, async (err, data) => {
        if (err || !data) throw RoomException.roomNotFound();
        const findRoom = JSON.parse(data);
        const findMyNickname = findRoom['userList'][client.id].nickname;
        if (findMyNickname === findRoom.owner) {
          for (const userInfo of Object.entries(findRoom.userList)) {
            const socketId: string = userInfo[0];
            pubClient.del(socketId);
          }
          pubClient.del(uuid);
          await axios.delete(`${baseURL}/api/room/socket/${uuid}`, {
            headers: {
              'socket-secret-key': process.env.SOCKET_SECRET_KEY ?? '',
            },
          });
          this.server.to(uuid).emit(RoomEvent.UserList, {});
        } else {
          for (const userInfo of Object.entries(findRoom.userList)) {
            const socketId: string = userInfo[0];
            const socketData: any = userInfo[1];
            if (socketData.nickname === findMyNickname) {
              delete findRoom['userList'][socketId];
              pubClient.del(socketId);
              break;
            }
          }
          pubClient.set(uuid, JSON.stringify(findRoom));
          pubClient.get(uuid, (err, data) => {
            if (err || !data) throw RoomException.roomNotFound();
            this.server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
          });
        }
      });
    });
  }
}
