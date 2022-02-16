import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { Role, Sort } from 'src/utils/types';

@ArgsType()
export class EmployeeArgs {
  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field({ nullable: true })
  projectId?: string;

  @Field(() => Sort, { nullable: true })
  sortBy?: Sort;
}
