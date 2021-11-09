import { EntityRepository, Repository } from 'typeorm';
import { DevField } from '../user/dev-field.entity';

@EntityRepository(DevField)
export class DevFieldRepository extends Repository<DevField> {
  async findDevById(devField: number): Promise<DevField> {
    return await this.findOneOrFail({ where: { id: devField } });
  }
}
