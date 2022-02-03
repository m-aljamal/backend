import { ProjectService } from './project.service';
import { Project } from './entity/project';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProjectDto } from './dto/createProject.dto';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectservice: ProjectService) {}
  @Query(() => [Project], { name: 'projects' })
  getAllProjects() {
    return this.projectservice.findAll();
  }

  @Mutation(() => Project)
  createProject(@Args('project') project: CreateProjectDto) {
    return this.projectservice.createProject(project);
  }
}
