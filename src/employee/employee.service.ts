import { Project } from 'src/project/entity/project';
import { ProjectService } from './../project/project.service';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly EmpRepo: Repository<Employee>,
    private readonly projectService: ProjectService,
  ) {}

  async getEmployees() {
    return await this.EmpRepo.find({
      relations: ['project', 'dailyDiscounts'],
    });
  }

  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    return await this.EmpRepo.save(employee);
  }

  getProject(projectId: string): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

  async getEmployee(id: string): Promise<Employee> {
    const employee = await this.EmpRepo.findOne({ id });
    return await this.EmpRepo.findOne({ id });
  }

  async salariesByCurrentMonth(projectId: string) {
    const salaries = await this.EmpRepo.createQueryBuilder('employee')

      .addSelect('SUM(daily_discount.discount)', 'discount')
      .groupBy('daily_discount.employeeId')
      .addGroupBy('employee.id')
      .leftJoin(
        'daily_discount',
        'daily_discount',
        'employee.id = daily_discount.employeeId',
      )
      .getRawMany();

    // const salaries = await this.EmpRepo.find({
    //   where: { projectId },
    //   relations: ['dailyDiscounts'],
    // });
    console.log(salaries);
    return salaries;
  }

  async getEmployeesByProject(projectId: string): Promise<Employee[]> {
    return await this.EmpRepo.find({
      where: { projectId },
      relations: ['project', 'dailyDiscounts'],
    });
  }
}
