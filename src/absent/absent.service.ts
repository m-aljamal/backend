import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Absent } from './entity/absent';

@Injectable()
export class AbsentService {
  constructor(
    @InjectRepository(Absent) private readonly absentRepo: Repository<Absent>,
  ) {}
}
