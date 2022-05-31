import { FindArgs } from './dto/find.args';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ArchiveService } from './archive.service';
import { CreateArchive } from './dto/create-archive';
import { Archive } from './entity/archive';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entity/project';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(
    private readonly archiveService: ArchiveService,
    private readonly projectService: ProjectService,
  ) {}

  @Mutation(() => Archive, { name: 'createArchive' })
  async createArchive(
    @Args('archive') archive: CreateArchive,
  ): Promise<Archive> {
    return this.archiveService.createArchive(archive);
  }

  @Query(() => [Archive], { name: 'findAllArchives' })
  async archives(@Args() args: FindArgs): Promise<Archive[]> {
    return this.archiveService.findAllArchives(args);
  }

  @ResolveField(() => Archive)
  async project(@Parent() archive: Archive): Promise<Project> {
    return await this.projectService.findOne(archive.projectId);
  }
}
