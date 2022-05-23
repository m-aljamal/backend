import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsentArgs } from 'src/shared/absentArgs';
import {
  filterByApproved,
  filterByDate,
  filterByExactDate,
  filterByName,
} from 'src/shared/filtersAbsentFunctions';
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
    filterByExactDate(args.date, 'empabsent', query);
    filterByApproved(args.approved, 'empabsent', query);
    filterByName(args.name, 'empabsent', query, 'employee', true);
    filterByDate(args.fromDate, args.toDate, 'empabsent', query);
    return await query.getMany();
  }

  async getTotalEmpabsent(args: AbsentArgs) {
    const query = this.empabsentRepository.createQueryBuilder('empabsent');
    query.select(`employee.id`, 'id');
    query.addSelect(`employee.name`, 'name');
    query.addSelect('COUNT(*)', 'count');
    query.addSelect('empabsent.approved', 'approved');
    query.innerJoin(`empabsent.employee`, 'employee');
    query.groupBy(`employee.id`);
    query.addGroupBy('empabsent.approved');
    filterByExactDate(args.date, 'empabsent', query);
    filterByApproved(args.approved, 'empabsent', query);
    filterByName(args.name, 'empabsent', query, 'employee');
    filterByDate(args.fromDate, args.toDate, 'empabsent', query);
    return await query.getRawMany();
  }
}
