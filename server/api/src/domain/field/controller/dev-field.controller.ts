import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { DevFieldRepository } from '../repository/dev-field.repository';

@Controller('field')
export class DevFieldController {
  constructor(
    @InjectRepository(DevFieldRepository)
    private readonly devFieldRepository: DevFieldRepository,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo() {
    return { result: await this.devFieldRepository.find() };
  }
}
