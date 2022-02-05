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
      .select('dailyDiscount.employeeId')
      .addSelect('SUM(dailyDiscount.discount)', 'discount')
      .addSelect('employee.name', 'name')
      .groupBy('dailyDiscount.employeeId')
      .addGroupBy('employee.name')
      .innerJoin(
        'employee',
        'employee',
        'employee.id = dailyDiscount.employeeId',
      )
      .getRawMany();
    console.log(total);

    return total;
  }
}

// corrent
// .createQueryBuilder('dailyDiscount')
// .select('dailyDiscount.employeeId')
// .addSelect('SUM(dailyDiscount.discount)', 'discount')
// .groupBy('dailyDiscount.employeeId')
// .getRawMany();
