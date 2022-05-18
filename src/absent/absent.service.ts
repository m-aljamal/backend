import { CreateAbsent } from './dto/createAbsent';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Absent } from './entity/absent';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/entity/employee';
import { AbsentArgs } from './dto/absent.args';
import { isBoolean } from 'class-validator';

@Injectable()
export class AbsentService {
  constructor(
    @InjectRepository(Absent)
    private readonly absentRepo: Repository<Absent>,
  ) {}

  async createAbsent(absent: CreateAbsent): Promise<Absent> {
    return await this.absentRepo.save(absent);
  }

  async findAbsents(args: AbsentArgs) {
    const query = this.absentRepo.createQueryBuilder('absent');
    if (args.date) {
      query.andWhere('absent.date = :date', { date: args.date });
    }
    if (isBoolean(args.approved)) {
      query.andWhere('absent.approved = :approved', {
        approved: args.approved,
      });
    }
    if (args.studentName) {
      query.leftJoinAndSelect('absent.student', 'student');
      query.andWhere('student.name = :name', { name: args.studentName });
    }
    if (args.employeeName) {
      query.leftJoinAndSelect('absent.employee', 'employee');
      query.andWhere('employee.name = :name', { name: args.employeeName });
    }

    if (args.fromDate && args.toDate) {
      query.andWhere('absent.date BETWEEN :fromDate AND :toDate', {
        fromDate: args.fromDate,
        toDate: args.toDate,
      });
    }

    return await query.getMany();
  }

  async findEmployeeAbsentNumber(args: AbsentArgs) {
    return await this.findNumberofAbsents(args, 'employee');
  }

  async findStudentsAbsentNumber(args: AbsentArgs) {
    return await this.findNumberofAbsents(args, 'student');
  }

  async findAbsentsByDate(date: Date) {
    const absents = await this.absentRepo.find({
      where: {
        date: date,
      },
    });
    return absents;
  }

  async findNumberofAbsents(args: AbsentArgs, type: string) {
    const query = this.absentRepo.createQueryBuilder('absent');
    query.select(`${type}.id`, 'id');
    query.addSelect(`${type}.name`, 'name');
    query.addSelect('COUNT(*)', 'count');
    query.innerJoin(`absent.${type}`, type);
    query.groupBy(`${type}.id`);
    if (args.fromDate && args.toDate) {
      query.andWhere('absent.date BETWEEN :fromDate AND :toDate', {
        fromDate: args.fromDate,
        toDate: args.toDate,
      });
    }
    return await query.getRawMany();
  }
}
