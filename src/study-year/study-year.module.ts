import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudyYearResolver } from './study-year.resolver';
import { StudyYearService } from './study-year.service';
import { StudyYear } from './entity/study-year';

@Module({
  imports: [TypeOrmModule.forFeature([StudyYear])],
  providers: [StudyYearResolver, StudyYearService],
  exports: [StudyYearService],
})
export class StudyYearModule {}
