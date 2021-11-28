import { Injectable } from '@nestjs/common';
import { pubClient as Redis } from '../redis.adapter';
import { RoomException } from '../exception/room.exception';
import { RoomEvent } from './room.event';
import { Server, Socket } from 'socket.io';
import { IRoomRequest } from './room.interface';
import { ClientException } from '../exception/client.exception';
import { LocalDateTime } from '@js-joda/core';
import axios from 'axios';
import { baseURL } from '../constant/url.constant';

@Injectable()
export class RoomService {
  joinRoom(client: Socket, server: Server, { field, img, nickname, uuid, maxHead }: IRoomRequest) {
    Redis.get(uuid, (err, data) => {
      if (err) throw RoomException.roomCreateError();
      if (!data) {
        // Create new Room
        const newRoom = Object({ maxHead: maxHead, owner: client.id, userList: {}, kickList: {} });
        newRoom.userList = Object({ [client.id]: { nickname, img, field } });
        Redis.set(uuid, JSON.stringify(newRoom));
      } else {
        // Update Room
        const findRoom = JSON.parse(data);
        findRoom.userList[client.id] = Object({ nickname, img, field });
        Redis.set(uuid, JSON.stringify(findRoom));
      }
      Redis.set(client.id, uuid);
      Redis.get(uuid, (err, data) => {
        if (typeof data === 'string') {
          server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
        }
      });
      return;
    });
  }

  leaveRoom(client: Socket, server: Server, uuid: string) {
    Redis.get(uuid, (err, data) => {
      if (err || !data) throw RoomException.roomNotFound();
      const findRoom = JSON.parse(data);
      const findMyNickname = findRoom['userList'][client.id].nickname;
      const numberOfUsers = Object.keys(findRoom['userList']).length;
      if (numberOfUsers === 1 || findRoom.owner === findMyNickname) {
        Redis.del(uuid);
        return;
      }
      delete findRoom['userList'][client.id];
      Redis.set(uuid, JSON.stringify(findRoom));
      Redis.del(client.id);
      Redis.get(uuid, (err, data) => {
        if (err || !data) throw RoomException.roomNotFound();
        server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
      });
      return;
    });
  }

  kickRoom(client: Socket, server: Server, uuid: string, kickNickname: string) {
    Redis.get(uuid, (err, data) => {
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
          Redis.del(socketId);
          break;
        }
      }
      Redis.set(uuid, JSON.stringify(findRoom));
      Redis.get(uuid, (err, data) => {
        if (err || !data) throw RoomException.roomNotFound();
        server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
      });
      return;
    });
  }

  removeRoom(client: Socket, server: Server, uuid: string) {
    client.leave(uuid);
    Redis.get(uuid, (err, data) => {
      if (err || !data) throw RoomException.roomNotFound();
      const findRoom = JSON.parse(data);
      const findMyNickname = findRoom['userList'][client.id].nickname;
      if (findRoom.owner === findMyNickname) {
        for (const userInfo of Object.entries(findRoom.userList)) {
          const socketId: string = userInfo[0];
          Redis.del(socketId);
        }
        Redis.del(uuid);
        server.to(uuid).emit(RoomEvent.UserList, {});
      }
    });
  }

  verifyRoom(client: Socket, server: Server, uuid: string, nickname: string) {
    Redis.get(client.id, (err, data) => {
      if (err) throw RoomException.roomVerifyError();
      if (data) {
        server.to(client.id).emit(RoomEvent.IsVerify, false);
        return;
      }
      Redis.get(uuid, (err, data) => {
        if (err) throw RoomException.roomVerifyError();
        if (!data) {
          server.to(client.id).emit(RoomEvent.IsVerify, true);
          return;
        }
        const findRoom: any = JSON.parse(data);
        const isKickUser = findRoom.kickList[nickname];
        if (isKickUser) {
          server.to(client.id).emit(RoomEvent.IsVerify, false);
          return;
        }
        const numberOfUsers: number = Object.keys(findRoom['userList']).length;
        if (numberOfUsers < findRoom.maxHead) {
          server.to(client.id).emit(RoomEvent.IsVerify, true);
          return;
        }
        server.to(client.id).emit(RoomEvent.IsVerify, false);
      });
    });
  }

  disconnectClient(client: Socket, server: Server) {
    Redis.get(client.id, (err, uuid) => {
      if (err || !uuid) throw ClientException.clientNotFound();
      Redis.get(uuid, async (err, data) => {
        if (err || !data) throw RoomException.roomNotFound();
        const findRoom = JSON.parse(data);
        const findMyNickname = findRoom['userList'][client.id].nickname;
        if (findMyNickname === findRoom.owner) {
          for (const userInfo of Object.entries(findRoom.userList)) {
            const socketId: string = userInfo[0];
            Redis.del(socketId);
          }
          Redis.del(uuid);
          await this.deleteRoomRequestToApiServer(uuid);
          server.to(uuid).emit(RoomEvent.UserList, {});
        } else {
          for (const userInfo of Object.entries(findRoom.userList)) {
            const socketId: string = userInfo[0];
            const socketData: any = userInfo[1];
            if (socketData.nickname === findMyNickname) {
              delete findRoom['userList'][socketId];
              Redis.del(socketId);
              break;
            }
          }
          Redis.set(uuid, JSON.stringify(findRoom));
          Redis.get(uuid, (err, data) => {
            if (err || !data) throw RoomException.roomNotFound();
            server.to(uuid).emit(RoomEvent.UserList, JSON.parse(data).userList);
          });
        }
      });
    });
  }


  async deleteRoomRequestToApiServer(uuid): Promise<void> {
    await axios.delete(`${baseURL}/api/room/socket/${uuid}`, {
      headers: {
        'socket-secret-key': process.env.SOCKET_SECRET_KEY ?? '',
      },
    });
  }
}