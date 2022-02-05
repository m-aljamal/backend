import { Discount } from './entity/discounts';
import { EmployeeService } from './../employee/employee.service';
import { DailyDiscountDto } from './dto/daily-discount.dto';
import { DailyDiscountService } from './daily-discount.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { DailyDiscount } from './entity/daily-discount';
import { Employee } from 'src/employee/entity/employee';
import { Column, Entity } from 'typeorm';

@Resolver(() => DailyDiscount)
export class DailyDiscountResolver {
  constructor(
    private readonly service: DailyDiscountService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Query(() => [DailyDiscount], { name: 'dailyDiscounts' })
  async dailyDiscounts() {
    return await this.service.dailyDiscounts();
  }

  @Query(() => [Discount], { name: 'dailyDiscountsByCurrentMonth' })
  async dailyDiscountsByCurrentMonth() {
    return await this.service.dailyDiscountsByCurrentMonth();
  }

  @Mutation(() => DailyDiscount)
  async createDailyDiscount(
    @Args('dailyDiscount') dailyDiscount: DailyDiscountDto,
  ) {
    return await this.service.createDailyDiscount(dailyDiscount);
  }

  @ResolveField(() => DailyDiscount)
  async employee(@Parent() employee: DailyDiscount): Promise<Employee> {
    return await this.employeeService.getEmployee(employee.employeeId);
  }
}
