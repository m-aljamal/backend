import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity()
export class TotalAbsent {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  count: number;

  @Field()
  approved: boolean;

  @Field()
  levelName: string;
}
