import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudent {
  @Field()
  name: string;

  @Field()
  fatherName: string;

  @Field()
  phone: string;

  @Field()
  divisionId: string;

  @Field()
  levelId: string;

  @Field()
  projectId: string;

  @Field(() => [String])
  studyYears: string[];
}
