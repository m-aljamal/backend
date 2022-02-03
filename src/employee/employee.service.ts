import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly projectRepo: Repository<Employee>,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    return await this.projectRepo.find();
  }

  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    return await this.projectRepo.save(employee);
  }
}
