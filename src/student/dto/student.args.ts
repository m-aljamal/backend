import { ArgsType, Field } from '@nestjs/graphql';
import { Sort } from 'src/utils/types';

@ArgsType()
export class studentArgs {
  @Field({ nullable: true })
  levelName?: String;

  @Field({ nullable: true })
  divisionName?: String;

  @Field()
  projectId?: String;

  @Field(() => Sort, { nullable: true })
  sortLevel?: Sort;

  @Field(() => Sort, { nullable: true })
  sortDivision?: Sort;
}
