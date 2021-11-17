import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { RoomModule } from './domain/room/room.module';
import { HistoryModule } from './domain/history/history.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { DevFieldModule } from './domain/field/dev-field.module';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { RateLimiterConfig, TypeOrmConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    RateLimiterModule.register(RateLimiterConfig),
    ScheduleModule.forRoot(),
    SchedulerModule,
    UserModule,
    AuthModule,
    RoomModule,
    HistoryModule,
    DevFieldModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
