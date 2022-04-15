import { ProjectModule } from './../project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee';
import { LevelModule } from 'src/level/level.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), ProjectModule, LevelModule],
  providers: [EmployeeResolver, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
