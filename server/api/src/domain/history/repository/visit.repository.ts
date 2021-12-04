import { EntityRepository, Repository } from 'typeorm';
import { LocalDate } from 'js-joda';
import { Visit } from '../visit.entity';
import { VisitBuilder } from '../../../builder';

@EntityRepository(Visit)
export class VisitRepository extends Repository<Visit> {
  async getVisitCount() {
    const yesterDay: LocalDate = LocalDate.now().minusDays(1);
    return await this.findOne({ where: { date: yesterDay } });
  }

  async addVisitCount(count: number) {
    const visit: Visit = new VisitBuilder().setDate(LocalDate.now().minusDays(1)).setTotalVisit(count).build();
    await this.save(visit);
  }
}
