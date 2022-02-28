import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { Employee } from './employee';

@ObjectType()
@Entity()
export class EmployeesByRole {
  @Field(() => [Employee])
  mangers: Employee[];

  @Field(() => [Employee])
  teachers: Employee[];

  @Field(() => [Employee])
  services: Employee[];
}
