import { ValueTransformer } from 'typeorm';
import { LocalDate } from 'js-joda';
import { DateTimeUtil } from '../utils/DateTimeUtil';

export class LocalDateTransformer implements ValueTransformer {
  to(entityValue: LocalDate): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDate {
    return DateTimeUtil.toLocalDate(databaseValue);
  }
}
