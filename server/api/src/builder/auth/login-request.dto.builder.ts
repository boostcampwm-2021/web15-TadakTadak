import { BuilderCommon } from '../builder';
import { LoginRequestDto } from '../../domain/auth/dto/login-request.dto';

export class LoginRequestDtoBuilder extends BuilderCommon<LoginRequestDto> {
  constructor() {
    super(LoginRequestDto);
  }

  setEmail(email: string): LoginRequestDtoBuilder {
    this.object.email = email;
    return this;
  }

  setPassword(password: string): LoginRequestDtoBuilder {
    this.object.password = password;
    return this;
  }
}
