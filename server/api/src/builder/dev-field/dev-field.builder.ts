import { BuilderCommon } from '../builder';
import { DevField } from '../../domain/field/dev-field.entity';

export class DevFieldBuilder extends BuilderCommon<DevField> {
  constructor() {
    super(DevField);
  }

  setId(id: number) {
    this.object.id = id;
    return this;
  }

  setName(name: string) {
    this.object.name = name;
    return this;
  }
}
