import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AbsentResolver } from './absent.resolver';
import { AbsentService } from './absent.service';
import { Absent } from './entity/absent';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Absent]), EmployeeModule],
  providers: [AbsentResolver, AbsentService],
})
export class AbsentModule {}
