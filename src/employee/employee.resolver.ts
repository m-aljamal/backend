import { hasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { EmployeeDto } from './dto/employee.dto';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee, Role } from './entity/employee';
import { Project } from 'src/project/entity/project';
import { Salaries } from './entity/salaries';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EmployeeArgs } from './dto/findEmployee.args';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.EMPLOYEE)
  @Query(() => [Employee], { name: 'employees' })
  async getEmployees(@Args() roleArgs: EmployeeArgs): Promise<Employee[]> {
    return await this.employeeService.getEmployees(roleArgs);
  }

  @Query(() => [Employee], { name: 'employeesByProject' })
  async employeesByProject(
    @Args('projectId') projectId: string,
  ): Promise<Employee[]> {
    return await this.employeeService.getEmployeesByProject(projectId);
  }

  @Query(() => [Salaries], { name: 'salariesbycurrentMonth' })
  async salariesByCurrentMonth(@Args('projectId') projectId: string) {
    return await this.employeeService.salariesByCurrentMonth(projectId);
  }

  @Query(() => Employee, { name: 'findEmployee' })
  async getEmployeeById(@Args('id') id: string): Promise<Employee> {
    return await this.employeeService.getEmployeeById(id);
  }

  @Query(() => Employee, { name: 'currentUser', nullable: true })
  @UseGuards(JwtAuthGuard)
  getEmployee(@CurrentUser() user: Employee) {
    return user;
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('employee') employee: EmployeeDto,
  ): Promise<Employee> {
    return await this.employeeService.createEmployee(employee);
  }

  @ResolveField(() => Employee)
  async project(@Parent() employee: Employee): Promise<Project> {
    return await this.employeeService.getProject(employee.projectId);
  }
}
