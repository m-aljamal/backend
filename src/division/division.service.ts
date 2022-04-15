import { CreateDivision } from './dto/create-division';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Division } from './entity/division';
import { LevelService } from 'src/level/level.service';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepo: Repository<Division>,
    private readonly levelService: LevelService,
  ) {}

  async createDivision(division: CreateDivision) {
    const findDivision = await this.divisionRepo.findOne({
      where: { divisionName: division.divisionName, levelId: division.levelId },
    });

    if (findDivision)
      throw new BadRequestException(
        `الشعبة ${division.divisionName} موجود مسبقا`,
      );

    return this.divisionRepo.save(division);
  }

  async findAllDivision(levelId: string) {
    return this.divisionRepo.find({
      // order: { createdAt: divisionArgs.sortBy },
      where: { levelId: levelId },
      relations: ['students'],
    });
  }
}
