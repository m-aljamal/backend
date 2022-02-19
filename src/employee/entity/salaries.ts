import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Salaries {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field((type) => Number)
  salary: number;

  @Field({ nullable: true })
  late: string;

  @Field({ nullable: true })
  absence: string;

  @Field({ nullable: true })
  punishment: string;

  @Field(() => Number)
  totalSalart: number;
}
