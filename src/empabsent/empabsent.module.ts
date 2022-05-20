import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmpabsentService } from './empabsent.service';
import { EmpabsentResolver } from './empabsent.resolver';
import { Empabsent } from './enity/empabsent';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empabsent]), EmployeeModule],
  providers: [EmpabsentService, EmpabsentResolver],
})
export class EmpabsentModule {}
