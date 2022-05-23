import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudyYear {
  @Field()
  date: string;

  @Field()
  firstSemesterStart: Date;

  @Field()
  firstSemesterEnd: Date;

  @Field()
  secondSemesterStart: Date;

  @Field()
  secondSemesterEnd: Date;

  @Field()
  summerActivityStart: Date;

  @Field()
  summerActivityEnd: Date;

  
}
