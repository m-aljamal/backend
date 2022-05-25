import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StudyYear } from './entity/study-year';
import { CreateStudyYear } from './dto/create-study-year';

@Injectable()
export class StudyYearService {
  constructor(
    @InjectRepository(StudyYear)
    private readonly studyYearRepo: Repository<StudyYear>,
  ) {}

  async createStudyYear(studyYear: CreateStudyYear): Promise<StudyYear> {
    return this.studyYearRepo.save(studyYear);
  }

  async findAllStudyYears(): Promise<StudyYear[]> {
    return this.studyYearRepo.find({
      relations: ['employees', 'students'],
    });
  }

  async findOne(id: string): Promise<StudyYear> {
    return this.studyYearRepo.findOne({
      where: { id },
      relations: ['employees', 'students'],
    });
  }
}
