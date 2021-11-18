import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinRequestDto {
  @IsNotEmpty()
  readonly nickname: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  readonly introduction: string;
  readonly devField: number;
}
