import { CreateDivision } from './dto/create-division';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Division } from './entity/division';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepo: Repository<Division>,
  ) {}

  createDivision(division: CreateDivision) {
    const findDivision = this.divisionRepo.findOne({
      where: { divisionName: division.divisionName },
    });
    if (findDivision)
      throw new BadRequestException(
        `الشعبة ${division.divisionName} موجود مسبقا`,
      );

    return this.divisionRepo.save(division);
  }
}
