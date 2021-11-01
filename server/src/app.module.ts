import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';

@Module({
  imports: [UserModule, AuthModule, RoomModule],
  controllers: [AppController, UserController, AuthController, RoomController],
  providers: [AppService, UserService],
})
export class AppModule {}
