import { CurrentMonthDiscountService } from './current-month-discount.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentMonthDiscount } from './entity/current-month-discount';
import { CurrentMonthDiscountDto } from './dto/current-month-discount.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/entity/employee';
import { FindDiscountArgs } from './dto/findDiscountArgs';

@Resolver(() => CurrentMonthDiscount)
export class CurrentMonthDiscountResolver {
  constructor(
    private readonly service: CurrentMonthDiscountService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Mutation(() => CurrentMonthDiscount, { name: 'createDiscount' })
  async create(@Args('discount') discount: CurrentMonthDiscountDto) {
    return await this.service.create(discount);
  }

  @Mutation(() => CurrentMonthDiscount, { name: 'deleteDiscount' })
  async delete(@Args('id') id: string) {
    return await this.service.delete(id);
  }

  @Query(() => [CurrentMonthDiscount], { name: 'findDiscounts' })
  async findDiscounts(@Args() args: FindDiscountArgs) {
    return await this.service.findDiscounts(args);
  }

  @ResolveField(() => CurrentMonthDiscount)
  async employee(@Parent() employee: CurrentMonthDiscount): Promise<Employee> {
    return await this.employeeService.getEmployeeById(employee.employeeId);
  }
}
