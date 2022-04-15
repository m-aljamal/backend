import { LevelModule } from './../level/level.module';
import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionResolver } from './division.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entity/division';

@Module({
  imports: [TypeOrmModule.forFeature([Division]), LevelModule],
  providers: [DivisionService, DivisionResolver],
  exports: [DivisionService],
})
export class DivisionModule {}
