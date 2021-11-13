import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException, DevFieldException } from '../../../exception';
import { HistoryRepository } from '../repository/history.repository';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(HistoryRepository)
    private readonly historyRepository: HistoryRepository,
  ) {}
}
