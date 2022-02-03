import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DailyDiscountService } from './daily-discount.service';
import { DailyDiscountResolver } from './daily-discount.resolver';
import { DailyDiscount } from './entity/daily-discount';

@Module({
  imports: [TypeOrmModule.forFeature([DailyDiscount])],
  providers: [DailyDiscountService, DailyDiscountResolver],
})
export class DailyDiscountModule {}
