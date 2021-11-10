import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/domain/user/user.entity';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { CreateRoomRequestDto } from './dto/create-room-request.dto';

export enum RoomType {
  TadakTadak = '타닥타닥',
  CampFire = '캠프파이어',
  CodingLive = '코딩라이브',
}

@Entity()
export class Room extends BaseTimeEntity {
  constructor(title: string, maxHeadcount: number, roomType: RoomType) {
    super();
    this.title = title;
    this.maxHeadcount = maxHeadcount;
    this.roomType = roomType;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  agoraToken: string;

  @Column()
  title: string;

  @Column()
  maxHeadcount: number;

  @Column()
  nowHeadcount: number;

  @OneToOne((type) => User)
  @JoinColumn()
  owner: User;

  @Column('varchar')
  roomType: RoomType;

  static builder(createRoomRequestDto: CreateRoomRequestDto): Room {
    const { title, maxHeadcount, roomType } = createRoomRequestDto;
    return new Room(title, maxHeadcount, roomType);
  }

  setAgoraToken(token: string) {
    this.agoraToken = token;
  }

  setUUID(uuid: string) {
    this.uuid = uuid;
  }

  setOwner(user: User) {
    this.owner = user;
  }

  setNowHeadcount(cnt: number) {
    this.nowHeadcount = cnt;
  }
}
