import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { LocalDateTransformer } from '../../transformer/LocalDateTransformer';
import { LocalDate } from 'js-joda';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  checkIn: LocalDate;

  @ManyToOne((type) => User, (user) => user.historys)
  user: User;
}
