import { Divisions, JobTitle } from './../../utils/types';
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Levels, Role } from 'src/utils/types';

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

  @Field(() => Role, { defaultValue: Role.TEACHER })
  role: Role;

  @Field(() => JobTitle, { nullable: true })
  jobTitle: JobTitle;

  // @Field(() => [LevelInput], { nullable: true })
  // levels: LevelInput[];

  @Field({ nullable: true })
  avatar: string;
}

// @InputType()
// class LevelInput {
//   @Field((type) => Number, { nullable: true })
//   levelNumber: Number;

//   @Field(() => Levels, { nullable: true })
//   levelString: Levels;

//   @Field(() => [DivisionInput], { nullable: true })
//   divisions: DivisionInput[];
// }

// @InputType()
// class DivisionInput {
//   @Field((type) => Number, { nullable: true })
//   divisionNumber: Number;
//   @Field(() => Divisions, { nullable: true })
//   divisionString: Divisions;
// }
