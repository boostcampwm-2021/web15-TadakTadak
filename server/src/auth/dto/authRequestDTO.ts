import { IsEmail, IsNotEmpty } from 'class-validator';
export class AuthRequestDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
