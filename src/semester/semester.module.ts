import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SemesterResolver } from './semester.resolver';
import { SemesterService } from './semester.service';
import { Semester } from './entity/semester';

@Module({
  imports: [TypeOrmModule.forFeature([Semester])],
  providers: [SemesterResolver, SemesterService],
})
export class SemesterModule {}
