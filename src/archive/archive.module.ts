import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArchiveResolver } from './archive.resolver';
import { ArchiveService } from './archive.service';
import { Archive } from './entity/archive';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Archive]), ProjectModule],
  providers: [ArchiveResolver, ArchiveService],
})
export class ArchiveModule {}
