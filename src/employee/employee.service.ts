import { Project } from 'src/project/entity/project';
import { ProjectService } from './../project/project.service';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

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
}
