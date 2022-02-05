import { DailyDiscount } from './entity/daily-discount';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async dailyDiscountsByCurrentMonth() {
    const projectId = '47f913bf-0e9f-40e8-989b-1f6b676a3076';
    const total = await this.repo
      .createQueryBuilder('dailyDiscount')
      .select('dailyDiscount.employeeId')
      .addSelect('SUM(dailyDiscount.discount)', 'discount')
      .addSelect('employee.name', 'name')
      .addSelect('employee.salary', 'salary')
      .addSelect('employee.projectId', 'projectId')
      .where('dailyDiscount.date > :date', { date: new Date() })
      .where('employee.projectId = :projectId', { projectId })
      .groupBy('dailyDiscount.employeeId')
      .addGroupBy('employee.name')
      .addGroupBy('employee.projectId')
      .addGroupBy('employee.salary')
      .innerJoin(
        'employee',
        'employee',
        'employee.id = dailyDiscount.employeeId',
      )
      .innerJoin('project', 'project', 'project.id = employee.projectId')
      .getRawMany();
    console.log(total);

    return total;
  }
}
