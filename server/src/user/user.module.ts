import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/auth.repository';
import { DevFieldRepository } from './dev-field.repository';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository, DevFieldRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
