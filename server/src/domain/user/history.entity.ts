import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { LocalDateTransformer } from '../../transformer/LocalDateTransformer';
import { LocalDate } from 'js-joda';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', transformer: new LocalDateTransformer() })
  checkIn: LocalDate;

  @ManyToOne((type) => User, (user) => user.historys)
  user: User;
}
