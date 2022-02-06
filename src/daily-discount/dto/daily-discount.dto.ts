import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DailyDiscountDto {
  @Field()
  date: Date;

  @Field({ nullable: true })
  notes: string;

  @Field()
  discount: number;

  @Field()
  employeeId: string;

  @Field()
  hasDiscount: boolean;
}
