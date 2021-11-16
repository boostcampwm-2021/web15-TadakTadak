import { EntityRepository, Repository } from 'typeorm';
import { LocalDate } from 'js-joda';
import { Visit } from '../visit.entity';

@EntityRepository(Visit)
export class VisitRepository extends Repository<Visit> {
  async getVisitCount() {
    const yesterDay: LocalDate = LocalDate.now().minusDays(1);
    return await this.find({ where: { date: yesterDay } });
  }

  async addVisitCount(count: number) {
    const visit: Visit = new Visit();
    visit.date = LocalDate.now().minusDays(1);
    visit.totalVisit = count;
    this.save(visit);
  }
}
