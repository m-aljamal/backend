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

  async findAllSemesters(): Promise<Semester[]> {
    return await this.semesterRepo.find({
      relations: ['employees', 'levels'],
    });
  }
}
