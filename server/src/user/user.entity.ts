import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DevField } from './dev-field.entity';
import { Follow } from './follow.entity';
import { History } from './history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  nickName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 511, unique: false, nullable: true })
  introduction: string;
}