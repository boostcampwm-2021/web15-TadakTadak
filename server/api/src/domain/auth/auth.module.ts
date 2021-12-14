import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Process from 'process';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserRepository } from '../user/repository/user.repository';
import { DevFieldRepository } from '../field/repository/dev-field.repository';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, DevFieldRepository]),
    PassportModule,
    JwtModule.register({
      secret: Process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
    HistoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
