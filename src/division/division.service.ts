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

  async findAllDivision() {
    const query = this.divisionRepo.createQueryBuilder('division');
    // join employee_division relation

    // relation employee_division
    query.leftJoin('employee_division', 'divisions', 'division.id = employee_division.division_id');

    console.log(await query.getMany());
    return await query.getMany();
  }
  async findDivisionBySchoolId(id: string) {
    return this.divisionRepo.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  async findOne(id: string) {
    const d = await this.divisionRepo.findOne({
      where: { id },
      relations: ['students'],
    });

    return d;
  }
}
