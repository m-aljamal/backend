import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEmpabsent {
  @Field()
  date: Date;

  @Field({ nullable: true })
  absenceReason: string;

  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;

  @Field(() => String)
  employeeId: string;
}
