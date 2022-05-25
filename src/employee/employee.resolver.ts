import { ProjectEmployeesArgs } from './dto/employee.args';
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
import { Employee } from './entity/employee';
import { Project } from 'src/project/entity/project';
import { Salaries } from './entity/salaries';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EmployeeArgs } from './dto/findEmployee.args';
import { Role } from 'src/utils/types';
import { ProjectService } from 'src/project/project.service';
import { EmployeesByRole } from './entity/EmployeeByType';
import { UpdateEmployeeInput } from './dto/update.employee';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService,
  ) {}

  // @hasRoles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @hasRoles(Role.MANGER)
  @Query(() => [Employee], { name: 'findAllEmployees' })
  async findAllEmployees(@Args() args: EmployeeArgs): Promise<Employee[]> {
    return await this.employeeService.findAllEmployees(args);
  }

  @Query(() => [Employee], { name: 'findEmployeesByProjectId' })
  async employeesByProject(
    @Args() projectEmployees: ProjectEmployeesArgs,
  ): Promise<Employee[]> {
    return await this.employeeService.getEmployeesByProject(projectEmployees);
  }

  @Query(() => [Salaries], { name: 'findProjectEmployeesSalaries' })
  async findSalaries(@Args('projectId') projectId: string) {
    return await this.employeeService.findSalaries(projectId);
  }

  @Query(() => Employee, { name: 'findEmployeeById' })
  async getEmployeeById(@Args('id') id: string): Promise<Employee> {
    return await this.employeeService.getEmployeeById(id);
  }

  @Query(() => Employee, { name: 'currentUser', nullable: true })
  @UseGuards(JwtAuthGuard)
  getEmployee(@CurrentUser() user: Employee) {
    return user;
  }

  @Query(() => EmployeesByRole, { name: 'findEmployeesByRole' })
  async findEmployeesByRole(
    @Args('projectId') projectId: string,
  ): Promise<EmployeesByRole> {
    return await this.employeeService.findEmployeesByRole(projectId);
  }

  @Query(() => Employee, { name: 'findEmployee' })
  async findEmployee(@Args('id') id: string) {
    return await this.employeeService.findEmployee(id);
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('employee') employee: EmployeeDto,
  ): Promise<Employee> {
    return await this.employeeService.createEmployee(employee);
  }

  @Mutation(() => Employee, { name: 'updateEmployee' })
  async updateEmployee(
    @Args('id') id: string,
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return await this.employeeService.updateEmployee(id, updateEmployeeInput);
  }

  // @ResolveField(() => Employee)
  // async project(@Parent() employee: Employee): Promise<Project> {
  //   return await this.projectService.findOne(employee.projectId);
  // }
}
