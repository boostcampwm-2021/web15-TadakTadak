import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '../image/image.module';
import { HistoryModule } from '../history/history.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { ImageService } from '../image/service/image.service';
import { UserRepository } from './repository/user.repository';
import { DevFieldRepository } from './repository/dev-field.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, DevFieldRepository]), ImageModule, HistoryModule],
  controllers: [UserController],
  providers: [UserService, ImageService],
  exports: [ImageService],
})
export class UserModule {}
