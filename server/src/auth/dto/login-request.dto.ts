import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
