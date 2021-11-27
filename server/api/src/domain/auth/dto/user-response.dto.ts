import { DevField } from '../../field/dev-field.entity';

export class UserResponseDto {
  readonly id: number;
  readonly nickname: string;
  readonly email: string;
  readonly imageUrl: string;
  readonly devField: DevField;
}
