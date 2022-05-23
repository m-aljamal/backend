import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudyYear } from './dto/create-study-year';
import { StudyYear } from './entity/study-year';
import { StudyYearService } from './study-year.service';

@Resolver(() => StudyYear)
export class StudyYearResolver {
  constructor(private readonly studyYearService: StudyYearService) {}

  @Mutation(() => StudyYear, { name: 'createStudyYear' })
  async createStudyYear(
    @Args('studyYear') studyYear: CreateStudyYear,
  ): Promise<StudyYear> {
    return this.studyYearService.createStudyYear(studyYear);
  }

  @Query(() => [StudyYear], { name: 'findAllStudyYears' })
  async findAllStudyYears(): Promise<StudyYear[]> {
    return this.studyYearService.findAllStudyYears();
  }

  @Query(() => StudyYear, { name: 'findOneStudyYear' })
  async findOne(@Args('id') id: string): Promise<StudyYear> {
    return this.studyYearService.findOne(id);
  }
}
