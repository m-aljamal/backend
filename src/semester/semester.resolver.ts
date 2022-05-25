import { Resolver } from '@nestjs/graphql';
import { Semester } from './entity/semester';
import { SemesterService } from './semester.service';

@Resolver(() => Semester)
export class SemesterResolver {
  constructor(private readonly semesterService: SemesterService) {}
}
