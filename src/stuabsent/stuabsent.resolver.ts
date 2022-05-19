import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Student } from 'src/student/entity/student';
import { StudentService } from 'src/student/student.service';
import { CreateStuabsent } from './dto/stuabsent';
import { Stuabsent } from './enity/stuabsent';
import { StuabsentService } from './stuabsent.service';

@Resolver(() => Stuabsent)
export class StuabsentResolver {
  constructor(
    private readonly stuAbsentService: StuabsentService,
    private readonly stuService: StudentService,
  ) {}

  @Mutation(() => Stuabsent, { name: 'createStuabsent' })
  async createStuabsent(
    @Args('stuabsent') stuabsent: CreateStuabsent,
  ): Promise<Stuabsent> {
    return await this.stuAbsentService.createStuabsent(stuabsent);
  }

  @Query(() => [Stuabsent], { name: 'findAllStuabsent' })
  async findAllStuabsent(): Promise<Stuabsent[]> {
    return await this.stuAbsentService.findAllStuabsent();
  }

  @ResolveField(() => Stuabsent)
  async student(@Parent() absent: Stuabsent): Promise<Student> {
    return await this.stuService.findStudentById(absent.studentId);
  }
}
