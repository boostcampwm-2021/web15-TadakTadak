import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { RoomModule } from './domain/room/room.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiterConfig } from './config/rateLimiter.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    RateLimiterModule.register(RateLimiterConfig),
    ScheduleModule.forRoot(),
    SchedulerModule,
    UserModule,
    AuthModule,
    RoomModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
