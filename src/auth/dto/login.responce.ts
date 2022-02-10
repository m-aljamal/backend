import { Employee } from 'src/employee/entity/employee';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => Employee)
  user: Employee;
}
