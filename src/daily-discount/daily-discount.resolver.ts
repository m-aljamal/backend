import { DailyDiscountDto } from './dto/daily-discount.dto';
import { DailyDiscountService } from './daily-discount.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DailyDiscount } from './entity/daily-discount';

@Resolver()
export class DailyDiscountResolver {
  constructor(private readonly service: DailyDiscountService) {}

  @Query(() => [DailyDiscount], { name: 'dailyDiscounts' })
  async dailyDiscounts() {
    return await this.service.dailyDiscounts();
  }

  @Mutation(() => DailyDiscount)
  async createDailyDiscount(
    @Args('dailyDiscount') dailyDiscount: DailyDiscountDto,
  ) {
    return await this.service.createDailyDiscount(dailyDiscount);
  }
}
