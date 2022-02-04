import { DailyDiscount } from './entity/daily-discount';
import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { DailyDiscountDto } from './dto/daily-discount.dto';

@Injectable()
export class DailyDiscountService {
  constructor(
    @InjectRepository(DailyDiscount)
    private readonly repo: Repository<DailyDiscount>,
  ) {}

  async dailyDiscounts(): Promise<DailyDiscount[]> {
    return await this.repo.find();
  }

  async createDailyDiscount(
    dailyDiscount: DailyDiscountDto,
  ): Promise<DailyDiscount> {
    return await this.repo.save(dailyDiscount);
  }

  async dailyDiscountsByCurrentMonth(): Promise<DailyDiscount[]> {
    const total = await this.repo
      .createQueryBuilder('dailyDiscount')
      // .select('SUM(dailyDiscount.discount)', 'discount')
      .where('dailyDiscount.date > :after', {
        after: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      })
      .andWhere('dailyDiscount.date < :before', {
        before: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          1,
        ),
      })
      .getMany();
console.log(total);

      return total
  }
}
