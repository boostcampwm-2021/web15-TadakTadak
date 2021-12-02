import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocalDate } from 'js-joda';
import { LocalDateTransformer } from '../../transformer';
import { DevField } from '../field/dev-field.entity';
import { History } from '../history/history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  imageName: string;

  @Column({ type: 'varchar', length: 511, unique: false, nullable: true })
  introduction: string;

  @Column({ default: false })
  isSocial: boolean;

  @ManyToOne((type) => DevField, (devField) => devField.users)
  @JoinColumn()
  devField: DevField;

  @OneToMany(() => History, (history) => history.user)
  historys: History[];

  @Column({ type: 'timestamp', transformer: new LocalDateTransformer() })
  lastCheckIn: LocalDate;

  setNickname(nickname: string) {
    this.nickname = nickname;
  }

  setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  setImageName(imageName: string) {
    this.imageName = imageName;
  }

  setIntroduction(introduction: string) {
    this.introduction = introduction;
  }

  setDevField(devField: DevField) {
    this.devField = devField;
  }

  setLastCheckIn(lastCheckIn: LocalDate) {
    this.lastCheckIn = lastCheckIn;
  }
}
