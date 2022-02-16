import { CurrentMonthDiscount } from './entity/current-month-discount';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentMonthDiscountDto } from './dto/current-month-discount.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { FindDiscountArgs } from './dto/findDiscountArgs';

@Injectable()
export class CurrentMonthDiscountService {
  constructor(
    @InjectRepository(CurrentMonthDiscount)
    private readonly repo: Repository<CurrentMonthDiscount>,
    private readonly employeeService: EmployeeService,
  ) {}

  async delete(id: string) {
    return await this.repo.delete(id);
  }

  async create(discount: CurrentMonthDiscountDto) {
    const TOTAL_DAYS_IN_MONTH = 30;
    const { late, absence, punishment, employeeId, date, notes } = discount;

    const { salary } = await this.employeeService.getEmployeeById(employeeId);

    return await this.repo.save({
      absence: absence,
      date: date,
      employeeId: employeeId,
      late: late
        ? Math.round((salary / TOTAL_DAYS_IN_MONTH / 100) * late)
        : null,
      notes: notes,
      punishment: punishment ? Math.round((salary / 100) * punishment) : null,
    });
  }

  async findDiscounts(args: FindDiscountArgs) {
    const query = this.repo
      .createQueryBuilder('current_month_discount')
      .leftJoinAndSelect(
        'employee',
        'employee',
        'current_month_discount.employeeId = employee.id',
      );
    if (args.sortBy) {
      query.orderBy(`current_month_discount.createdAt`, `${args.sortBy}`);
    }
    if (args.projectId) {
      query.andWhere(`employee.projectId = :projectId`, {
        projectId: args.projectId,
      });
    }
    query.select('current_month_discount.id', 'id');
    query.addSelect('current_month_discount.date', 'date');
    query.addSelect('current_month_discount.late', 'late');
    query.addSelect('current_month_discount.absence', 'absence');
    query.addSelect('current_month_discount.punishment', 'punishment');
    query.addSelect('current_month_discount.notes', 'notes');
    query.addSelect('current_month_discount.createdAt', 'createdAt');
    query.addSelect('employee.id', 'employeeId');

    return await query.getRawMany();
  }
}
