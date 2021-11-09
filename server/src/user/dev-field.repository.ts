import { EntityRepository, Repository } from 'typeorm';
import { DevField } from '../user/dev-field.entity';

@EntityRepository(DevField)
export class DevFieldRepository extends Repository<DevField> {}
