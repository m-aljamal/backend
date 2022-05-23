import { CreateStuabsent } from './dto/stuabsent';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Stuabsent } from './enity/stuabsent';
import { AbsentArgs } from '../shared/absentArgs';
import {
  filterByApproved,
  filterByDate,
  filterByExactDate,
  filterByName,
} from 'src/shared/filtersAbsentFunctions';
@Injectable()
export class StuabsentService {
  constructor(
    @InjectRepository(Stuabsent)
    private readonly stuAbsentRepo: Repository<Stuabsent>,
  ) {}

  async createStuabsent(stuabsent: CreateStuabsent): Promise<Stuabsent> {
    return await this.stuAbsentRepo.save(stuabsent);
  }
  async findAllStuabsent(args: AbsentArgs): Promise<Stuabsent[]> {
    const query = this.stuAbsentRepo.createQueryBuilder('stuabsent');

    filterByExactDate(args.date, 'stuabsent', query);

    filterByApproved(args.approved, 'stuabsent', query);

    filterByName(args.name, 'stuabsent', query, 'student');

    filterByDate(args.fromDate, args.toDate, 'stuabsent', query);

    return await query.getMany();
  }

  async findTotalStuabsent(args: AbsentArgs) {
    const query = this.stuAbsentRepo.createQueryBuilder('stuabsent');
    query.select(`student.id`, 'id');
    query.addSelect(`student.name`, 'name');
    query.addSelect('COUNT(*)', 'count');
    query.addSelect('stuabsent.approved', 'approved');
    query.innerJoin(`stuabsent.student`, 'student');
    query.leftJoin(`student.level`, 'level');
    query.addSelect('level.levelName', 'levelName');
    query.groupBy(`student.id`);
    query.addGroupBy('stuabsent.approved');
    query.addGroupBy('level.levelName');
    filterByDate(args.fromDate, args.toDate, 'stuabsent', query);
    filterByName(args.name, 'stuabsent', query, 'student');
    filterByApproved(args.approved, 'stuabsent', query);
    return await query.getRawMany();
  }
}
