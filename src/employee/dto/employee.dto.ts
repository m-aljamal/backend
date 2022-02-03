import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeDto {
  @Field()
  name: string;
}
