import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateAbsent {
  @Field()
  date: Date;

  @Field({ nullable: true })
  note: string;

  @Field(() => String, { nullable: true })
  employeeId: string;

  @Field(() => String, { nullable: true })
  studentId: string;

  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;

  @Field(() => String)
  projectId: string;
}
