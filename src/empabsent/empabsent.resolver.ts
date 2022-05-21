import { CreateEmpabsent } from './dto/empabsent';
import {
  Mutation,
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EmpabsentService } from './empabsent.service';
import { Empabsent } from './enity/empabsent';
import { EmployeeService } from 'src/employee/employee.service';
import { AbsentArgs } from 'src/shared/absentArgs';
import { Employee } from 'src/employee/entity/employee';

@Resolver(() => Empabsent)
export class EmpabsentResolver {
  constructor(
    private readonly empabsentService: EmpabsentService,
    private readonly empService: EmployeeService,
  ) {}

  @Mutation(() => Empabsent)
  async createEmpabsent(
    @Args('empabsent') empabsent: CreateEmpabsent,
  ): Promise<Empabsent> {
    return await this.empabsentService.createEmpabsent(empabsent);
  }

  @Query(() => [Empabsent], { name: 'findAllEmpAbsent' })
  async getAllEmpabsent(@Args() args: AbsentArgs): Promise<Empabsent[]> {
    return await this.empabsentService.getAllEmpabsent(args);
  }

  // @Query(() => [Empabsent], { name: 'findTotalEmpAbsent' })
  // async getTotalEmpabsent(@Args() args: AbsentArgs): Promise<Empabsent[]> {
  //   return await this.empabsentService.getTotalEmpabsent(args);
  // }

  @ResolveField(() => Empabsent)
  async employee(@Parent() absent: Empabsent): Promise<Employee> {
    return await this.empService.getEmployeeById(absent.employeeId);
  }
}
