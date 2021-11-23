import { IsNotEmpty } from 'class-validator';
export class UserUpdateDto {
  @IsNotEmpty()
  readonly nickname: string;

  @IsNotEmpty()
  readonly devField: number;
}
