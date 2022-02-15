import { EmployeeModule } from './../employee/employee.module';
import { CurrentMonthDiscount } from './entity/current-month-discount';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CurrentMonthDiscountService } from './current-month-discount.service';
import { CurrentMonthDiscountResolver } from './current-month-discount.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentMonthDiscount]), EmployeeModule],
  providers: [CurrentMonthDiscountService, CurrentMonthDiscountResolver],
})
export class CurrentMonthDiscountModule {}
