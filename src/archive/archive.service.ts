import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArchive } from './dto/create-archive';
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
}
