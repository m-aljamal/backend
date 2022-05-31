import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArchive } from './dto/create-archive';
import { FindArgs } from './dto/find.args';
import { Archive } from './entity/archive';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepo: Repository<Archive>,
  ) {}

  async createArchive(archive: CreateArchive): Promise<Archive> {
    return this.archiveRepo.save(archive);
  }

  async findAllArchives(args: FindArgs): Promise<Archive[]> {
    const query = this.archiveRepo.createQueryBuilder('archive');
    query.where('archive.projectId = :projectId', {
      projectId: args.projectId,
    });
    if (args.name) {
      query.andWhere('archive.name = :name', { name: args.name });
    }
    if (args.sortBy) {
      query.orderBy(`archive.createdAt`, args.sortBy);
    }

    return await query.getMany();
  }
}
