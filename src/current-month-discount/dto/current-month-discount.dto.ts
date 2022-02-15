import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CurrentMonthDiscountDto {
  @Field()
  date: Date;

  @Field({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  late: number;

  @Field({ nullable: true })
  absence: number;

  @Field({ nullable: true })
  punishment: number;

  @Field()
  employeeId: string;

  @Field()
  projectId: string;
}
