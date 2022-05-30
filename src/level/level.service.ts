import { CreateLevel } from './dto/create-level';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entity/level';
import { LevelArgs } from './dto/level.args';
import { SemesterService } from 'src/semester/semester.service';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepo: Repository<Level>,
    private readonly semesterReop: SemesterService,
  ) {}

  async createLevel(level: CreateLevel) {
    const findLevel = await this.levelRepo.findOne({
      where: { levelName: level.levelName },
    });
    if (findLevel)
      throw new BadRequestException(`الصف ${level.levelName} موجود مسبقا`);

    const semesters = await Promise.all(
      level.semesters.map(async (id) => {
        const semester = await this.loadSemester(id);
        if (!semester) {
          throw new NotFoundException('الفصل الدراسي غير موجود');
        }
        return semester;
      }),
    );

    let createLevel = this.levelRepo.create({
      ...level,
      semesters,
    });
    return this.levelRepo.save(createLevel);
  }

  async findAllLevels(levelArgs: LevelArgs) {
    return await this.levelRepo.find({
      relations: ['students', 'divisions', 'semesters'],
    });
  }

  async findOne(id: string) {
    return await this.levelRepo.findOne(id);
  }

  async findLevelByProjectId(id: string, projectId: string) {
    // return await this.levelRepo.findOne({
    //   where: { projectId, id },
    //   relations: ['students', 'divisions'],
    // });
  }

  async findStudentsByLevel(levelArgs: LevelArgs) {
    return await this.levelRepo.find({
      relations: ['students', 'divisions'],
    });
  }

  private async loadSemester(id: string) {
    return await this.semesterReop.findOne(id);
  }
}
