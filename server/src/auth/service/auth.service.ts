import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth.entity';
import { AuthRepository } from '../auth.repository';
import { LoginRequestDto } from '../dto/loginRequestDTO';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(AuthRepository) private readonly authRepository: AuthRepository) {}

  async login(loginRequestDTO: LoginRequestDto): Promise<boolean> {
    const user: User = await this.authRepository.findOne({
      where: { email: loginRequestDTO.email },
    });
    if (user === undefined) return false;
    const isSamePassword = await bcrypt.compare(loginRequestDTO.password, user.password);
    if (!isSamePassword) return false;
    return true;
  }
}
