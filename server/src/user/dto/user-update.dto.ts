import { IsNotEmpty } from 'class-validator';
export class UserUpdateDto {
  @IsNotEmpty()
  readonly nickname: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly devfiled: number;

  @IsNotEmpty()
  readonly introduction: string;
}
