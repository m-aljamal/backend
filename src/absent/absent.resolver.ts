import { Employee } from 'src/employee/entity/employee';
import { Absent } from 'src/absent/entity/absent';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AbsentService } from './absent.service';
import { CreateAbsent } from './dto/createAbsent';
import { EmployeeService } from 'src/employee/employee.service';

@Resolver(() => Absent)
export class AbsentResolver {
  constructor(
    private readonly absentService: AbsentService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Mutation(() => Absent, { name: 'createAbsent' })
  async createAbsent(@Args('absent') absent: CreateAbsent) {
    return await this.absentService.createAbsent(absent);
  }

  @Query(() => [Absent], { name: 'findAbsents' })
  async findAbsents() {
    return await this.absentService.findAbsents();
  }

  @ResolveField(() => Absent)
  async employee(@Parent() absent: Absent): Promise<Employee> {
    return await this.employeeService.findEmployee(absent.employeeId);
  }
}
