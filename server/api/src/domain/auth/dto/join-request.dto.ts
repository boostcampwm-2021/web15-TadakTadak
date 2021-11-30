import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinRequestDto {
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  introduction: string;

  @IsNotEmpty()
  devField: number;
}
