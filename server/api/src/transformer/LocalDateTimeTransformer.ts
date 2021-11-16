import { ValueTransformer } from 'typeorm';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '../utils/DateTimeUtil';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date | null {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDateTime | null {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}
