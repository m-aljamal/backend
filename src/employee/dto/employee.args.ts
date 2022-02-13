import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { Sort } from 'src/utils/types';

@ArgsType()
export class ProjectEmployeesArgs {
  @Field(() => Sort, { nullable: true })
  sortBy?: Sort;

  @Field()
  projectId: string;
}
