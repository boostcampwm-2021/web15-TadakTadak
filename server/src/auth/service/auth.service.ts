import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRequestDto } from '../dto/authRequestDTO';

@Injectable()
export class AuthService {
  async userLogin(authRequestDTO: AuthRequestDto): Promise<string> {
    const hash = await bcrypt.hash(authRequestDTO.password, 10);

    return 'Hello World!';
  }
}
