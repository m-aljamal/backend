import { DivisionModule } from './../division/division.module';
import { LevelModule } from './../level/level.module';
import { ProjectModule } from './../project/project.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    ProjectModule,
    LevelModule,
    DivisionModule,
  ],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
