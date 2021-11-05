import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (from) => from.follows)
  @JoinTable()
  from: User;

  @ManyToOne(() => User, (to) => to.follows)
  @JoinTable()
  to: User;
}
