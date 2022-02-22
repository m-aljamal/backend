import { ProjectArgs } from './dto/project.args';
import { Project } from './entity/project';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  findAll(projectArgs: ProjectArgs) {
    return this.projectRepo.find({
      relations: ['employees'],
      order: { createdAt: projectArgs.sortBy },
    });
  }

  async createProject(project: CreateProjectDto) {
    const findProject = await this.projectRepo.findOne({
      where: { nameEn: project.nameEn },
    });

    if (findProject) {
      throw new BadRequestException(
        `المشروع باسم ${project.nameAr} موجود مسبقا`,
      );
    }

    return this.projectRepo.save(project);
  }

  findOne(id: string) {
    const project = this.projectRepo.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!project) {
      throw new NotFoundException('لم يتم العثور على المشروع');
    }
    return project;
  }
}
