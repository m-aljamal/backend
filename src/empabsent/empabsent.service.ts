import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isBoolean } from 'class-validator';
import { AbsentArgs } from 'src/shared/absentArgs';
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

  async getAllEmpabsent(args: AbsentArgs): Promise<Empabsent[]> {
    const query = this.empabsentRepository.createQueryBuilder('empabsent');
    if (args.date) {
      query.andWhere('empabsent.date = :date', { date: args.date });
    }
    if (isBoolean(args.approved)) {
      query.andWhere('empabsent.approved = :approved', {
        approved: args.approved,
      });
    }
    if (args.name) {
      query.leftJoinAndSelect('empabsent.employee', 'employee');
      query.andWhere('employee.name = :name', { name: args.name });
    }

    if (args.fromDate && args.toDate) {
      query.andWhere('empabsent.date BETWEEN :fromDate AND :toDate', {
        fromDate: args.fromDate,
        toDate: args.toDate,
      });
    }

    return await query.getMany();
  }
}
