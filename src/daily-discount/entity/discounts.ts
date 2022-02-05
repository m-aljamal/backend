import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Discount {
  @Field()
  name: string;

  @Field()
  dailyDiscount_employeeId: string;

  @Field()
  discount: number;

  @Field()
  salary: number;
}
