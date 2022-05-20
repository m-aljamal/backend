import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStuabsent {
  @Field()
  studentId: string;

  @Field()
  date: Date;

  @Field()
  projectId: string;

  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;
}
