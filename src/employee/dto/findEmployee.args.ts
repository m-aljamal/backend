import { Role } from 'src/employee/entity/employee';
import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

@ArgsType()
export class EmployeeArgs {
  @Field(() => Role, { nullable: true })
  role?: Role;
}
