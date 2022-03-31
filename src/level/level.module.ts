import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelResolver } from './level.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entity/level';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), ProjectModule],
  providers: [LevelService, LevelResolver],
  exports: [LevelService],
})
export class LevelModule {}
