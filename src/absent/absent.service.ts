import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Absent } from './entity/absent';

@Injectable()
export class AbsentService {
  constructor(private readonly absentRepo: Repository<Absent>) {}
}
