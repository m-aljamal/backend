import { ArgsType, Field } from '@nestjs/graphql';
import { Sort } from 'src/utils/types';

@ArgsType()
export class FindArgs {
  @Field(() => Sort, { nullable: true })
  sortBy?: Sort;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field()
  projectId: string;
}
