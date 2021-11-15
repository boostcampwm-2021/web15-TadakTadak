import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { RoomModule } from './domain/room/room.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ScheduleModule.forRoot(),
    SchedulerModule,
    UserModule,
    AuthModule,
    RoomModule,
  ],
})
export class AppModule {}
