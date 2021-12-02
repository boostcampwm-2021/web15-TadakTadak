import { LocalDate } from 'js-joda';
import { BuilderCommon } from '../builder';
import { Visit } from '../../domain/history/visit.entity';
export class VisitBuilder extends BuilderCommon<Visit> {
  constructor() {
    super(Visit);
  }

  setDate(date: LocalDate): VisitBuilder {
    this.object.date = date;
    return this;
  }

  setTotalVisit(totalVisit: number): VisitBuilder {
    this.object.totalVisit = totalVisit;
    return this;
  }
}
