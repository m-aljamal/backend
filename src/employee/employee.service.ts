import { Project } from 'src/project/entity/project';
import { ProjectService } from './../project/project.service';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee';
import { BadRequestException, Injectable } from '@nestjs/common';
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
    let newEmployee = await this.EmpRepo.createQueryBuilder('employee')
      .where('employee.username = :username', { username: employee.username })
      .orWhere('employee.name = :name', { name: employee.name })
      .getOne();

    if (newEmployee) {
      throw new BadRequestException('الموظفن موجود مسبقا');
    }
    newEmployee = this.EmpRepo.create(employee);
    return await this.EmpRepo.save(newEmployee);
  }

  getProject(projectId: string): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

  async getEmployee(id: string): Promise<Employee> {
    const employee = await this.EmpRepo.findOne({ id });
    return await this.EmpRepo.findOne({ id });
  }

  async salariesByCurrentMonth(projectId: string) {
    const [salariesWithDiscount, salariesWithNoDiscount] = await Promise.all([
      await this.EmpRepo.createQueryBuilder('employee')
        .addSelect('SUM(daily_discount.discount)', 'discount')
        .addSelect('daily_discount.employeeId', 'employeeId')
        .where('daily_discount.date > :date', { date: new Date() })
        .andWhere('daily_discount.hasDiscount = :hasDiscount', {
          hasDiscount: true,
        })
        .andWhere('employee.projectId = :projectId', { projectId })
        .addGroupBy('employee.id')
        .addGroupBy('daily_discount.employeeId')
        .leftJoin(
          'daily_discount',
          'daily_discount',
          'employee.id = daily_discount.employeeId',
        )
        .innerJoin('project', 'project', 'project.id = employee.projectId')
        .getRawMany(),

      await this.EmpRepo.createQueryBuilder('employee')
        .andWhere('employee.projectId = :projectId', { projectId })
        .addGroupBy('employee.id')
        .addGroupBy('daily_discount.discount')
        .leftJoin(
          'daily_discount',
          'daily_discount',
          'employee.id = daily_discount.employeeId',
        )
        .innerJoin('project', 'project', 'project.id = employee.projectId')

        .having('daily_discount.discount IS NULL')
        .getRawMany(),
    ]);

    return [...salariesWithDiscount, ...salariesWithNoDiscount];
  }

  async getEmployeesByProject(projectId: string): Promise<Employee[]> {
    return await this.EmpRepo.find({
      where: { projectId },
      relations: ['project', 'dailyDiscounts'],
    });
  }
}
