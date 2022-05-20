import { CreateStuabsent } from './dto/stuabsent';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Stuabsent } from './enity/stuabsent';
import { isBoolean } from 'class-validator';
import { AbsentArgs } from './dto/absentArgs';

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
    if (args.date) {
      query.andWhere('stuabsent.date = :date', { date: args.date });
    }
    if (isBoolean(args.approved)) {
      query.andWhere('stuabsent.approved = :approved', {
        approved: args.approved,
      });
    }
    if (args.name) {
      query.leftJoinAndSelect('stuabsent.student', 'student');
      query.andWhere('student.name = :name', { name: args.name });
    }

    if (args.fromDate && args.toDate) {
      query.andWhere('stuabsent.date BETWEEN :fromDate AND :toDate', {
        fromDate: args.fromDate,
        toDate: args.toDate,
      });
    }

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
    if (args.fromDate && args.toDate) {
      query.andWhere('stuabsent.date BETWEEN :fromDate AND :toDate', {
        fromDate: args.fromDate,
        toDate: args.toDate,
      });
    }
    if (args.name) {
      query.andWhere('student.name = :name', { name: args.name });
    }

    if (isBoolean(args.approved)) {
      query.andWhere('stuabsent.approved = :approved', {
        approved: args.approved,
      });
    }

    return await query.getRawMany();
  }
}
