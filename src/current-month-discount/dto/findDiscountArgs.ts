import { ArgsType, Field } from '@nestjs/graphql';
import { Sort } from 'src/utils/types';

@ArgsType()
export class FindDiscountArgs {
  @Field(() => Sort, { nullable: true })
  sortBy?: Sort;

  @Field({ nullable: true })
  projectId?: string;

  @Field({ nullable: true })
  approved?: boolean;
}
