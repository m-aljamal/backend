import { ArgsType, Field } from '@nestjs/graphql';
import { Sort } from 'src/utils/types';

@ArgsType()
export class LevelArgs {
  @Field(() => Sort, { nullable: true })
  sortBy?: Sort;

  @Field()
  projectId: string;
}
