import { CreateLevel } from './dto/create-level';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entity/level';
import { LevelArgs } from './dto/level.args';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepo: Repository<Level>,
  ) {}

  async createLevel(level: CreateLevel) {
    const findLevel = await this.levelRepo.findOne({
      where: { levelName: level.levelName },
    });
    if (findLevel)
      throw new BadRequestException(`الصف ${level.levelName} موجود مسبقا`);
    return this.levelRepo.save(level);
  }

  async findAllLevels(levelArgs: LevelArgs) {
    return await this.levelRepo.find({
      where: {
        projectId: levelArgs.projectId,
      },
      relations: ['students', 'divisions'],
    });
  }

  async findOne(id: string) {
    return await this.levelRepo.findOne(id);
  }

  async findLevelByProjectId(id: string, projectId: string) {
    return await this.levelRepo.findOne({
      where: { projectId, id },
      relations: ['students', 'divisions'],
    });
  }
}
