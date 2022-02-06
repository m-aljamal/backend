import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Salaries {
  @Field()
  employee_id: string;

  @Field()
  employee_name: string;

  @Field((type) => Number)
  employee_salary: number;

  @Field()
  employee_projectId: string;

  @Field({ nullable: true })
  discount: string;
}
