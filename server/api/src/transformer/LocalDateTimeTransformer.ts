import { ValueTransformer } from 'typeorm';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '../utils/DateTimeUtil';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}
