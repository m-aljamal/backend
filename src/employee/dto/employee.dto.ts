import { JobTitle } from './../../utils/types';
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/utils/types';

@InputType()
export class EmployeeDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  salary: number;

  // @Field({ nullable: true })
  // projectId: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Role, { defaultValue: Role.TEACHER })
  role: Role;

  @Field(() => JobTitle, { nullable: true })
  jobTitle: JobTitle;

  @Field(() => [String], { nullable: true })
  levels: string[];

  @Field(() => [String], { nullable: true })
  divisions: string[];

  @Field(() => [String], { nullable: true })
  studyYears: string[];

  @Field({ nullable: true })
  avatar: string;

  @Field(() => [String], { nullable: true })
  semestersId: string[];
}
