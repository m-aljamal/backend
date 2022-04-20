import { DivisionService } from './../division/division.service';
import { Level } from './../level/entity/level';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entity/project';
import { CreateStudent } from './dto/create-student';
import { StudentService } from './student.service';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { Student } from './entity/student';
import { LevelService } from 'src/level/level.service';
import { Division } from 'src/division/entity/division';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly projectService: ProjectService,
    private readonly levleService: LevelService,
    private readonly divisionService: DivisionService,
  ) {}

  @Query(() => [Student], { name: 'findAllStudents' })
  async findAllStudents(): Promise<Student[]> {
    return await this.studentService.findAllStudents();
  }

  @Query(() => [Student], { name: 'findStudentsByProject' })
  async findStudentsByProject(
    @Args('projectId') projectId: string,
  ): Promise<Student[]> {
    return await this.studentService.findStudentsByProject(projectId);
  }

  @Mutation(() => Student)
  async createStudent(
    @Args('student') student: CreateStudent,
  ): Promise<Student> {
    return await this.studentService.createStudent(student);
  }

  @ResolveField(() => Student)
  async project(@Parent() student: Student): Promise<Project> {
    return await this.projectService.findOne(student.projectId);
  }

  @ResolveField(() => Student)
  async level(@Parent() student: Student): Promise<Level> {
    return await this.levleService.findOne(student.levelId);
  }
  @ResolveField(() => Student)
  async division(@Parent() student: Student): Promise<Division> {
    return await this.divisionService.findOne(student.divisionId);
  }
}
