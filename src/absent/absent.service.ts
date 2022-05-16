import { CreateAbsent } from './dto/createAbsent';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Absent } from './entity/absent';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/entity/employee';

@Injectable()
export class AbsentService {
  constructor(
    @InjectRepository(Absent)
    private readonly absentRepo: Repository<Absent>,
    private readonly employeeService: EmployeeService,
  ) {}

  async createAbsent(absent: CreateAbsent): Promise<Absent> {
    return await this.absentRepo.save(absent);
  }

  async findAbsents() {
    const absents = await this.absentRepo.find({});
    return absents;
  }
}
