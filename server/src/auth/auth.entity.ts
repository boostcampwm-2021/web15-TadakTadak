import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: false })
  isSocial: boolean;

  @Column({ nullable: true })
  devFieldId: number;
}
