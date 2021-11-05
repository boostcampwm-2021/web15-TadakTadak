import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  checkIn: Date;

  @ManyToOne((type) => User, (user) => user.historys)
  user: User;
}
