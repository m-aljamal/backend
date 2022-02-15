import { ProjectEmployeesArgs } from './dto/employee.args';
import { EmployeeArgs } from './dto/findEmployee.args';
import { hashPassword } from './../utils/hashPassword';
import { Project } from 'src/project/entity/project';
import { ProjectService } from './../project/project.service';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Observable, from, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/utils/types';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly EmpRepo: Repository<Employee>,
    private readonly projectService: ProjectService,
  ) {}

  async getEmployees(roleArgs: EmployeeArgs) {
    return await this.EmpRepo.find({
      relations: ['project', 'dailyDiscounts'],
      where: { role: roleArgs.role },
    });
  }

  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    let newEmployee = await this.EmpRepo.createQueryBuilder('employee')
      .where('employee.username = :username', { username: employee.username })
      .orWhere('employee.name = :name', { name: employee.name })
      .getOne();

    if (newEmployee) {
      throw new BadRequestException(' اسم الموظف او اسم المستخدم موجود مسبقا');
    }

    newEmployee = this.EmpRepo.create({
      ...employee,
      password: hashPassword(employee.password),
    });
    return await this.EmpRepo.save(newEmployee);
  }

  getProject(projectId: string): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

  async getEmployee(id: string): Promise<Employee> {
    return await this.EmpRepo.findOne({ id });
  }

  async findSalaries(projectId: string) {
    return await this.EmpRepo.createQueryBuilder('employee')

      .select('employee.id', 'id')
      .addSelect('employee.name', 'name')
      .addSelect('employee.salary', 'salary')
      .addSelect('SUM(current_month_discount.late)', 'late')
      .addSelect('SUM(current_month_discount.absence)', 'absence')
      .addSelect('SUM(current_month_discount.punishment)', 'punishment')

      .where('employee.projectId = :projectId', { projectId })
      .leftJoin(
        'current_month_discount',
        'current_month_discount',
        'employee.id = current_month_discount.employeeId',
      )
      .addGroupBy('employee.id')
      .addGroupBy('current_month_discount.employeeId')
      .getRawMany();
  }

  async getEmployeesByProject(
    projectEmployees: ProjectEmployeesArgs,
  ): Promise<Employee[]> {
    return await this.EmpRepo.find({
      where: {
        projectId: projectEmployees.projectId,
        role: Not(Role.ADMIN),
      },
      relations: ['project', 'currentMonthDiscounts'],
      order: { createdAt: projectEmployees.sortBy },
    });
  }

  async findByUsername(username: string): Promise<Employee> {
    return await this.EmpRepo.findOne({ username });
  }

  async findOne(id: string) {
    return from(this.EmpRepo.findOne({ id })).pipe(
      map((employee) => {
        if (!employee) {
          throw new BadRequestException('الموظف غير موجود');
        }
        return employee;
      }),
    );
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.EmpRepo.findOne({ id });
    if (!employee) {
      throw new NotFoundException('الموظف غير موجود');
    }
    return employee;
  }
}
