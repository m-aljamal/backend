import { ProjectEmployeesArgs } from './dto/employee.args';
import { EmployeeArgs } from './dto/findEmployee.args';
import { hashPassword } from './../utils/hashPassword';

import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entity/employee';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Role } from 'src/utils/types';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly EmpRepo: Repository<Employee>,
  ) {}

  async findAllEmployees(args: EmployeeArgs): Promise<Employee[]> {
    const query = this.EmpRepo.createQueryBuilder('employee');
    if (args.role) query.andWhere('employee.role = :role', { role: args.role });

    if (args.projectId)
      query.andWhere('employee.projectId = :projectId', {
        projectId: args.projectId,
      });

    return await query.getMany();
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

  // async getEmployee(id: string): Promise<Employee> {
  //   return await this.EmpRepo.findOne({ id });
  // }

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

  // async findOne(id: string) {
  //   return from(this.EmpRepo.findOne({ id })).pipe(
  //     map((employee) => {
  //       if (!employee) {
  //         throw new BadRequestException('الموظف غير موجود');
  //       }
  //       return employee;
  //     }),
  //   );
  // }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.EmpRepo.findOne({ id });
    if (!employee) {
      throw new NotFoundException('الموظف غير موجود');
    }
    return employee;
  }
}
