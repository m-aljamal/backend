import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpabsent } from './dto/empabsent';
import { Empabsent } from './enity/empabsent';

@Injectable()
export class EmpabsentService {
  constructor(
    @InjectRepository(Empabsent)
    private readonly empabsentRepository: Repository<Empabsent>,
  ) {}

  async createEmpabsent(empabsent: CreateEmpabsent): Promise<Empabsent> {
    return await this.empabsentRepository.save(empabsent);
  }

  async getAllEmpabsent(): Promise<Empabsent[]> {
    return await this.empabsentRepository.find();
  }
}
