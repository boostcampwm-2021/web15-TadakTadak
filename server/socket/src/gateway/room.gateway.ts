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
import { LocalDateTime} from '@js-joda/core';
import { RoomEvent } from './room.event';
import { RoomService } from './room.service';

@WebSocketGateway({ cors: true, allowEIO3: true })
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(RoomEvent.MsgToServer)
  handleMessage(client: Socket, { uuid, message, nickname }: IMessage): void {
    const emitMessage: IMessage = {
      message: `${message} from ${process.env.NODE_PORT}`,
      time: LocalDateTime.now().plusHours(9),
      nickname: nickname,
      uuid: uuid,
    };
    this.logger.log(emitMessage);
    this.server.to(uuid).emit(RoomEvent.MsgToClient, emitMessage);
  }

  @SubscribeMessage(RoomEvent.JoinRoom)
  handleJoinRoom(client: Socket, { field, img, nickname, uuid, maxHead }: IRoomRequest): void {
    client.leave(client.id);
    client.join(uuid);
    this.roomService.joinRoom(client, this.server, { field, img, nickname, uuid, maxHead });
  }

  @SubscribeMessage(RoomEvent.LeaveRoom)
  handleLeaveRoom(client: Socket, { uuid }: IRoomRequest): void {
    client.leave(uuid);
    this.roomService.leaveRoom(client, this.server, uuid);
  }

  @SubscribeMessage(RoomEvent.KickRoom)
  handleKickRoom(client: Socket, { uuid, kickNickname }: IRoomRequest): void {
    if (!kickNickname) return;
    this.roomService.kickRoom(client, this.server, uuid, kickNickname);
  }

  @SubscribeMessage(RoomEvent.RemoveRoom)
  handleRemoveRoom(client: Socket, { uuid }: IRoomRequest): void {
    this.roomService.removeRoom(client, this.server, uuid);
  }

  @SubscribeMessage(RoomEvent.VerifyRoom)
  handleVerifyRoom(client: Socket, { uuid, nickname }: IRoomRequest): void {
    client.join(client.id);
    this.roomService.verifyRoom(client, this.server, uuid, nickname);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.roomService.disconnectClient(client, this.server);
  }
}
