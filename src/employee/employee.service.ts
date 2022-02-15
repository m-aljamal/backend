import { ProjectEmployeesArgs } from './dto/employee.args';
import { EmployeeArgs } from './dto/findEmployee.args';
import { hashPassword } from './../utils/hashPassword';
import { Project } from 'src/project/entity/project';
import { ProjectService } from './../project/project.service';
import { EmployeeDto } from './dto/employee.dto';
import { Employee, Role } from './entity/employee';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Observable, from, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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
    const employee = await this.EmpRepo.findOne({ id });
    return await this.EmpRepo.findOne({ id });
  }

  async salariesByCurrentMonth(projectId: string) {
    // const [salariesWithDiscount, salariesWithNoDiscount] = await Promise.all([
    //   await this.EmpRepo.createQueryBuilder('employee')
    //     .addSelect('SUM(daily_discount.discount)', 'discount')
    //     .addSelect('daily_discount.employeeId', 'employeeId')
    //     .where('daily_discount.date > :date', {
    //       date: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    //     })
    //     .andWhere('daily_discount.hasDiscount = :hasDiscount', {
    //       hasDiscount: true,
    //     })
    //     .andWhere('employee.projectId = :projectId', { projectId })
    //     .addGroupBy('employee.id')
    //     .addGroupBy('daily_discount.employeeId')
    //     .leftJoin(
    //       'daily_discount',
    //       'daily_discount',
    //       'employee.id = daily_discount.employeeId',
    //     )
    //     .innerJoin('project', 'project', 'project.id = employee.projectId')
    //     .getRawMany(),

    //   await this.EmpRepo.createQueryBuilder('employee')

    //     .andWhere('employee.projectId = :projectId', { projectId })
    //     .addGroupBy('employee.id')
    //     .addGroupBy('daily_discount.discount')
    //      .addGroupBy('daily_discount.hasDiscount')
    //    //  .addGroupBy('daily_discount.date')
    //     .leftJoin(
    //       'daily_discount',
    //       'daily_discount',
    //       'employee.id = daily_discount.employeeId',
    //     )
    //     .innerJoin('project', 'project', 'project.id = employee.projectId')

    //     .having('daily_discount.discount IS NULL')

    //     .orHaving('daily_discount.hasDiscount = :hasDiscount', {
    //       hasDiscount: false,
    //     })
    //     // .orHaving('daily_discount.date > :date', {
    //     //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    //     // })
    //     .getRawMany(),
    // ]);

    // return [...salariesWithDiscount, ...salariesWithNoDiscount];
    const d = await this.EmpRepo.createQueryBuilder('employee')

      .addSelect('SUM(daily_discount.discount)', 'discount')
      .andWhere('employee.projectId = :projectId', { projectId })
      .addGroupBy('employee.id')
      .addGroupBy('daily_discount.employeeId')
      .addGroupBy('daily_discount.hasDiscount')
      .addGroupBy('daily_discount.discount')
      .leftJoin(
        'daily_discount',
        'daily_discount',
        'employee.id = daily_discount.employeeId',
      )
      .innerJoin('project', 'project', 'project.id = employee.projectId')
      .having('daily_discount.hasDiscount = :hasDiscount', {
        hasDiscount: true,
      })
      .orHaving('daily_discount.discount IS NULL')
      .getRawMany();
    console.log(d);

    return d;
  }

  async getEmployeesByProject(
    projectEmployees: ProjectEmployeesArgs,
  ): Promise<Employee[]> {
    return await this.EmpRepo.find({
      where: {
        projectId: projectEmployees.projectId,
        role: Not(Role.ADMIN),
      },
      relations: ['project', 'dailyDiscounts'],
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
