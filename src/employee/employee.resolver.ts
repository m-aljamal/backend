import { EmployeeDto } from './dto/employee.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  async getEmployees(): Promise<Employee[]> {
    return await this.employeeService.getEmployees();
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('employee') employee: EmployeeDto,
  ): Promise<Employee> {
    return await this.employeeService.createEmployee(employee);
  }
}
