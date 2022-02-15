import { CurrentMonthDiscount } from './entity/current-month-discount';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentMonthDiscountDto } from './dto/current-month-discount.dto';
import { EmployeeService } from 'src/employee/employee.service';

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
}
