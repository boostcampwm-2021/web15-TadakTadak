import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevFieldRepository } from '../repository/dev-field.repository';

@Controller('field')
export class DevFieldController {
  constructor(
    @InjectRepository(DevFieldRepository)
    private readonly devFieldRepository: DevFieldRepository,
  ) {}

  @Get()
  async getDevInfo() {
    return { result: await this.devFieldRepository.find() };
  }
}
