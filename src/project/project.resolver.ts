import { CurrentAdmin } from './../auth/current-admin.decorator';
import { Employee } from 'src/employee/entity/employee';
import { ProjectService } from './project.service';
import { Project } from './entity/project';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProjectDto } from './dto/createProject.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectservice: ProjectService) {}
  @Query(() => [Project], { name: 'projects' })
  getAllProjects() {
    return this.projectservice.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  createProject(
    @CurrentAdmin() user: Employee,
    @Args('project') project: CreateProjectDto,
  ) {
    return this.projectservice.createProject(project);
  }
}
