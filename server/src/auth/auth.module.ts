import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
