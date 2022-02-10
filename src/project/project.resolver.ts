import { CurrentAdmin } from './../auth/current-admin.decorator';
import { Employee, Role } from 'src/employee/entity/employee';
import { ProjectService } from './project.service';
import { Project } from './entity/project';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProjectDto } from './dto/createProject.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
 
@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectservice: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Project], { name: 'projects' })
  getAllProjects() {
    return this.projectservice.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Project)
  createProject(
    // @CurrentAdmin() user: Employee,
    @Args('project') project: CreateProjectDto,
  ) {
    return this.projectservice.createProject(project);
  }
}
