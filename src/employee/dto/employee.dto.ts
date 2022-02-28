import { Divisions, Job_Title } from './../../utils/types';
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { JobTitle, Levels, Role } from 'src/utils/types';

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

  @Field(() => Job_Title, { nullable: true })
  jobTitle: Job_Title;

  @Field(() => [DivisionInput], { nullable: true })
  divisions: DivisionInput[];

  @Field(() => [LevelInput], { nullable: true })
  levels: LevelInput[];

  @Field({ nullable: true })
  avatar: string;
}

@InputType()
class LevelInput {
  @Field((type) => Number, { nullable: true })
  levelNumber: Number;

  @Field(() => Levels, { nullable: true })
  levelString: Levels;
}

@InputType()
class DivisionInput {
  @Field((type) => Number, { nullable: true })
  divisionNumber: Number;
  @Field(() => Divisions, { nullable: true })
  divisionString: Divisions;
}
