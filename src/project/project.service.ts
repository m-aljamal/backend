import { Project } from './entity/project';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}
  findAll() {
    return this.projectRepo.find({ relations: ['employees'] });
  }

  createProject(project: CreateProjectDto) {
    return this.projectRepo.save(project);
  }

  findOne(id: string) {
    return this.projectRepo.findOne(id);
  }
}
