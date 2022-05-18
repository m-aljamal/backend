import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity()
export class AbsentNumber {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  count: number;
}
