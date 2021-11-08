import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

export enum RoomType {
  TadakTadak = '타닥타닥',
  CampFire = '캠프파이어',
  CodingLive = '코딩라이브',
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

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
}
