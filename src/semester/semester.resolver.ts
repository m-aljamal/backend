import { FindSemesterArgs } from './dto/find.semester.args';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateSemester } from './dto/create-semester';
import { Semester } from './entity/semester';
import { SemesterService } from './semester.service';

@Resolver(() => Semester)
export class SemesterResolver {
  constructor(private readonly semesterService: SemesterService) {}

  @Mutation(() => Semester, { name: 'createSemester' })
  async createSemester(
    @Args('semester') semester: CreateSemester,
  ): Promise<Semester> {
    return this.semesterService.createSemester(semester);
  }

  @Query(() => [Semester], { name: 'findAllSemesters' })
  async findAllSemesters(@Args() args: FindSemesterArgs): Promise<Semester[]> {
    return await this.semesterService.findAllSemesters(args);
  }
}
