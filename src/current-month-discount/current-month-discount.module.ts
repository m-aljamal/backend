import { Module } from '@nestjs/common';
import { CurrentMonthDiscountService } from './current-month-discount.service';
import { CurrentMonthDiscountResolver } from './current-month-discount.resolver';

@Module({
  providers: [CurrentMonthDiscountService, CurrentMonthDiscountResolver]
})
export class CurrentMonthDiscountModule {}
