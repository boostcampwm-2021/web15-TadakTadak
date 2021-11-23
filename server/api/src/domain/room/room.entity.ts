import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { User } from '../user/user.entity';

export enum RoomType {
  TadakTadak = '타닥타닥',
  CampFire = '캠프파이어',
  CodingLive = '코딩라이브',
}

export function roomTypeToArray() {
  return Object.keys(RoomType).map((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return RoomType[key];
  });
}

@Entity()
export class Room extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  agoraAppId: string;

  @Column()
  agoraToken: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  maxHeadcount: number;

  @Column()
  nowHeadcount: number;

  @OneToOne((type) => User)
  @JoinColumn()
  owner: User;

  @Column('varchar')
  roomType: RoomType;
}
