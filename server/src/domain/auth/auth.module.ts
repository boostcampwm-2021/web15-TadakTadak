import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AuthRepository } from './auth.repository';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule,
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '1h' },
    }),
    HistoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [AuthRepository],
})
export class AuthModule {}
