import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../entity/employee';

@InputType()
export class EmployeeDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  salary: number;

  @Field({ nullable: true })
  projectId: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Role, { defaultValue: Role.EMPLOYEE })
  role: Role;
}
