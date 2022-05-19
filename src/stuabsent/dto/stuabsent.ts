import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStuabsent {
  @Field()
  studentId: string;

  @Field()
  date: Date;
}
