import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { Sort } from 'src/utils/types';

@ArgsType()
export class ProjectArgs {
  @Field(() => Sort, { nullable: true })
  sortBy?: Sort;
}
