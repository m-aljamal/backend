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
import { Employee } from './entity/employee';
import { Project } from 'src/project/entity/project';
import { Salaries } from './entity/salaries';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  async getEmployees(): Promise<Employee[]> {
    return await this.employeeService.getEmployees();
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
