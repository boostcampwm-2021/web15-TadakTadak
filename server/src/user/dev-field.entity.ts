import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DevField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, unique: false })
  name: string;
}
