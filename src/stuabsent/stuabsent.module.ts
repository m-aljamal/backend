import { StudentModule } from './../student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StuabsentService } from './stuabsent.service';
import { StuabsentResolver } from './stuabsent.resolver';
import { Stuabsent } from './enity/stuabsent';

@Module({
  imports: [TypeOrmModule.forFeature([Stuabsent]), StudentModule],
  providers: [StuabsentService, StuabsentResolver],
})
export class StuabsentModule {}
