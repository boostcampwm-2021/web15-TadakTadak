import { ValueTransformer } from 'typeorm';
import { LocalDate } from 'js-joda';
import { DateTimeUtil } from '../utils';

export class LocalDateTransformer implements ValueTransformer {
  to(entityValue: LocalDate): Date | null {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDate | null {
    return DateTimeUtil.toLocalDate(databaseValue);
  }
}
