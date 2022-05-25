import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArchiveResolver } from './archive.resolver';
import { ArchiveService } from './archive.service';
import { Archive } from './entity/archive';

@Module({
  imports: [TypeOrmModule.forFeature([Archive])],
  providers: [ArchiveResolver, ArchiveService],
})
export class ArchiveModule {}
