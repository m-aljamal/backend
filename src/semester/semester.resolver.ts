import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
