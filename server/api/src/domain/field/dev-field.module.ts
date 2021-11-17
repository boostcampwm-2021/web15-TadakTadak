import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevFieldController } from './controller/dev-field.controller';
import { DevFieldRepository } from './repository/dev-field.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DevFieldRepository])],
  controllers: [DevFieldController],
})
export class DevFieldModule {}
