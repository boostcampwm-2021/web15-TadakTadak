import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { AuthRepository } from '../auth/auth.repository';
import { DevFieldRepository } from './repository/dev-field.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository, DevFieldRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
