import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocalDate } from 'js-joda';
import { LocalDateTransformer } from '../../transformer';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', transformer: new LocalDateTransformer() })
  date: LocalDate;

  @Column()
  totalVisit: number;
}
