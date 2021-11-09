import { IsNotEmpty } from 'class-validator';
export class UserUpdateDto {
  @IsNotEmpty()
  readonly nickname: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly devField: number;

  @IsNotEmpty()
  readonly introduction: string;
}
