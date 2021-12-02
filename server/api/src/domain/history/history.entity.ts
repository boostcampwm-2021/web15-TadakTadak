import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocalDate } from 'js-joda';
import { LocalDateTransformer } from '../../transformer';
import { User } from '../user/user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', transformer: new LocalDateTransformer() })
  checkIn: LocalDate;

  @ManyToOne((type) => User, (user) => user.historys)
  user: User;
}
