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

  async dailyDiscountsByCurrentMonth() {
    const projectId = '4e677f32-f6da-418a-a662-deb252e10a46';
    const total = await this.repo
      .createQueryBuilder('dailyDiscount')
      .select('dailyDiscount.employeeId')
      .addSelect('SUM(dailyDiscount.discount)', 'discount')
      .addSelect('employee.name', 'name')
      .addSelect('employee.projectId', 'projectId')
      .where('dailyDiscount.date > :date', { date: new Date() })
      .where('employee.projectId = :projectId', { projectId })
      .groupBy('dailyDiscount.employeeId')
      .addGroupBy('employee.name')
      .addGroupBy('employee.projectId')
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

// const total = await this.repo
// .createQueryBuilder('dailyDiscount')
// .select('dailyDiscount.employeeId')
// .addSelect('SUM(dailyDiscount.discount)', 'discount')
// .addSelect('employee.name', 'name')
// .where('dailyDiscount.date > :date', { date: new Date() })
// .groupBy('dailyDiscount.employeeId')
// .addGroupBy('employee.name')
// .innerJoin(
//   'employee',
//   'employee',
//   'employee.id = dailyDiscount.employeeId',
// )
// .getRawMany();
