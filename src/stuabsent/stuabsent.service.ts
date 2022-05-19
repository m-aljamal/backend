import { CreateStuabsent } from './dto/stuabsent';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Stuabsent } from './enity/stuabsent';

@Injectable()
export class StuabsentService {
  constructor(
    @InjectRepository(Stuabsent)
    private readonly stuAbsentRepo: Repository<Stuabsent>,
  ) {}

  async createStuabsent(stuabsent: CreateStuabsent): Promise<Stuabsent> {
    return await this.stuAbsentRepo.save(stuabsent);
  }
  async findAllStuabsent(): Promise<Stuabsent[]> {
    return await this.stuAbsentRepo.find({ relations: ['student'] });
  }
}
