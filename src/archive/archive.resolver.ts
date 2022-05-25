import { Resolver } from '@nestjs/graphql';
import { ArchiveService } from './archive.service';
import { Archive } from './entity/archive';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(private readonly archiveService: ArchiveService) {}
}
