import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from 'src/utils/types';

@ArgsType()
export class EmployeeArgs {
  @Field(() => Role, { nullable: true })
  role?: Role;
}
