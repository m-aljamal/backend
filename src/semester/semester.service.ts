import { FindSemesterArgs } from './dto/find.semester.args';
import { CreateSemester } from './dto/create-semester';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from './entity/semester';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepo: Repository<Semester>,
  ) {}

  async createSemester(semester: CreateSemester): Promise<Semester> {
    return this.semesterRepo.save(semester);
  }

  async findOne(id: string): Promise<Semester> {
    return this.semesterRepo.findOne(id);
  }

  async findAllSemesters(args: FindSemesterArgs): Promise<Semester[]> {
    const query = this.semesterRepo.createQueryBuilder('semester');
    query.where('semester.archiveId = :archiveId', {
      archiveId: args.archiveId,
    });
    if (args.name) {
      query.andWhere('semester.name = :name', { name: args.name });
    }
    if (args.sortBy) {
      query.orderBy(`semester.createdAt`, args.sortBy);
    }

    query.leftJoinAndSelect('semester.archive', 'archive');
    query.leftJoinAndSelect('semester.employees', 'employees');
    query.leftJoinAndSelect('semester.levels', 'levels');
    query.leftJoinAndSelect('levels.divisions', 'divisions');
    query.leftJoinAndSelect('divisions.students', 'students');
     
    console.log(await query.getMany());

    return await query.getMany();
  }
}
